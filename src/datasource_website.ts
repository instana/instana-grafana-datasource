import AbstractDatasource from './datasource_abstract';
import BeaconGroupBody from './types/beacon_group_body';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import Cache from './cache';

import _ from 'lodash';

export default class InstanaWebsiteDataSource extends AbstractDatasource {
  websitesCache: Cache<Promise<Array<Selectable>>>;

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

  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.websitesCache = new Cache<Promise<Array<Selectable>>>();
  }

  getWebsites(timeFilter: TimeFilter) {
    const key = this.getTimeKey(timeFilter);

    let websites = this.websitesCache.get(key);
    if (websites) {
      return websites;
    }

    const windowSize = this.getWindowSize(timeFilter);
    const data: BeaconGroupBody = {
      group: {
        groupbyTag: 'beacon.website.name'
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      type: 'pageLoad',
      metrics: [{
        metric: 'pageLoads',
        aggregation: 'SUM'
      }],
      order: {
        by: 'pageLoads',
        direction: 'desc'
      }
    };
    websites = this.postRequest('/api/website-monitoring/analyze/beacon-groups', data).then(websitesResponse =>
      websitesResponse.data.items.map(entry => ({
        'key' : entry.name,
        'label' : entry.name
      }))
    );
    this.websitesCache.put(key, websites);

    return websites;
  }

  getWebsiteTags() {
    let websiteTags = this.simpleCache.get('websiteTags');
    if (websiteTags) {
      return websiteTags;
    }

    websiteTags = this.doRequest('/api/website-monitoring/catalog/tags').then(tagsResponse =>
      tagsResponse.data.map(entry => ({
        'key' : entry.name,
        'type' : entry.type
      }))
    );
    this.simpleCache.put('websiteTags', websiteTags);

    return websiteTags;
  }

  getWebsiteMetricsCatalog() {
    let websiteCatalog = this.simpleCache.get('websiteCatalog');
    if (websiteCatalog) {
      return websiteCatalog;
    }

    websiteCatalog = this.doRequest('/api/website-monitoring/catalog/metrics').then(catalogResponse =>
      catalogResponse.data.map(entry => ({
        'key' : entry.metricId,
        'label' : entry.label,
        'aggregations' : entry.aggregations ? entry.aggregations.sort() : []
      }))
    );
    this.simpleCache.put('websiteCatalog', websiteCatalog);

    return websiteCatalog;
  }

  fetchMetricsForEntity(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({ data: { items: [] } });
    }

    const windowSize = this.getWindowSize(timeFilter);

    const tagFilters = [{
      name: 'beacon.website.name',
      operator: 'EQUALS',
      value: target.entity.key
    }];
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

    const data: BeaconGroupBody = {
      group: {
        groupbyTag: target.group.key
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: tagFilters,
      type: target.entityType.key,
      metrics: [ metric ]
    };
    return this.postRequest('/api/website-monitoring/analyze/beacon-groups', data);
  }

  getChartGranularity(windowSize: number): number {
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
}
