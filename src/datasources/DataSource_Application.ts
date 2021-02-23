import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import _ from 'lodash';
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize, hoursToMs } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';
import { InstanaQuery } from '../types/instana_query';
import { createTagFilter, readItemMetrics } from '../util/analyze_util';
import { emptyResultData } from '../util/target_util';
import { ALL_APPLICATIONS, PAGINATION_LIMIT } from '../GlobalVariables';
import defaultApplicationMetricCatalog from '../lists/default_metric_catalog';
import { isInvalidQueryInterval } from '../util/queryInterval_check';
import getVersion from '../util/instana_version';

export class DataSourceApplication {
  instanaOptions: InstanaOptions;
  applicationsCache: Cache<Promise<SelectableValue[]>>;
  miscCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.applicationsCache = new Cache<Promise<SelectableValue[]>>();
    this.miscCache = new Cache<any>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter): any {
    // do not try to execute to big queries
    if (isInvalidQueryInterval(timeFilter.windowSize, hoursToMs(this.instanaOptions.queryinterval_limit_app_calls))) {
      throw new Error(
        'Limit for maximum selectable windowsize exceeded, max is: ' +
          this.instanaOptions.queryinterval_limit_app_calls +
          ' hours'
      );
    }

    // avoid invalid calls
    if (
      !target ||
      !target.metric ||
      !target.metric.key ||
      !target.group ||
      !target.group.key
    ) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    return this.fetchAnalyzeMetricsForApplication(target, timeFilter).then((response) => {
      target.showWarningCantShowAllResults = response.data.canLoadMore;
      return readItemMetrics(target, response, this.buildAnalyzeApplicationLabel);
    });
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

    applications = this.paginateApplications([], windowSize, timeFilter.to, page, pageSize, PAGINATION_LIMIT).then(
      (response: any) => {
        let allResults = _.flattenDeep(
          _.map(response, (pageSet) => {
            return pageSet.items;
          })
        );

        return _.orderBy(
          _.compact(allResults).map((entry) => {
            return {
              key: entry.id,
              label: entry.label,
              boundaryScope: entry.boundaryScope,
            };
          }),
          [(application) => application.label.toLowerCase()],
          ['asc']
        );
      }
    );

    this.applicationsCache.put(key, applications, 600000);
    return applications;
  }

  paginateApplications(
    results: any,
    windowSize: number,
    to: number,
    page: number,
    pageSize: number,
    pageLimit: number
  ) {
    if (page > pageLimit) {
      return results;
    }

    let queryParameters = 'windowSize=' + windowSize + '&to=' + to + '&page=' + page + '&pageSize=' + pageSize;

    return getRequest(this.instanaOptions, '/api/application-monitoring/applications?' + queryParameters).then(
      (response: any) => {
        results.push(response.data);
        if (page * pageSize < response.data.totalHits) {
          page++;
          return this.paginateApplications(results, windowSize, to, page, pageSize, pageLimit);
        } else {
          return results;
        }
      }
    );
  }

  getApplicationTags(timeFilter: TimeFilter) {
    let applicationTags = this.miscCache.get('applicationTags');
    if (applicationTags) {
      return applicationTags;
    }

    return getVersion(this.instanaOptions).then((version: number) => {
      if (version >= 191) {
        applicationTags = this.getCatalog(timeFilter).then((catalog: any) =>
          this.mapCatalogResponse(catalog.data.tags)
        );
      } else {
        applicationTags = this.getCatalogFromDeprecatedEndpoint().then((tagsResponse: any) =>
          this.mapCatalogResponse(tagsResponse.data)
        );
      }

      this.miscCache.put('applicationTags', applicationTags);
      return applicationTags;
    });
  }

  getCatalog(timeFilter: TimeFilter) {
    const endpoint = '/api/application-monitoring/catalog?dataSource=CALLS&useCase=FILTERING&from=' + timeFilter.from;
    return getRequest(this.instanaOptions, endpoint);
  }

  getCatalogFromDeprecatedEndpoint() {
    return getRequest(this.instanaOptions, '/api/application-monitoring/catalog/tags');
  }

  mapCatalogResponse(catalog: any) {
    return catalog.map((entry: any) => ({
      key: entry.name,
      label: entry.name,
      type: entry.type,
      canApplyToSource: entry.canApplyToSource,
      canApplyToDestination: entry.canApplyToDestination,
    }));
  }

  getApplicationMetricsCatalog() {
    return defaultApplicationMetricCatalog;
  }

  fetchAnalyzeMetricsForApplication(target: InstanaQuery, timeFilter: TimeFilter) {
    const windowSize = getWindowSize(timeFilter);
    let tagFilters: any[] = [];

    return Promise.resolve(this.getApplicationTags(timeFilter)).then((applicationTags) => {
      if (target.entity.key) {
        tagFilters.push({
          name: 'application.name',
          operator: 'EQUALS',
          value: target.entity.label!,
          entity: target.applicationCallToEntity ? target.applicationCallToEntity : 'DESTINATION',
        });
      }

      _.forEach(target.filters, (filter) => {
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
        aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      };

      if (!target.timeInterval) {
        target.timeInterval = getDefaultChartGranularity(windowSize);
      }
      metric['granularity'] = target.timeInterval.key;

      const group: any = {
        groupbyTag: target.group.key,
      };
      const tag: any = _.find(applicationTags, ['key', target.group.key]);
      if (tag.canApplyToDestination || tag.canApplyToSource) {
        group['groupbyTagEntity'] = target.callToEntity;
      }
      if (target.group.type === 'KEY_VALUE_PAIR' && target.groupbyTagSecondLevelKey) {
        group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
      }

      const data: any = {
        group: group,
        timeFrame: {
          to: timeFilter.to,
          windowSize: windowSize,
        },
        metrics: [metric],
        tagFilters: tagFilters,
      };

      return postRequest(
        this.instanaOptions,
        '/api/application-monitoring/analyze/call-groups?fillTimeSeries=true',
        data,
        false,
        5
      );
    });
  }

  getTagEntity(selectedEntity: string, tag: any): string {
    if (selectedEntity === 'DESTINATION' && tag.canApplyToDestination) {
      return 'DESTINATION';
    }
    if (selectedEntity === 'SOURCE' && tag.canApplyToSource) {
      return 'SOURCE';
    }
    return tag.canApplyToDestination ? 'DESTINATION' : 'SOURCE';
  }

  fetchApplicationMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);
    const metric: any = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
    };

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }
    metric['granularity'] = target.timeInterval.key;

    const data: any = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize,
      },
      metrics: [metric],
    };

    if (target.entity.key !== null) {
      data['applicationId'] = target.entity.key;
      data['applicationBoundaryScope'] = target.applicationBoundaryScope;
    }

    return postRequest(
      this.instanaOptions,
      '/api/application-monitoring/metrics/applications?fillTimeSeries=true',
      data
    );
  }

  buildAnalyzeApplicationLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$application', target.entity.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', '' + index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === ALL_APPLICATIONS) {
      return target.timeShift ? item.name + ' - ' + key + ' - ' + target.timeShift : item.name + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid
      ? item.name + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift
      : item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }

  buildApplicationMetricLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.application.label);
      label = _.replace(label, '$application', target.entity.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', '' + index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === ALL_APPLICATIONS) {
      return target.timeShift
        ? item.application.label + ' - ' + key + ' - ' + target.timeShift
        : item.application.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid
      ? item.application.label + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift
      : item.application.label + ' (' + target.entity.label + ')' + ' - ' + key;
  }
}
