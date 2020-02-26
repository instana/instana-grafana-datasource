import {getDefaultMetricRollupDuration} from "./util/rollup_granularity_util";
import AbstractDatasource from './datasource_abstract';
import max_metrics from './lists/max_metrics';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';

import _ from 'lodash';

export default class InstanaInfrastructureDataSource extends AbstractDatasource {
  snapshotCache: Cache<Promise<Array<Selectable>>>;
  snapshotInfoCache: Cache<Promise<Array<Selectable>>>;
  catalogCache: Cache<Promise<Array<Selectable>>>;
  showOffline: boolean;
  timeToLiveSnapshotInfoCache = 60*60*1000;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.showOffline = instanceSettings.jsonData.showOffline;
    this.snapshotCache = new Cache<Promise<Array<Selectable>>>();
    this.snapshotInfoCache = new Cache<Promise<Array<Selectable>>>();
    this.catalogCache = new Cache<Promise<Array<Selectable>>>();
  }

  getEntityTypes() {
    let entityTypes = this.simpleCache.get('entityTypes');
    if (entityTypes) {
      return entityTypes;
    }

    entityTypes = this.doRequest('/api/infrastructure-monitoring/catalog/plugins').then(typesResponse =>
      typesResponse.data.map(entry => ({
        'key': entry.plugin,
        'label': entry.label
      }))
    );
    this.simpleCache.put('entityTypes', entityTypes);

    return entityTypes;
  }

  getMetricsCatalog(plugin: Selectable, metricCategory: string) {
    const key = plugin.key + this.SEPARATOR + metricCategory;

    let metrics = this.catalogCache.get(key);
    if (metrics) {
      return metrics;
    }

    const filter = metricCategory === this.CUSTOM_METRICS ? 'custom' : 'builtin';
    metrics = this.doRequest(`/api/infrastructure-monitoring/catalog/metrics/${plugin.key}?filter=${filter}`).then(catalogResponse =>
      catalogResponse.data.map(entry => ({
        'key': entry.metricId,
        'label': metricCategory === this.CUSTOM_METRICS ? entry.description : entry.label, // custom-in metrics have shorter descriptions
        'aggregations': ['MEAN', 'SUM'],
        'entityType': entry.pluginId
      }))
    );
    this.catalogCache.put(key, metrics);

    return metrics;
  }

  fetchTypesForTarget(target, timeFilter: TimeFilter) {
    const fetchSnapshotTypesUrl = `/api/snapshots/types` +
      `?q=${encodeURIComponent(target.entityQuery)}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.showOffline ? `` : `&time=${timeFilter.to}`);
    return this.doRequest(fetchSnapshotTypesUrl);
  }

  fetchSnapshotsForTarget(target, timeFilter: TimeFilter) {
    const query = this.buildQuery(target);
    const key = this.buildSnapshotCacheKey(query, timeFilter);

    let snapshots = this.snapshotCache.get(key);
    if (snapshots) {
      return snapshots;
    }

    const windowSize = this.getWindowSize(timeFilter);
    const fetchSnapshotContextsUrl = `/api/snapshots/context` +
      `?q=${query}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      (this.showOffline ? `` : `&time=${timeFilter.to}&size=100`);

    snapshots = this.doRequest(fetchSnapshotContextsUrl).then(contextsResponse => {
      return this.$q.all(
        contextsResponse.data.map(({snapshotId, host, plugin}) => {
          let snapshotInfo = this.snapshotInfoCache.get(snapshotId);
          if (snapshotInfo) {
            return snapshotInfo;
          }

          const fetchSnapshotUrl = `/api/snapshots/${snapshotId}` +
            (this.showOffline ?
              `?from=${timeFilter.from}&to=${timeFilter.to}` :
              `?time=${timeFilter.to}`); // @see SnapshotApiResource#getSnapshot

          snapshotInfo = this.doRequest(fetchSnapshotUrl, true).then(snapshotResponse => {
            // check for undefined because the fetchSnapshotContexts is buggy
            if (snapshotResponse !== undefined) {
              return {
                snapshotId, host,
                'response': this.reduceSnapshot(snapshotResponse)
              };
            }
          });

          this.snapshotInfoCache.put(snapshotId, snapshotInfo, this.timeToLiveSnapshotInfoCache);
          return snapshotInfo;
        })
      );
    }).then(response => {
      // undefined items need to be removed, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
      return _.compact(response);
    });
    this.snapshotCache.put(key, snapshots);

    return snapshots;
  }

  reduceSnapshot(snapshotResponse) {
    // reduce data to used label formatting values
    snapshotResponse.data = _.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
    return snapshotResponse;
  }

  buildQuery(target): string {
    // check for entity.pluginId or entity.selfType, because otherwise the backend has a problem with `AND entity.pluginId`
    if (`${target.entityQuery}`.includes("entity.pluginId:") || `${target.entityQuery}`.includes("entity.selfType:")) {
      return encodeURIComponent(`${target.entityQuery}`);
    } else {
      return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType.key}`);
    }
  }

  buildSnapshotCacheKey(query: string, timeFilter: TimeFilter): string {
    return query + this.SEPARATOR + this.getTimeKey(timeFilter);
  }

  buildLabel(snapshotResponse, host, target, index, metric): string {
    if (target.labelFormat) {
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

  getHostSuffix(host: string): string {
    if (host) {
      return ' (on host "' + host + '")';
    }
    return '';
  }

  fetchMetricsForSnapshots(target, snapshots, timeFilter: TimeFilter, metric) {
    const windowSize = this.getWindowSize(timeFilter);
    let maxValues = [];
    let res = _.map(snapshots, (snapshot, index) => {
        // ...fetch the metric data for every snapshot in the results.
      return this.fetchMetricsForSnapshot(snapshot.snapshotId, timeFilter, target.timeInterval.key, metric).then(response => {
        let timeseries = this.readTimeSeries(response.data.values, target.aggregation, target.pluginId, timeFilter);
        var result = {
          'target': this.buildLabel(snapshot.response, snapshot.host, target, index, metric),
          'datapoints': _.map(timeseries, value => [value.value, value.timestamp]),
          'refId': target.refId
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
      return this.$q.all(allResults);
    });
  }

  buildMaxMetricTarget(target, timeseries, maxValue, resultLabel) {
    return {
      'target': resultLabel + ' ' + this.convertMetricNameToMaxLabel(target.metric),
      'datapoints': [
        [maxValue, timeseries[0].timestamp],
        [maxValue, timeseries[timeseries.length - 1].timestamp]
      ],
      'refId': target.refId
    };
  }

  convertRelativeToAbsolute(datapoints, maxValue) {
    return _.map(datapoints, (datapoint, index) => {
      if (datapoint[0]) {
        return [datapoint[0] * maxValue, datapoint[1]];
      }
      return [null, datapoint[1]];
    });
  }

  convertMetricNameToMaxLabel(metric): string {
    return _.find(max_metrics, m => m.key === metric.key).label;
  }

  getMaxMetricValue(metric, snapshot): number {
    return snapshot.response.data.data[_.find(max_metrics, m => m.key === metric.key).value];
  }

  readTimeSeries(values, aggregation: string, pluginId: string, timeFilter: TimeFilter) {
    if (aggregation === 'SUM' && (pluginId === 'singlestat' || pluginId === 'gauge' || pluginId === 'table')) {
      return this.correctMeanToSum(values, timeFilter);
    }
    return values;
  }

  correctMeanToSum(values, timeFilter: TimeFilter) {
    const secondMultiplier = parseInt(getDefaultMetricRollupDuration(timeFilter).key) / 1000;
    return _.map(values, value => {
      return {
        'value': value.value ? value.value * secondMultiplier : null,
        'timestamp': value.timestamp
      };
    });
  }

  fetchMetricsForSnapshot(snapshotId: string, timeFilter: TimeFilter, rollup: number, metric) {
    let url =
      `/api/metrics?metric=${metric.key}`
      + `&from=${timeFilter.from}`
      + `&to=${timeFilter.to}`
      + `&rollup=${rollup}`
      + `&fillTimeSeries=true`
      + `&snapshotId=${snapshotId}`;
    return this.doRequest(url);
  }
}
