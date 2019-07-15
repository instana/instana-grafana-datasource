import BeaconGroupBody from './types/beacon_group_body';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import Cache from './cache';

import _ from 'lodash';
import {createTagFilter, getChartGranularity, readItemMetrics} from "./util/analyze_util";

export default class InstanaWebsiteDataSource extends AbstractDatasource {
  websitesCache: Cache<Promise<Array<Selectable>>>;

  // our ui is limited to 80 results, same logic to stay comparable
  maximumNumberOfUsefulDataPoints = 80;

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
        'key': entry.name,
        'label': entry.name
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
        'key': entry.name,
        'type': entry.type
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
        'key': entry.metricId,
        'label': entry.label,
        'aggregations': entry.aggregations ? entry.aggregations.sort() : [],
        'beaconTypes': entry.beaconTypes ? entry.beaconTypes : ['pageLoad', 'resourceLoad', 'httpRequest', 'error']
      }))
    );
    this.simpleCache.put('websiteCatalog', websiteCatalog);

    return websiteCatalog;
  }


  fetchMetricsForWebsite(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return this.$q.resolve({data: {items: []}});
    }

    const windowSize = this.getWindowSize(timeFilter);

    const tagFilters = [{
      name: 'beacon.website.name',
      operator: 'EQUALS',
      value: target.entity.key
    }];

    _.forEach(target.filters, filter => {
      if (filter.isValid) {
        tagFilters.push(createTagFilter(filter));
      }
    });
    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM'
    };

    let granularity = null;
    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (target.granularity) {
        granularity = target.granularity;
      } else {
        granularity = getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
        target.granularity = granularity;
      }

      metric['granularity'] = granularity.value;
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
      metrics: [metric]
    };
    return this.postRequest('/api/website-monitoring/analyze/beacon-groups?fillTimeSeries=true', data);
  }

  buildWebsiteLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$website', target.entity.label);
      label = _.replace(label, '$type', target.entityType.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }
    return target.timeShift && target.timeShiftIsValid ?
      item.name + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }

}
