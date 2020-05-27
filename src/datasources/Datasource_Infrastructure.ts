import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from "../types/instana_options";
import { InstanaQuery } from "../types/instana_query";
import { getRequest } from "../util/request_handler";
import TimeFilter from "../types/time_filter";
import Cache from '../cache';
import { CUSTOM_METRICS, SEPARATOR } from '../GlobalVariables';
import _ from 'lodash';
import { getTimeKey } from '../util/time_util';
import { isInvalidQueryInterval } from '../util/queryInterval_check';
import { emptyResultData } from '../util/target_util';
import { getDefaultMetricRollupDuration } from '../util/rollup_granularity_util';
import max_metrics from '../lists/max_metrics';

export class DataSourceInfrastructure {
  instanaOptions: InstanaOptions;
  snapshotCache: Cache<Promise<Array<SelectableValue>>>;
  snapshotInfoCache: Cache<Promise<Array<SelectableValue>>>;
  catalogCache: Cache<Promise<Array<SelectableValue>>>;
  typeCache: Cache<Promise<Array<SelectableValue>>>;
  timeToLiveSnapshotInfoCache: number = 60*60*1000;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.snapshotCache = new Cache<Promise<Array<SelectableValue>>>();
    this.snapshotInfoCache = new Cache<Promise<Array<SelectableValue>>>();
    this.catalogCache = new Cache<Promise<Array<SelectableValue>>>();
    this.typeCache = new Cache<Promise<Array<SelectableValue>>>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (isInvalidQueryInterval(timeFilter.windowSize, this.instanaOptions.queryinterval_limit_infra)) {
      //return this.rejectLargeTimeWindow(this.maxWindowSizeInfrastructure);
      return Promise.resolve(emptyResultData(target.refId));
    }

    // do not try to retrieve data without selected metric
    if ((!target.metric || !target.metric.key) && !target.showAllMetrics && !target.freeTextMetrics) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
    return this.fetchSnapshotsForTarget(target, timeFilter).then(snapshots => {
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
      metrics.slice(0, 3); // API supports up to 4 metrics at once
    }

    return metrics;
  }

  fetchMultipleMetricsForSnapshots(target: InstanaQuery, snapshots: any, timeFilter: TimeFilter, metrics: any) {
    const resultPromises: any = [];
    _.forEach(metrics, metric => {
      resultPromises.push(this.fetchMetricsForSnapshots(target, snapshots, timeFilter, metric));
    });

    return Promise.all(resultPromises).then(allResults => {
      const allMetrics: any = [];
      allResults.forEach((result: any) => result.forEach((s: any) => allMetrics.push(s)));
      return allMetrics;
    });
  }

  fetchMetricsForSnapshots(target: InstanaQuery, snapshots: any, timeFilter: TimeFilter, metric: any) {
    let maxValues: any = [];
    let res = _.map(snapshots, (snapshot, index) => {
      // ...fetch the metric data for every snapshot in the results.
      return this.fetchMetricsForSnapshot(snapshot.snapshotId, timeFilter, target.timeInterval.key, metric).then((response: any) => {
        let timeseries = this.readTimeSeries(response.data.values, target.aggregation, target.pluginId, timeFilter);
        let result = {
          'target': this.buildLabel(snapshot.response, snapshot.host, target, index, metric),
          'datapoints': _.map(timeseries, value => [value.value, value.timestamp]),
          'refId': target.refId,
          'key': target.stableHash
        };

        if (target.displayMaxMetricValue) {
          const maxValue = this.getMaxMetricValue(target.metric, snapshot);
          maxValues.push(this.buildMaxMetricTarget(target, timeseries, maxValue, result.target));
          result.datapoints = this.convertRelativeToAbsolute(result.datapoints, maxValue);
        }

        return result;
      });
    });

    return Promise.all(res).then(allResults => {
      if (target.displayMaxMetricValue) {
        allResults = _.concat(res,maxValues);
      }
      return Promise.all(allResults);
    });
  }

  getMaxMetricValue(metric: any, snapshot: any): number {
    return snapshot.response.data.data[_.find(max_metrics, m => m.key === metric.key).value];
  }

  buildMaxMetricTarget(target: any, timeseries: any, maxValue: any, resultLabel: any) {
    let datapoints = _.map(timeseries, (series) => {
      return [maxValue, series.timestamp];
    });

    let maxLabel = this.convertMetricNameToMaxLabel(target.metric);

    return {
      'target': resultLabel + ' ' + maxLabel,
      'datapoints': datapoints,
      'refId': target.refId,
      'key': target.stableHash + maxLabel
    };
  }

  convertMetricNameToMaxLabel(metric: any): string {
    return _.find(max_metrics, m => m.key === metric.key).label;
  }

  convertRelativeToAbsolute(datapoints: any, maxValue: any) {
    return _.map(datapoints, (datapoint) => {
      if (datapoint[0]) {
        return [datapoint[0] * maxValue, datapoint[1]];
      }
      return [null, datapoint[1]];
    });
  }

  getEntityTypes(): Promise<SelectableValue<string>[]> {
    let entityTypes = this.typeCache.get('entityTypes');
    if (entityTypes) {
      return entityTypes;
    }

    entityTypes = getRequest(this.instanaOptions, '/api/infrastructure-monitoring/catalog/plugins')
      .then((typesResponse: any) =>
      typesResponse.data.map((entry: any) => ({
        'key': entry.plugin,
        'label': entry.label
      }))
    );

    this.typeCache.put('entityTypes', entityTypes);

    return entityTypes;
  }

