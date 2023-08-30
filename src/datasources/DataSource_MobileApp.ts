import { atLeastGranularity, getTimeKey, getWindowSize, hoursToMs } from '../util/time_util';
import { createTagFilter, readItemMetrics } from '../util/analyze_util';
import { getRequest, postRequest } from '../util/request_handler';

import BeaconGroupBody from '../types/beacon_group_body';
import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { emptyResultData } from '../util/target_util';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';
import { isInvalidQueryInterval } from '../util/queryInterval_check';

export class DataSourceMobileApp {
  instanaOptions: InstanaOptions;
  MobileAppCache: Cache<Promise<SelectableValue[]>>;
  miscCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.MobileAppCache = new Cache<Promise<SelectableValue[]>>();
    this.miscCache = new Cache<any>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    if (
      isInvalidQueryInterval(timeFilter.windowSize, hoursToMs(this.instanaOptions.queryinterval_limit_mobileapp_metrics))
    ) {
      throw new Error(
        'Limit for maximum selectable windowsize exceeded, max is: ' +
          this.instanaOptions.queryinterval_limit_mobileapp_metrics +
          ' hours'
      );
    }

    // avoid invalid calls
    if (
      !target ||
      !target.metric ||
      !target.metric.key ||
      !target.group ||
      !target.group.key ||
      !target.entity ||
      !target.entity.key
    ) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    return this.fetchAnalyzeMetricsForMobileapp(target, timeFilter).then((response: any) => {
      return readItemMetrics(target, response, this.buildAnalyzeMobileAppLabel);
    });
  }

  getMobileapp(timeFilter: TimeFilter) {
    const key = getTimeKey(timeFilter);
    let mobileapps = this.MobileAppCache.get(key);
    if (mobileapps) {
      return mobileapps;
    }

    mobileapps = getRequest(this.instanaOptions, '/api/mobile-app-monitoring/config').then((mobileappsResponse: any) =>
      mobileappsResponse.data.map((mobile: any) => ({
        key: mobile.name, // use name as key because a mobileapp name can only be configured once
        label: mobile.name,
      }))
    );
    this.MobileAppCache.put(key, mobileapps, 600000);

    return mobileapps;
  }

  getMobileappTags() {
    let mobileappTags = this.miscCache.get('mobileappTags');
    if (mobileappTags) {
      return mobileappTags;
    }

    mobileappTags = getRequest(this.instanaOptions, '/api/mobile-app-monitoring/catalog/tags').then((tagsResponse: any) =>
      tagsResponse.data.map((entry: any) => ({
        key: entry.name,
        label: entry.name,
        type: entry.type,
      }))
    );
    this.miscCache.put('mobileappTags', mobileappTags);

    return mobileappTags;
  }

  getMobileappMetricsCatalog() {
    let mobileappCatalog = this.miscCache.get('mobileappCatalog');
    if (mobileappCatalog) {
      return mobileappCatalog;
    }

    mobileappCatalog = getRequest(this.instanaOptions, '/api/mobile-app-monitoring/catalog/metrics').then(
      (catalogResponse: any) =>
        catalogResponse.data.map((entry: any) => {
          return {
            key: entry.metricId,
            label: entry.label,
            aggregations: entry.aggregations ? this.transformAggregations(entry.aggregations.sort()) : [],
            beaconTypes: entry.beaconTypes
              ? this.transformBeaconTypes(entry.beaconTypes)
              : ['pageLoad', 'resourceLoad', 'httpRequest', 'error', 'custom', 'pageChange'],
          };
        })
    );
    this.miscCache.put('mobileappCatalog', mobileappCatalog);

    return mobileappCatalog;
  }

  transformBeaconTypes(beaconTypes: string[]) {
    if (beaconTypes.includes('pageChange')) {
      let result = _.remove(beaconTypes, (type) => type !== 'pageChange');
      result.push('page_change');
      return result;
    }

    return beaconTypes;
  }

  transformAggregations(aggregations: string[]) {
    return _.map(aggregations, (a) => {
      return {
        key: a,
        label: a,
      };
    });
  }

  private fetchAnalyzeMetricsForMobileapp(target: InstanaQuery, timeFilter: TimeFilter) {
    const windowSize = getWindowSize(timeFilter);
    const tagFilters = [
      {
        name: 'beacon.mobileapp.name',
        operator: 'EQUALS',
        value: target.entity.key,
      },
    ];

    _.forEach(target.filters, (filter) => {
      if (filter.isValid) {
        tagFilters.push(createTagFilter(filter));
      }
    });

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }
    const metric: any = {
      metric: target.metric.key,
      aggregation: target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key,
    };

    const group: any = {
      groupbyTag: target.group.key,
    };
    if (target.group.type === 'KEY_VALUE_PAIR' && target.groupbyTagSecondLevelKey) {
      group['groupbyTagSecondLevelKey'] = target.groupbyTagSecondLevelKey;
    }

    const data: BeaconGroupBody = {
      group: group,
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, metric.granularity),
      },
      tagFilters: tagFilters,
      type: target.entityType.key,
      metrics: [metric],
    };
    return postRequest(
      this.instanaOptions,
      '/api/mobile-app-monitoring/analyze/beacon-groups?fillTimeSeries=true',
      data,
      false,
      5
    );
  }

  buildAnalyzeMobileAppLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.name);
      label = _.replace(label, '$mobileapp', target.entity.label!);
      label = _.replace(label, '$type', target.entityType.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', '' + index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }
    return target.timeShift && target.timeShiftIsValid
      ? item.name + ' (' + target.entity.label + ')' + ' - ' + key + ' - ' + target.timeShift
      : item.name + ' (' + target.entity.label + ')' + ' - ' + key;
  }
}
