import AbstractDatasource from './datasource_abstract';
import CallGroupBody from './types/call_group_body';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';

import _ from 'lodash';
import {createTagFilter, getChartGranularity} from "./util/analyze_util";
import ApplicationMetricsBody from "./types/application_metrics_body";

export default class InstanaApplicationDataSource extends AbstractDatasource {
  applicationsCache: Cache<Promise<Array<Selectable>>>;

  // our ui is limited to 80 results, same logic to stay comparable
  maximumNumberOfUsefulDataPoints = 80;

  // duplicate to QueryCtrl.ALL_APPLICATIONS
  ALL_APPLICATIONS = '-- No Application Filter --';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.applicationsCache = new Cache<Promise<Array<Selectable>>>();
  }

  getApplications(timeFilter: TimeFilter) {
    const key = this.getTimeKey(timeFilter);

    let applications = this.applicationsCache.get(key);
    if (applications) {
      return applications;
    }

    const windowSize = this.getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    applications = this.paginateApplications([], windowSize, timeFilter.to, page, pageSize).then(response => {
      let allResults = _.flattenDeep(_.map(response, (pageSet, index) => {
        return pageSet.items;
      }));

      return allResults.map(entry => {
        return {
          'key': entry.id,
          'label': entry.label
        };
      });
    });

    this.applicationsCache.put(key, applications);
    return applications;
  }

  paginateApplications(results, windowSize: number, to: number, page: number, pageSize: number) {
    var queryParameters = "windowSize=" + windowSize
      + "&to=" + to
      + "&page=" + page
      + "&pageSize=" + pageSize;

    return this.doRequest('/api/application-monitoring/applications?' + queryParameters).then(response => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateApplications(results, windowSize, to, page, pageSize);
      } else {
        return results;
      }
    });
  }

  getApplicastionTags() {
    let applicationTags = this.simpleCache.get('applicationTags');
    if (applicationTags) {
      return applicationTags;
    }

    applicationTags = this.doRequest('/api/application-monitoring/catalog/tags').then(tagsResponse =>
      tagsResponse.data.map(entry => ({
        'key': entry.name,
        'type': entry.type
      }))
    );
    this.simpleCache.put('applicationTags', applicationTags);

    return applicationTags;
  }

  getApplicationMetricsCatalog() {
    let applicationCatalog = this.simpleCache.get('applicationCatalog');
    if (applicationCatalog) {
      return applicationCatalog;
    }

    applicationCatalog = this.doRequest('/api/application-monitoring/catalog/metrics').then(catalogResponse =>
      catalogResponse.data.map(entry => ({
        'key': entry.metricId,
        'label': entry.label,
        'aggregations': entry.aggregations ? entry.aggregations.sort() : []
      }))
    ).then(catalogResponse => {
      // not all metrics in the metric catalog are working right now, so it is hard coded and manually set. Might be needless in the future
      const hardCodedResponse = [
        {key: "calls", label: "Call count", aggregations: ["SUM"]},
        {key: "latency", label: "Call latency", aggregations: ["MAX", "MEAN", "MIN", "P25", "P50", "P75", "P90", "P95", "P98", "P99"]},
        {key: "errors", label: "Error rate", aggregations: ["MEAN"]},
        {key: "services", label: "Service Count", aggregations: ["DISTINCT_COUNT"]},
      ];
      return hardCodedResponse;
    });
    this.simpleCache.put('applicationCatalog', applicationCatalog);

    return applicationCatalog;
  }

  fetchAnalyzeMetricsForApplication(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({data: {items: []}});
    }

    // our is limited to maximumNumberOfUsefulDataPoints results, to stay comparable
    const windowSize = this.getWindowSize(timeFilter);

    const tagFilters = [];

    if (target.entity.key) {
      tagFilters.push({
        name: 'application.name',
        operator: 'EQUALS',
        value: target.entity.label
      });
    }

    _.forEach(target.filters, filter => {
      if (filter.isValid) {
        tagFilters.push(createTagFilter(filter));
      }
    });

    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM'
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
      }
      metric['granularity'] = target.timeInterval.value;
    }

    const group = {
      groupbyTag: target.group.key
    };
    if (target.group.type === "KEY_VALUE_PAIR" && target.groupbyTagSecondLevelKey) {
      group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
    }

    const data: CallGroupBody = {
      group: group,
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: tagFilters,
      metrics: [metric]
    };
    return this.postRequest('/api/application-monitoring/analyze/call-groups?fillTimeSeries=true', data);
  }

  fetchApplicationMetrics(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric) {
      return this.$q.resolve({data: {items: []}});
    }

    const windowSize = this.getWindowSize(timeFilter);

    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM',
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
      }
      metric['granularity'] = target.timeInterval.value;
    }

    const data: ApplicationMetricsBody = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric]
    };

    if (target.entity.key !== null) {
      data['applicationId'] = target.entity.key;
    }

    return this.postRequest('/api/application-monitoring/metrics/applications?fillTimeSeries=true', data);
  }

  buildAnalyzeApplicationLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$application', target.entity.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === this.ALL_APPLICATIONS) {
      return target.timeShift ? item.name + ' - ' + key + " - " + target.timeShift : item.name + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.name + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }

  buildApplicationMetricLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.application.label);
      label = _.replace(label, '$application', target.entity.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === this.ALL_APPLICATIONS) {
      return target.timeShift ? item.application.label + ' - ' + key + " - " + target.timeShift : item.application.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.application.label + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.application.label + ' (' + target.entity.label + ')' + ' - ' + key;
  }
}