  fetchTypesForTarget(query: InstanaQuery, timeFilter: TimeFilter): any {
    const fetchSnapshotTypesUrl = `/api/snapshots/types` +
      `?q=${encodeURIComponent(query.entityQuery)}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.instanaOptions.showOffline ? `` : `&time=${timeFilter.to}`);
    return getRequest(this.instanaOptions, fetchSnapshotTypesUrl);
  }

  getMetricsCatalog(plugin: SelectableValue, metricCategory: number): Promise<SelectableValue<string>[]> {
    const key = plugin.key + '|' + metricCategory;

    let metrics = this.catalogCache.get(key);
    if (metrics) {
      return metrics;
    }

    const filter = metricCategory === CUSTOM_METRICS ? 'custom' : 'builtin';
    metrics = getRequest(this.instanaOptions, `/api/infrastructure-monitoring/catalog/metrics/${plugin.key}?filter=${filter}`).then((catalogResponse: any) =>
      catalogResponse.data.map((entry: any) => ({
        'key': entry.metricId,
        'label': entry.label,
        'aggregations': ['MEAN', 'SUM'],
        'entityType': entry.pluginId
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

    const fetchSnapshotContextsUrl = `/api/snapshots/context` +
      `?q=${query}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.instanaOptions.showOffline ? `` : `&time=${timeFilter.to}&size=100`);

    snapshots = getRequest(this.instanaOptions, fetchSnapshotContextsUrl).then((contextsResponse: any) => {
      return Promise.all(
        contextsResponse.data.map(({snapshotId, host}: any) => {
          let snapshotInfo = this.snapshotInfoCache.get(snapshotId);
          if (snapshotInfo) {
            return snapshotInfo;
          }

          const fetchSnapshotUrl = `/api/snapshots/${snapshotId}` +
            (this.instanaOptions.showOffline ?
              `?from=${timeFilter.from}&to=${timeFilter.to}` :
              `?time=${timeFilter.to}`); // @see SnapshotApiResource#getSnapshot

          snapshotInfo = getRequest(this.instanaOptions, fetchSnapshotUrl, true).then((snapshotResponse: any) => {
            // check for undefined because the fetchSnapshotContexts is buggy
            if (snapshotResponse !== undefined) {
              return {
                snapshotId, host,
                'response': this.reduceSnapshot(snapshotResponse)
              };
            }

            return null;
          });

          this.snapshotInfoCache.put(snapshotId, snapshotInfo, this.timeToLiveSnapshotInfoCache);
          return snapshotInfo;
        })
      );
    }).then((response: any) => {
      // undefined items need to be removed, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
      return _.compact(response);
    });

    this.snapshotCache.put(key, snapshots);
    return snapshots;
  }

  buildQuery(target: InstanaQuery): string {
    // check for entity.pluginId or entity.selfType, because otherwise the backend has a problem with `AND entity.pluginId`
    if (`${target.entityQuery}`.includes("entity.pluginId:") || `${target.entityQuery}`.includes("entity.selfType:")) {
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

  readTimeSeries(values: any, aggregation: SelectableValue, pluginId: string, timeFilter: TimeFilter) {
    if (aggregation && aggregation.label === 'SUM' && (pluginId === 'singlestat' || pluginId === 'gauge' || pluginId === 'table')) {
      return this.correctMeanToSum(values, timeFilter);
    }
    return values;
  }

  correctMeanToSum(values: any, timeFilter: TimeFilter) {
    const secondMultiplier = parseInt(getDefaultMetricRollupDuration(timeFilter).key) / 1000;
    return _.map(values, value => {
      return {
        'value': value.value ? value.value * secondMultiplier : null,
        'timestamp': value.timestamp
      };
    });
  }

  fetchMetricsForSnapshot(snapshotId: string, timeFilter: TimeFilter, rollup: number, metric: any) {
    let url =
      `/api/metrics?metric=${metric.key}`
      + `&from=${timeFilter.from}`
      + `&to=${timeFilter.to}`
      + `&rollup=60000` //${rollup}`
      + `&fillTimeSeries=true`
      + `&snapshotId=${snapshotId}`;
    return getRequest(this.instanaOptions, url);
  }

  getHostSuffix(host: string): string {
    if (host) {
      return ' (on host "' + host + '")';
    }
    return '';
  }

  buildLabel(snapshotResponse: any, host: any, target: InstanaQuery, index: any, metric: any): string {
    if (target.labelFormat) {
      console.log("geht rein");
      let label = target.labelFormat;
      label = _.replace(label, '$label', snapshotResponse.data.label);
      label = _.replace(label, '$plugin', snapshotResponse.data.plugin); // not documented
      label = _.replace(label, '$snapshot', snapshotResponse.data.id); // not documented
      label = _.replace(label, '$host', host ? host : 'unknown');
      label = _.replace(label, '$pid', _.get(snapshotResponse.data, ['data', 'pid'], ''));
      label = _.replace(label, '$type', _.get(snapshotResponse.data, ['data', 'type'], ''));
      label = _.replace(label, '$name', _.get(snapshotResponse.data, ['data', 'name'], ''));
      label = _.replace(label, '$service', _.get(snapshotResponse.data, ['data', 'service_name'], ''));
      if (target.freeTextMetrics) {
        label = _.replace(label, '$metric', metric.key);
      } else {
        label = _.replace(label, '$metric', _.get(target, ['metric', 'key'], 'n/a'));
      }
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }
    return target.timeShift && target.timeShiftIsValid ?
      snapshotResponse.data.label + this.getHostSuffix(host) + " - " + target.timeShift
      :
      snapshotResponse.data.label + this.getHostSuffix(host);
  }
}
