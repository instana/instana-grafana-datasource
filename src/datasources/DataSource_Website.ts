import { SelectableValue } from "@grafana/data";
import { InstanaOptions } from "../types/instana_options";
import Cache from '../cache';
import _ from "lodash";
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize } from '../util/time_util';
import BeaconGroupBody from '../types/beacon_group_body';
import { getRequest, postRequest } from '../util/request_handler';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';
import { InstanaQuery } from '../types/instana_query';
import { createTagFilter } from '../util/analyze_util';
import { emptyResultData } from '../util/target_util';

export class DataSourceWebsite {

  instanaOptions: InstanaOptions;
  websitesCache: Cache<Promise<Array<SelectableValue>>>;
  miscCache: Cache<Array<SelectableValue>>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.websitesCache = new Cache<Promise<Array<SelectableValue>>>();
    this.miscCache = new Cache<Array<SelectableValue>>();
  }

  getWebsites(timeFilter: TimeFilter) {
    const key = getTimeKey(timeFilter);

    let websites = this.websitesCache.get(key);
    if (websites) {
      return websites;
    }

    const windowSize = getWindowSize(timeFilter);
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
    websites = postRequest(this.instanaOptions, '/api/website-monitoring/analyze/beacon-groups', data).then((websitesResponse: any) =>
      websitesResponse.data.items.map((entry: any) => ({
        'key': entry.name,
        'label': entry.name
      }))
    );
    this.websitesCache.put(key, websites);

    return websites;
  }

  getWebsiteTags() {
    let websiteTags = this.miscCache.get('websiteTags');
    if (websiteTags) {
      return websiteTags;
    }

    websiteTags = getRequest(this.instanaOptions, '/api/website-monitoring/catalog/tags').then((tagsResponse: any) =>
      tagsResponse.data.map((entry: any) => ({
        'key': entry.name,
        'type': entry.type
      }))
    );
    this.miscCache.put('websiteTags', websiteTags);

    return websiteTags;
  }

  getWebsiteMetricsCatalog() {
    let websiteCatalog = this.miscCache.get('websiteCatalog');
    if (websiteCatalog) {
      return websiteCatalog;
    }

    websiteCatalog = getRequest(this.instanaOptions, '/api/website-monitoring/catalog/metrics').then((catalogResponse: any) =>
      catalogResponse.data.map((entry: any) => ({
        'key': entry.metricId,
        'label': entry.label,
        'aggregations': entry.aggregations ? entry.aggregations.sort() : [],
        'beaconTypes': entry.beaconTypes ? entry.beaconTypes : ['pageLoad', 'resourceLoad', 'httpRequest', 'error']
      }))
    );
    this.miscCache.put('websiteCatalog', websiteCatalog);

    return websiteCatalog;
  }


  fetchAnalyzeMetricsForWebsite(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.group || !target.entity) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);
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
    if (target.group.type === "KEY_VALUE_PAIR" && target.groupbyTagSecondLevelKey) {
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
    return postRequest(this.instanaOptions, '/api/website-monitoring/analyze/beacon-groups?fillTimeSeries=true', data);
  }


  buildAnalyzeWebsiteLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$website', target.entity.label!);
      label = _.replace(label, '$type', target.entityType.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', '' + index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }
    return target.timeShift && target.timeShiftIsValid ?
      item.name + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }

}
