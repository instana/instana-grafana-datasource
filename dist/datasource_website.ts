import BeaconGroupBody from './types/beacon_group_body';
import AbstractDatasource from './datasource_abstract';
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
      type: 'PAGELOAD',
      metrics: [{
        metric: 'pageLoads',
        aggregation: 'SUM'
      }],
      order: {
        by: 'pageLoads',
        direction: 'desc'
      },
      pagination: {
        ingestionTime: 0,
        offset: 0,
        retrievalSize: 200
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
        'aggregations' : entry.aggregations ? entry.aggregations.sort() : [],
        'beaconTypes' : entry.beaconTypes ? entry.beaconTypes : ['pageLoad', 'resourceLoad', 'httpRequest', 'error']
      }))
    );
    this.simpleCache.put('websiteCatalog', websiteCatalog);

    return websiteCatalog;
  }

  fetchMetricsForWebsite(target, timeFilter: TimeFilter) {
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

    const group = {
      groupbyTag: target.group.key
    };
    if (target.group.key === "beacon.meta" && target.groupbyTagSecondLevelKey) {
      group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
    }

    const data: BeaconGroupBody = {
      group: group,
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      tagFilters: tagFilters,
      type: target.entityType.key,
      metrics: [ metric ]
    };
    return this.postRequest('/api/website-monitoring/analyze/beacon-groups?fillTimeSeries=true', data);
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
      label = _.replace(label, '$website', target.entity.label);
      label = _.replace(label, '$type', target.entityType.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      return label;
    }
    return item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }
}
