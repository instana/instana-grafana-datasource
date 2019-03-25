import AbstractDatasource from './datasource_abstract';
import CallGroupBody from './types/call_group_body';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import Cache from './cache';

import _ from 'lodash';

export default class InstanaApplicationDataSource extends AbstractDatasource {
  applicationsCache: Cache<Promise<Array<Selectable>>>;

  // our ui is limited to 80 results, same logic to stay comparable
  maximumNumberOfUsefulDataPoints = 80;
  sensibleGranularities = [
    1, // second
    5,
    10,
    60, // minute
    5 * 60,
    10 * 60,
    60 * 60, // hour
    5 * 60 * 60,
    10 * 60 * 60,
    24 * 60 * 60, // day
    5 * 24 * 60 * 60,
    10 * 24 * 60 * 60
  ];

  // duplicate to QueryCtrl.ALL_APPLICATIONS
  ALL_APPLICATIONS = '-- All Applications --';

  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';

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
    const data: CallGroupBody = {
      group: {
        groupbyTag: 'application.name'
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [{
        metric: 'calls',
        aggregation: 'SUM'
      }],
      order: {
        // TODO fix api and figure out how to get correct ordering
        by: 'callsAgg',
        direction: "desc"
      }
    };
    applications = this.postRequest('/api/application-monitoring/analyze/call-groups', data).then(applicationsResponse =>
      applicationsResponse.data.items.map(entry => ({
        'key' : entry.name,
        'label' : entry.name
      }))
    );
    this.applicationsCache.put(key, applications);

    return applications;
  }

  getApplicastionTags() {
    let applicationTags = this.simpleCache.get('applicationTags');
    if (applicationTags) {
      return applicationTags;
    }

    applicationTags = this.doRequest('/api/application-monitoring/catalog/tags').then(tagsResponse =>
      tagsResponse.data.map(entry => ({
        'key' : entry.name,
        'type' : entry.type
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
        'key' : entry.metricId,
        'label' : entry.label,
        'aggregations' : entry.aggregations ? entry.aggregations.sort() : []
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

  fetchMetricsForApplication(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({ data: { items: [] } });
    }

    // our is limited to maximumNumberOfUsefulDataPoints results, to stay comparable
    const windowSize = this.getWindowSize(timeFilter);

    const tagFilters = [];

    if (target.entity.key){
      tagFilters.push({
        name: 'application.name',
        operator: 'EQUALS',
        value: target.entity.key
      });
    }

    _.forEach(target.filters, filter => {
      if (filter.isValid) {
        tagFilters.push(this.createTagFilter(filter));
      }
    });
    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM'
    };
    if (target.pluginId !== "singlestat") { // no granularity for singlestat
      metric['granularity'] = this.getChartGranularity(windowSize);
    }

    const data: CallGroupBody = {
      group: {
        groupbyTag: target.group.key
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: tagFilters,
      metrics: [ metric ]
    };
    return this.postRequest('/api/application-monitoring/analyze/call-groups', data);
  }

  getChartGranularity(windowSize) {
    const granularity = this.sensibleGranularities.find(
      granularity => windowSize / 1000 / granularity <= this.maximumNumberOfUsefulDataPoints
    );
    return granularity || this.sensibleGranularities[this.sensibleGranularities.length - 1];
  }

  createTagFilter(filter: TagFilter) {
    const tagFilter = {
      name: filter.tag.key,
      operator: filter.operator.key,
      value: filter.stringValue
    };

    if (this.OPERATOR_NUMBER === filter.tag.type) {
      tagFilter.value = filter.numberValue.toString();
    } else if (this.OPERATOR_BOOLEAN === filter.tag.type) {
      tagFilter.value = filter.booleanValue.toString();
    }

    return tagFilter;
  }

  readItemMetrics(target, response) {
    // as we map two times we need to flatten the result
    return _.flatten(response.data.items.map((item, index) => {
      return _.map(item.metrics, (value, key) => {
        return {
          'target': this.buildLabel(target, item, key, index),
          'datapoints': _.map(value, metric => [metric[1], metric[0]])
        };
      });
    }));
  }

  buildLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$application', target.entity.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      return label;
    }
    if (target.entity.label === this.ALL_APPLICATIONS) {
      return item.name + ' - ' + key;
    }
    return item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }
}
