import { CUSTOM_METRICS, INFRASTRUCTURE_ANALYZE, SEPARATOR } from '../GlobalVariables';
import { atLeastGranularity, getTimeKey, getWindowSize, hoursToMs } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { emptyResultData } from '../util/target_util';
import { getDefaultChartGranularity, getDefaultMetricRollupDuration } from '../util/rollup_granularity_util';
import { isInvalidQueryInterval } from '../util/queryInterval_check';
import max_metrics from '../lists/max_metrics';

export class DataSourceInfrastructure {
  instanaOptions: InstanaOptions;
  snapshotCache: Cache<Promise<SelectableValue[]>>;
  snapshotInfoCache: Cache<Promise<SelectableValue[]>>;
  catalogCache: Cache<Promise<SelectableValue[]>>;
  typeCache: Cache<Promise<SelectableValue[]>>;
  timeToLiveSnapshotInfoCache = 4000000; // set to 1,11 hour
  miscCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.snapshotCache = new Cache<Promise<SelectableValue[]>>();
    this.snapshotInfoCache = new Cache<Promise<SelectableValue[]>>();
    this.catalogCache = new Cache<Promise<SelectableValue[]>>();
    this.typeCache = new Cache<Promise<SelectableValue[]>>();
    this.miscCache = new Cache<any>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (isInvalidQueryInterval(timeFilter.windowSize, hoursToMs(this.instanaOptions.queryinterval_limit_infra))) {
      throw new Error(
        'Limit for maximum selectable windowsize exceeded, max is: ' +
          this.instanaOptions.queryinterval_limit_infra +
          ' hours'
      );
    }

    if (
      target.tagFilterExpression ||
      (target.metricCategory.key === INFRASTRUCTURE_ANALYZE &&
        target.metric.key &&
        target.group.key &&
        target.entity.key)
    ) {
      return this.fetchAnalyzeEntities(target, timeFilter);
    }

