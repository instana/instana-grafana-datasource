import { getRequest, postRequest } from '../util/request_handler';
import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { SelectableValue } from '@grafana/data';
import { InstanaQuery } from 'types/instana_query';
import TimeFilter from 'types/time_filter';
import { atLeastGranularity, getWindowSize } from 'util/time_util';
import { emptyResultData } from 'util/target_util';
import { getDefaultChartGranularity } from 'util/rollup_granularity_util';

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
    if (!target?.metric?.key && target.testType?.value === 'metric') {
      console.warn('Missing required metric field for test type = metric:', target);
      return Promise.resolve(emptyResultData(target.refId));
    }

    if (!target?.entity?.value) {
      console.warn('Missing test selection (entity)', target);
      return Promise.resolve(emptyResultData(target.refId));
    }

    if (target.testType?.value === 'metric') {
      return this.fetchMetricsForSyntheticMonitoring(target, timeFilter).then((response: any) => {
        const result: any[] = [];
        if (!response?.data?.testResult) {
          console.warn('Invalid or empty results data:', response);
          return emptyResultData(target.refId);
        }

        response.data.testResult.forEach((item: any) => {
          const testName = item.testName ?? 'UnknownTest';
          const location = item.locationId?.[0] ?? 'UnknownLocation';

          if (Array.isArray(item.metrics)) {
            item.metrics.forEach((metricObj: any) => {
              const metricName = Object.keys(metricObj)[0];
              const metricValue = metricObj[metricName];
              const datapoints = [[metricValue, Date.now()]];

              result.push({
                target: `${testName} (${location}) - ${metricName}`,
                datapoints,
                refId: target.refId,
                key: target.stableHash,
              });
            });
          }
        });
        return result;
      });
    }

    return this.fetchResultsForSyntheticMonitoring(target, timeFilter).then((response: any) => {
      if (!response?.data?.items || !Array.isArray(response.data.items)) {
        console.warn('Invalid or empty results data:', response);
        return emptyResultData(target.refId);
      }

      const aggregatedMetrics: Record<string, [number, number][]> = {};
      let testName = 'UnknownTest';
      let locationLabel = 'UnknownLocation';

      response.data.items.forEach((item: any) => {
        const props = item.testResultCommonProperties ?? {};
        testName = props.testName ?? testName;
        locationLabel = props.locationDisplayLabel ?? props.locationId ?? locationLabel;

        const metrics = item.metrics ?? {};

        Object.entries(metrics).forEach(([metricName, dataPoints]: [string, any]) => {
          const points: [number, number][] = Array.isArray(dataPoints)
            ? dataPoints.filter(
                (entry): entry is [number, number] =>
                  Array.isArray(entry) &&
                  entry.length === 2 &&
                  typeof entry[0] === 'number' &&
                  typeof entry[1] === 'number'
              )
            : [];

          if (!aggregatedMetrics[metricName]) {
            aggregatedMetrics[metricName] = [];
          }

          aggregatedMetrics[metricName].push(...points);
        });
      });

      const result = Object.entries(aggregatedMetrics).map(([metricName, datapoints]) => ({
        target: `${testName} (${locationLabel}) - ${metricName}`,
        datapoints: datapoints.map(([ts, val]) => [val, ts]), // [value, timestamp]
        refId: target.refId,
        key: target.stableHash,
      }));

      return result;
    });
  }

  getSyntheticMonitoringtests() {
    let tests = this.miscCache.get('SyntheticMonitoringtests');
    if (tests) {
      return tests;
    }

    tests = getRequest(this.instanaOptions, '/api/synthetics/settings/tests').then((response: any) =>
      response.data.map((entry: any) => ({
        key: entry.label,
        label: entry.label,
        applicationId: entry.applicationId,
        testId: entry.id,
      }))
    );
    this.miscCache.put('SyntheticMonitoringtests', tests);
    return tests;
  }

  getSyntheticMonitoringTags() {
    let tags = this.miscCache.get('SyntheticMonitoringTags');
    if (tags) {
      return tags;
    }

    tags = getRequest(this.instanaOptions, '/api/synthetics/catalog?useCase=GROUPING').then((response: any) =>
      response.data.map((entry: any) => ({
        key: entry.name,
        label: entry.label ?? entry.name,
      }))
    );
    this.miscCache.put('SyntheticMonitoringTags', tags);
    return tags;
  }

  getSyntheticMonitoringMetricsCatalog() {
    let catalog = this.miscCache.get('SyntheticMonitoringMetricsCatalog');
    if (catalog) {
      return catalog;
    }

    catalog = getRequest(this.instanaOptions, '/api/synthetics/catalog/metrics').then((response: any) =>
      response.data.map((entry: any) => ({
        key: entry.metricId,
        label: entry.label,
        aggregations: entry.aggregations.map((agg: string) => ({ key: agg, label: agg })),
        formatter: entry.formatter,
      }))
    );
    this.miscCache.put('SyntheticMonitoringMetricsCatalog', catalog);
    return catalog;
  }

  private fetchMetricsForSyntheticMonitoring(target: InstanaQuery, timeFilter: TimeFilter) {
    const testId = target.testId;
    const windowSize = getWindowSize(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }

    const metric = {
      metric: target?.metric?.key,
      aggregation: target?.aggregation?.key || 'SUM',
      granularity: target?.timeInterval?.key,
    };

    const tagFilterExpression = {
      type: 'EXPRESSION',
      elements: [
        {
          name: 'synthetic.testId',
          operator: 'EQUALS',
          value: testId,
        },
      ],
      logicalOperator: 'AND',
    };

    const data = {
      metrics: [metric],
      tagFilterExpression,
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, metric.granularity),
      },
    };

    return postRequest(this.instanaOptions, '/api/synthetics/results', data);
  }

  private fetchResultsForSyntheticMonitoring(target: InstanaQuery, timeFilter: TimeFilter) {
    const testId = target.testId;
    const windowSize = getWindowSize(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }

    const tagFilterExpression = {
      type: 'EXPRESSION',
      elements: [
        {
          name: 'synthetic.testId',
          operator: 'EQUALS',
          value: testId,
        },
      ],
      logicalOperator: 'AND',
    };
    const granularity = target?.timeInterval?.key;

    const data = {
      syntheticMetrics: [target?.metric?.key],
      tagFilterExpression,
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, granularity),
      },
    };

    return postRequest(this.instanaOptions, '/api/synthetics/results/list', data);
  }
}
