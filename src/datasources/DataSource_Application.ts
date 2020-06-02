import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import _ from 'lodash';
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';
import { InstanaQuery } from '../types/instana_query';
import { createTagFilter } from '../util/analyze_util';
import { emptyResultData } from '../util/target_util';
import { PAGINATION_LIMIT } from '../GlobalVariables';

export class DataSourceApplicaton {

  instanaOptions: InstanaOptions;
  applicationsCache: Cache<Promise<Array<SelectableValue>>>;
  miscCache: Cache<any>;


  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.applicationsCache = new Cache<Promise<Array<SelectableValue>>>();
    this.miscCache = new Cache<any>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {

  }

  getApplications(timeFilter: TimeFilter) {
    const key = getTimeKey(timeFilter);

    let applications = this.applicationsCache.get(key);
    if (applications) {
      return applications;
    }

    const windowSize = getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    applications = this.paginateApplications([], windowSize, timeFilter.to, page, pageSize, PAGINATION_LIMIT).then((response: any) => {
      let allResults = _.flattenDeep(_.map(response, pageSet => {
        return pageSet.items;
      }));

      return allResults.map(entry => {
        return {
          'key': entry.id,
          'label': entry.label
        };
      });
    });

    this.applicationsCache.put(key, applications, 600000);
    return applications;
  }

  paginateApplications(results: any, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number) {
    if (page > pageLimit) {
      return results;
    }

    let queryParameters = 'windowSize=' + windowSize
      + '&to=' + to
      + '&page=' + page
      + '&pageSize=' + pageSize;

    return getRequest(this.instanaOptions, '/api/application-monitoring/applications?' + queryParameters).then((response: any) => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateApplications(results, windowSize, to, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  }

  getApplicationTags() {
    let applicationTags = this.miscCache.get('applicationTags');
    if (applicationTags) {
      return applicationTags;
    }

    applicationTags = getRequest(this.instanaOptions, '/api/application-monitoring/catalog/tags').then((tagsResponse: any) =>
      tagsResponse.data.map((entry: any) => ({
        'key': entry.name,
        'type': entry.type,
        'canApplyToSource': entry.canApplyToSource,
        'canApplyToDestination': entry.canApplyToDestination
      }))
    );
    this.miscCache.put('applicationTags', applicationTags);

    return applicationTags;
  }

  getApplicationMetricsCatalog() {
    return [
      { key: 'calls', label: 'Call count', aggregations: [ 'SUM' ] },
      {
        key: 'latency',
        label: 'Call latency',
        aggregations: [ 'MAX', 'MEAN', 'MIN', 'P25', 'P50', 'P75', 'P90', 'P95', 'P98', 'P99' ]
      },
      { key: 'errors', label: 'Error rate', aggregations: [ 'MEAN' ] },
      { key: 'services', label: 'Service Count', aggregations: [ 'DISTINCT_COUNT' ] },
    ];
  }

  fetchAnalyzeMetricsForApplication(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key || !target.group || !target.group.key ||  !target.entity || !target.entity.key) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);
    const tagFilters: any[] = [];

    return Promise.resolve(this.getApplicationTags()).then(
      applicationTags => {

        if (target.entity.key) {
          tagFilters.push({
            name: 'application.name',
            operator: 'EQUALS',
            value: target.entity.label!,
            entity: target.applicationCallToEntity.key ? target.applicationCallToEntity.key : 'DESTINATION'
          });
        }

        _.forEach(target.filters, filter => {
          if (filter.isValid) {
            let tagFilter: any = createTagFilter(filter);
            const tag = _.find(applicationTags, ['key', filter.tag.key]);
            if (tag.canApplyToDestination || tag.canApplyToSource) {
              tagFilter['entity'] = this.getTagEntity(filter.entity, tag);
            }
            tagFilters.push(tagFilter);
          }
        });

        const metric: any = {
          metric: target.metric.key,
          aggregation: target.aggregation ? target.aggregation : 'SUM'
        };

        if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
          if (!target.timeInterval) {
            target.timeInterval = getDefaultChartGranularity(windowSize);
          }
          metric['granularity'] = target.timeInterval.key;
        }

        const group: any = {
          groupbyTag: target.group.key
        };
        const tag: any = _.find(applicationTags, ['key', target.group.key]);
        if (tag.canApplyToDestination || tag.canApplyToSource) {
          group['groupbyTagEntity'] = this.getTagEntity(target.group, tag);
        }
        if (target.group.type === "KEY_VALUE_PAIR" && target.groupbyTagSecondLevelKey) {
          group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
        }

        const data: any = {
          group: group,
          timeFrame: {
            to: timeFilter.to,
            windowSize: windowSize
          },
          tagFilters: tagFilters,
          metrics: [metric]
        };
        return postRequest(this.instanaOptions, '/api/application-monitoring/analyze/call-groups?fillTimeSeries=true', data);
      }
    );
  }

  getTagEntity(selectedEntity: any, tag: any): string {
    if (selectedEntity && selectedEntity.key === 'DESTINATION' && tag.canApplyToDestination) {
      return 'DESTINATION';
    }
    if (selectedEntity && selectedEntity.key === 'SOURCE' && tag.canApplyToSource) {
      return 'SOURCE';
    }
    return tag.canApplyToDestination ? 'DESTINATION' : 'SOURCE';
  }

  fetchApplicationMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);
    const metric: any = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM',
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getDefaultChartGranularity(windowSize);
      }
      metric['granularity'] = target.timeInterval.key;
    }

    const data: any = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric]
    };

    if (target.entity.key !== null) {
      data['applicationId'] = target.entity.key;
    }

    return postRequest(this.instanaOptions, '/api/application-monitoring/metrics/applications?fillTimeSeries=true', data);
  }
}