    // do not try to retrieve data without selected metric
    if ((!target.metric || !target.metric.key) && !target.showAllMetrics && !target.freeTextMetrics) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
    return this.fetchSnapshotsForTarget(target, timeFilter).then((snapshots) => {
      if (target.showAllMetrics) {
        // only available for custom metrics
        return this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, target.allMetrics);
      } else if (target.freeTextMetrics) {
        // only available for custom metrics
        const metrics = this.extractMetricsFromText(target.freeTextMetrics);
        return this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, metrics);
      } else {
        return this.fetchMetricsForSnapshots(target, snapshots, timeFilter, target.metric);
      }
    });
  }

  extractMetricsFromText(freeText: string): string[] {
    const metricsString = freeText.replace(/\s/g, '').split(',');
    let metrics: string[] = [];
    _.each(metricsString, (metricString) => metrics.push(JSON.parse('{ "key": "' + metricString + '"}')));

    if (metrics.length > 4) {
      metrics = metrics.slice(0, 4); // API supports up to 4 metrics at once
    }

    return metrics;
  }

  fetchMultipleMetricsForSnapshots(target: InstanaQuery, snapshots: any, timeFilter: TimeFilter, metrics: any) {
    const resultPromises: any = [];
    _.forEach(metrics, (metric) => {
      resultPromises.push(this.fetchMetricsForSnapshots(target, snapshots, timeFilter, metric));
    });

    return Promise.all(resultPromises).then((allResults) => {
      const allMetrics: any = [];
      allResults.forEach((result: any) => result.forEach((s: any) => allMetrics.push(s)));
      return allMetrics;
    });
  }

  fetchMetricsForSnapshots(target: InstanaQuery, snapshots: any, timeFilter: TimeFilter, metric: any) {
    let maxValues: any = [];
    let snapshotIds: string[] = [];
    _.map(snapshots, (snapshot) => snapshotIds.push(snapshot.snapshotId));
    // ...fetch the metric data for every snapshot in the results.
    return this.fetchMetricsForSnapshot(target, snapshotIds.slice(0, 30), timeFilter, metric).then((response: any) => {
      if (!response.data) {
        return response;
      }
      let timeseries = this.readTimeSeries(response.data.items, target.aggregation, timeFilter);
      // as we map two times we need to flatten the result
      let results = _.flatten(
        response.data.items.map((item: any, index: number) => {
          return _.map(item.metrics, (value, key) => {
            let result = {
              target: item.label,
              datapoints: _.map(value, (metric) => [metric[1], metric[0]]),
              refId: target.refId,
              key: target.stableHash,
            };
            if (target.displayMaxMetricValue) {
              const maxValue = this.getMaxMetricValue(target.metric, snapshots);
              maxValues.push(this.buildMaxMetricTarget(target, timeseries, maxValue, result.target));
              result.datapoints = this.convertRelativeToAbsolute(result.datapoints, maxValue);
            }
            return result;
          });
        })
      );
      return results;
    });
  }

  getMaxMetricValue(metric: any, snapshot: any): number {
    const maxMetrics: any = max_metrics;
    return snapshot.response.data.data[_.find(maxMetrics, (m: any) => m.key === metric.key).value];
  }

  buildMaxMetricTarget(target: any, timeseries: any, maxValue: any, resultLabel: any) {
    let datapoints = _.map(timeseries, (series) => {
      return [maxValue, series.timestamp];
    });

    let maxLabel = this.convertMetricNameToMaxLabel(target.metric);

    return {
      target: resultLabel + ' ' + maxLabel,
      datapoints: datapoints,
      refId: target.refId,
      key: target.stableHash + maxLabel,
    };
  }

  convertMetricNameToMaxLabel(metric: any): string {
    const maxMetrics: any = max_metrics;
    return _.find(maxMetrics, (m) => m.key === metric.key).label;
  }

  convertRelativeToAbsolute(datapoints: any, maxValue: any) {
    return _.map(datapoints, (datapoint) => {
      if (datapoint[0]) {
        return [datapoint[0] * maxValue, datapoint[1]];
      }
      return [null, datapoint[1]];
    });
  }

  getEntityTypes(): Promise<SelectableValue[]> {
    let entityTypes = this.typeCache.get('entityTypes');
    if (entityTypes) {
      return entityTypes;
    }

    entityTypes = getRequest(this.instanaOptions, '/api/infrastructure-monitoring/catalog/plugins').then(
      (typesResponse: any) => {
        const result = typesResponse.data.map((entry: any) => ({
          key: entry.plugin,
          label: entry.label,
        }));

        result.push({
          key: 'regionEntity',
          label: 'Region',
        });

        return _.sortBy(result, 'label');
      }
    );

    this.typeCache.put('entityTypes', entityTypes);

    return entityTypes;
  }

  fetchTypesForTarget(query: InstanaQuery, timeFilter: TimeFilter): any {
    const fetchSnapshotTypesUrl =
      `/api/snapshots/types` +
      `?q=${encodeURIComponent(query.entityQuery)}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.instanaOptions.showOffline ? `` : `&time=${timeFilter.to}`);
    return getRequest(this.instanaOptions, fetchSnapshotTypesUrl);
  }

  fetchAvailableMetricsForEntityType(target: InstanaQuery, timeFilter: TimeFilter) {
    const windowSize = getWindowSize(timeFilter);
    target.timeInterval = getDefaultChartGranularity(windowSize);
    const data = {
      tagFilterExpression: {
        type: 'EXPRESSION',
        logicalOperator: 'AND',
        elements: [],
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, target.timeInterval.key),
      },
      query: '',
      type: target.entity.key,
    };

    let metricFortarget = postRequest(this.instanaOptions, '/api/infrastructure-monitoring/analyze/metrics', data).then(
      (metricResponse: any) => {
        let result: any[] = [];
        metricResponse.data.metrics.map((metric: any) =>
          result.push({
            key: metric.id,
            label: metric.label,
            description: metric.description,
            aggregations: [
              { key: 'MAX', label: 'MAX' },
              { key: 'MEAN', label: 'MEAN' },
              { key: 'MIN', label: 'MIN' },
              { key: 'P25', label: 'P25' },
              { key: 'P50', label: 'P50' },
              { key: 'P75', label: 'P75' },
              { key: 'P90', label: 'P90' },
              { key: 'P95', label: 'P95' },
              { key: 'P98', label: 'P98' },
              { key: 'P99', label: 'P99' },
            ],
          })
        );

        return _.sortBy(result, 'label');
      }
    );
    return metricFortarget;
  }

  fetchAnalyzeEntities(target: InstanaQuery, timeFilter: TimeFilter) {
    const windowSize = getWindowSize(timeFilter);
    let tagFilters: any[] = [];

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }
    if (target.timeInterval.key < 60000) {
      target.timeInterval.key = 60000;
    }
    _.forEach(target.filters, (filter) => {
      tagFilters.push(filter);
    });
    const metric: any = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key,
    };
    const payload = {
      tagFilterExpression: {
        elements: tagFilters,
        type: 'EXPRESSION',
        logicalOperator: 'AND',
      },
      pagination: {
        retrievalSize: 200,
      },
      groupBy: [target.groupbyTagSecondLevelKey],
      type: target.entity.key,
      metrics: [metric],
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, metric.granularity),
      },
    };

    return postRequest(this.instanaOptions, '/api/infrastructure-monitoring/analyze/entity-groups', payload).then(
      (res: any) => {
        let result: any = [];

        if (!res.data && res.errors.length >= 1) {
          throw new Error(res.errors[0].message || res.errors[0]);
        }

        res.data.items.forEach((entity: any) => {
          for (var metric in entity.metrics) {
            result.push({
              target: entity.tags[target.groupbyTagSecondLevelKey] + ' - ' + metric,
              datapoints: entity.metrics[metric]
                ? entity.metrics[metric].map((datapoint: any) => [datapoint[1], datapoint[0]])
                : [],
              refId: target.refId,
              key: target.stableHash,
            });
          }
        });

        return result;
      }
    );
  }

  getMetricsCatalog(plugin: SelectableValue, metricCategory: number): Promise<SelectableValue[]> {
    const key = plugin.key + '|' + metricCategory;

    let metrics = this.catalogCache.get(key);
    if (metrics) {
      return metrics;
    }

    const filter = metricCategory === CUSTOM_METRICS ? 'custom' : 'builtin';
    metrics = getRequest(
      this.instanaOptions,
      `/api/infrastructure-monitoring/catalog/metrics/${plugin.key}?filter=${filter}`
    ).then((catalogResponse: any) =>
      catalogResponse.data.map((entry: any) => ({
        key: entry.metricId,
        label: entry.label,
        description: entry.metricId,
        aggregations: [
          { key: 'MEAN', label: 'MEAN' },
          { key: 'SUM', label: 'SUM' },
        ],
        entityType: entry.pluginId,
      }))
    );

    this.catalogCache.put(key, metrics);

    return metrics;
  }

  fetchSnapshotsForTarget(target: InstanaQuery, timeFilter: TimeFilter) {
    const query = this.buildQuery(target);
    const key = this.buildSnapshotCacheKey(query, timeFilter);

    let snapshots = this.snapshotCache.get(key);
    if (snapshots) {
      return snapshots;
    }

    const fetchSnapshotContextsUrl =
      `/api/infrastructure-monitoring/snapshots` +
      `?plugin=${target.entityType.key}` +
      '&size=100' +
      `&q=${target.entityQuery}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.instanaOptions.showOffline ? `` : `&time=${timeFilter.to}`);

    snapshots = getRequest(this.instanaOptions, fetchSnapshotContextsUrl)
      .then((contextsResponse: any) => {
        return Promise.all(
          contextsResponse.data.items.map(({ snapshotId, host }: any) => {
            let snapshotInfo = this.snapshotInfoCache.get(snapshotId);
            if (snapshotInfo) {
              return snapshotInfo;
            }

            const fetchSnapshotUrl =
              `/api/infrastructure-monitoring/snapshots/${snapshotId}` +
              (this.instanaOptions.showOffline
                ? `?from=${timeFilter.from}&to=${timeFilter.to}`
                : `?time=${timeFilter.to}`); // @see SnapshotApiResource#getSnapshot

            snapshotInfo = getRequest(this.instanaOptions, fetchSnapshotUrl, true).then((snapshotResponse: any) => {
              // check for undefined because the fetchSnapshotContexts is buggy
              if (snapshotResponse !== undefined) {
                return {
                  snapshotId,
                  host,
                  response: this.reduceSnapshot(snapshotResponse),
                };
              }

              return null;
            });

            this.snapshotInfoCache.put(snapshotId, snapshotInfo, this.timeToLiveSnapshotInfoCache);
            return snapshotInfo;
          })
        );
      })
      .then((response: any) => {
        // undefined items need to be removed, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
        return _.compact(response);
      });

    this.snapshotCache.put(key, snapshots);
    return snapshots;
  }

  buildQuery(target: InstanaQuery): string {
    // check for entity.pluginId or entity.selfType, because otherwise the backend has a problem with `AND entity.pluginId`
    if (`${target.entityQuery}`.includes('entity.pluginId:') || `${target.entityQuery}`.includes('entity.selfType:')) {
      return encodeURIComponent(`${target.entityQuery}`);
    } else {
      return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType.key}`);
    }
  }

  buildSnapshotCacheKey(query: string, timeFilter: TimeFilter): string {
    return query + SEPARATOR + getTimeKey(timeFilter);
  }

  reduceSnapshot(snapshotResponse: any) {
    // reduce data to used label formatting values
    snapshotResponse.data = _.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
    return snapshotResponse;
  }

  readTimeSeries(values: any, aggregation: SelectableValue, timeFilter: TimeFilter) {
    if (aggregation && aggregation.key === 'SUM') {
      return this.correctMeanToSum(values, timeFilter);
    }
    return values;
  }

  correctMeanToSum(values: any, timeFilter: TimeFilter) {
    const secondMultiplier = parseInt(getDefaultMetricRollupDuration(timeFilter).key, 10) / 1000;
    return _.map(values, (value) => {
      return {
        value: value.value ? value.value * secondMultiplier : null,
        timestamp: value.timestamp,
      };
    });
  }

  fetchMetricsForSnapshot(target: InstanaQuery, snapshotIds: string[], timeFilter: TimeFilter, metric: any) {
    const windowSize = getWindowSize(timeFilter);
    target.timeInterval = getDefaultChartGranularity(windowSize);
    const data = {
      metrics: [metric.key],
      query: target.entityQuery,
      plugin: target.entityType.key,
      rollup: target.timeInterval.key,
      snapshotIds,
      timeFrame: {
        to: timeFilter.to,
        windowSize: atLeastGranularity(windowSize, target.timeInterval.key),
      },
    };
    return postRequest(this.instanaOptions, '/api/infrastructure-monitoring/metrics', data);
  }

  getHostSuffix(host: string): string {
    if (host) {
      return ' (on host "' + host + '")';
    }
    return '';
  }

  buildLabel(snapshotResponse: any, host: any, target: InstanaQuery, index: any, metric: any): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', snapshotResponse.label);
      label = _.replace(label, '$plugin', snapshotResponse.plugin); // not documented
      label = _.replace(label, '$snapshot', snapshotResponse.snapshotId); // not documented
      label = _.replace(label, '$host', host ? host : 'unknown');
      label = _.replace(label, '$pid', _.get(snapshotResponse, ['data', 'pid'], ''));
      label = _.replace(label, '$type', _.get(snapshotResponse, ['data', 'type'], ''));
      label = _.replace(label, '$name', _.get(snapshotResponse, ['data', 'name'], ''));
      label = _.replace(label, '$service', _.get(snapshotResponse, ['data', 'service_name'], ''));
      if (target.freeTextMetrics) {
        label = _.replace(label, '$metric', metric.key);
      } else {
        label = _.replace(label, '$metric', _.get(target, ['metric', 'key'], 'n/a'));
      }
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }
    return target.timeShift && target.timeShiftIsValid
      ? snapshotResponse.label + this.getHostSuffix(host) + ' - ' + target.timeShift
      : snapshotResponse.label + this.getHostSuffix(host);
  }
}
