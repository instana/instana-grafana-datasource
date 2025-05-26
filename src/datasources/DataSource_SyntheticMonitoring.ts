import { getRequest, postRequest } from '../util/request_handler';

import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { SelectableValue } from '@grafana/data';
import { InstanaQuery } from 'types/instana_query';
import TimeFilter from 'types/time_filter';
import { atLeastGranularity, getWindowSize } from 'util/time_util';
import _ from 'lodash';
import { getDefaultChartGranularity } from 'util/rollup_granularity_util';
import { emptyResultData } from 'util/target_util';

export class DataSourceSyntheticMonitoring {
  instanaOptions: InstanaOptions;
  SyntheticMonitoringCache: Cache<Promise<SelectableValue[]>>;
  miscCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.SyntheticMonitoringCache = new Cache<Promise<SelectableValue[]>>();
    this.miscCache = new Cache<any>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    if (!target?.metric?.key) {
      console.warn('Missing required target fields:', target);
      return Promise.resolve(emptyResultData(target.refId));
    }

    if (target.testType?.value !== 'metric') {
      console.warn('Skipping fetch: testtype is not metric', target.testType);
      return Promise.resolve(emptyResultData(target.refId));
    }

    return this.fetchMetricsForSyntheticMonitoring(target, timeFilter).then((response: any) => {
      const result: any[] = [];

      if (!response?.data?.metricsResult || !Array.isArray(response.data.metricsResult)) {
        console.warn('Invalid or empty metricsResult:', response);
        return emptyResultData(target.refId);
      }

      response.data.metricsResult.forEach((entry: any, index: number) => {
        const test = entry.tests?.[0];
        const metricEntry = entry.metrics?.[0];

        if (test && metricEntry) {
          const metricKey = Object.keys(metricEntry)[0];
          const metricValue = metricEntry[metricKey];

          const label = target.entity.value + '-' + target.metric.key;

          result.push({
            target: label,
            datapoints: [[metricValue, timeFilter.to]],
            refId: target.refId,
            key: target.stableHash,
          });
        }
      });

      return result;
    });
  }

  getSyntheticMonitoringtests() {
    let SyntheticMonitoringtests = this.miscCache.get('SyntheticMonitoringtests');
    if (SyntheticMonitoringtests) {
      return SyntheticMonitoringtests;
    }

    SyntheticMonitoringtests = getRequest(this.instanaOptions, '/api/synthetics/settings/tests').then(
      (tagsResponse: any) =>
        tagsResponse.data.map((entry: any) => ({
          key: entry.label,
          label: entry.label,
        }))
    );
    this.miscCache.put('mobileappTags', SyntheticMonitoringtests);

    return SyntheticMonitoringtests;
  }
  getSyntheticMonitoringTags() {
    let SyntheticMonitoringTags = this.miscCache.get('SyntheticMonitoringTags');
    if (SyntheticMonitoringTags) {
      return SyntheticMonitoringTags;
    }

    SyntheticMonitoringTags = getRequest(this.instanaOptions, '/api/synthetics/catalog?useCase=GROUPING').then(
      (tagsResponse: any) => tagsResponse.data.map((entry: any) => ({}))
    );
    this.miscCache.put('mobileappTags', SyntheticMonitoringTags);

    return SyntheticMonitoringTags;
  }

  getSyntheticMonitoringMetricsCatalog() {
    let SyntheticMonitoringMetricsCatalog = this.miscCache.get('SyntheticMonitoringMetricsCatalog');
    if (SyntheticMonitoringMetricsCatalog) {
      return SyntheticMonitoringMetricsCatalog;
    }

    SyntheticMonitoringMetricsCatalog = getRequest(this.instanaOptions, '/api/synthetics/catalog/metrics').then(
      (catalogResponse: any) =>
        catalogResponse.data.map((entry: any) => {
          return {
            key: entry.metricId,
            label: entry.label,
            aggregations: entry.aggregations.map((agg: string) => ({
              key: agg,
              label: agg,
            })),
            formatter: entry.formatter,
          };
        })
    );
    this.miscCache.put('SyntheticMonitoringMetricsCatalog', SyntheticMonitoringMetricsCatalog);

    return SyntheticMonitoringMetricsCatalog;
  }

  private fetchMetricsForSyntheticMonitoring(target: InstanaQuery, timeFilter: TimeFilter) {
    const windowSize = getWindowSize(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }
    target.metric.aggregation;

    const metric: any = {
      metric: target?.metric?.key ?? '',
      aggregation: target.aggregation.key,
      granularity: target?.timeInterval?.key ?? '300',
    };

    const data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, metric.granularity),
      },
      type: target?.entityType?.key ?? '',
      metrics: [metric],
    };

    return postRequest(this.instanaOptions, '/api/synthetics/metrics', data);
  }
}
