import rollupDurationThresholds from './lists/rollups';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Rollup from './types/rollup';
import Cache from './cache';

import _ from 'lodash';

export default class InstanaInfrastructureDataSource extends AbstractDatasource {
  rollupDurationThresholds: Array<Rollup> = rollupDurationThresholds;

  snapshotCache: Cache<Promise<Array<Selectable>>>;
  catalogCache: Cache<Promise<Array<Selectable>>>;
  lastFetchedFromAPI: boolean;

  maximumNumberOfUsefulDataPoints = 800;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.snapshotCache = new Cache<Promise<Array<Selectable>>>();
    this.catalogCache = new Cache<Promise<Array<Selectable>>>();
  }

  getEntityTypes(metricCategory: string) {
    let entityTypes = this.simpleCache.get('entityTypes');
    if (entityTypes) {
      return entityTypes;
    }

    entityTypes = this.doRequest('/api/infrastructure-monitoring/catalog/plugins').then(typesResponse =>
      typesResponse.data.map(entry => ({
        'key' : entry.plugin,
        'label' : entry.label
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
        'key' : entry.metricId,
        'label' : metricCategory === this.CUSTOM_METRICS ? entry.description : entry.label, // custom-in metrics have shorter descriptions
        'aggregations': ['MEAN','SUM'],
        'entityType' : entry.pluginId
      }))
    );
    this.catalogCache.put(key, metrics);

    return metrics;
  }

  fetchTypesForTarget(target, timeFilter: TimeFilter) {
    const fetchSnapshotTypesUrl = `/api/snapshots/types`+
      `?q=${encodeURIComponent(target.entityQuery)}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      `&time=${timeFilter.to}` +
      `&newApplicationModelEnabled=true`;
    return this.doRequest(fetchSnapshotTypesUrl);
  }

  fetchSnapshotsForTarget(target, timeFilter: TimeFilter) {
    const query = this.buildQuery(target);
    const key = this.buildSnapshotCacheKey(query, timeFilter);

    let snapshots = this.snapshotCache.get(key);
    if (snapshots) {
      return snapshots;
    }

    const fetchSnapshotContextsUrl = `/api/snapshots/context`+
      `?q=${query}` +
      `&from=${timeFilter.from}` +
      `&to=${timeFilter.to}` +
      `&time=${timeFilter.to}` +
      `&size=100` +
      `&newApplicationModelEnabled=true`;

    snapshots = this.doRequest(fetchSnapshotContextsUrl).then(contextsResponse => {
      return this.$q.all(
        contextsResponse.data.map(({snapshotId, host, plugin}) => {
          const fetchSnapshotUrl = `/api/snapshots/${snapshotId}?time=${timeFilter.from}`;

          return this.doRequest(fetchSnapshotUrl, true).then(snapshotResponse => {
            // check for undefined because the fetchSnapshotContexts is buggy
            if (snapshotResponse !== undefined){
              return {
                snapshotId, host,
                'response': this.reduceSnapshot(snapshotResponse)
              };
            }
          });
        })
      );
    }).then(response => {
      // this has to be done, because the fetchSnapshotContexts is buggy in the backend, maybe can be removed in the future
      let newResponse = [];
      for (let i in response){
        if (response[i] !== undefined){
          newResponse.push(response[i]);
        }
      }
      return newResponse;
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
    if (`${target.entityQuery}`.includes("entity.pluginId:") || `${target.entityQuery}`.includes("entity.selfType:")){
      return encodeURIComponent(`${target.entityQuery}`);
    } else {
      return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType.key}`);
    }
  }

  buildSnapshotCacheKey(query: string, timeFilter: TimeFilter): string {
    return query + this.SEPARATOR + this.getTimeKey(timeFilter);
  }

  buildLabel(snapshotResponse, host, target, index): string {
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
      label = _.replace(label, '$metric', _.get(target, ['metric', 'key'], 'n/a'));
      label = _.replace(label, '$index', index + 1);
      return label;
    }
    return snapshotResponse.data.label + this.getHostSuffix(host);
  }

  getHostSuffix(host: string): string {
    if (host) {
      return ' (on host "' + host + '")';
    }
    return '';
  }

  fetchMetricsForSnapshots(target, snapshots, timeFilter: TimeFilter) {
    return this.$q.all(
      _.map(snapshots, (snapshot,index) => {
        // ...fetch the metric data for every snapshot in the results.
        return this.fetchMetricsForSnapshot(snapshot.snapshotId, target.metric.key, timeFilter).then(response => {
          const timeseries = this.readTimeSeries(response.data.values, target.aggregation, target.pluginId, timeFilter);
          var result = {
            'target': this.buildLabel(snapshot.response, snapshot.host, target, index),
            'datapoints': _.map(timeseries, value => [value.value, value.timestamp])
          };
          return result;
        });
      })
    );
  }

  readTimeSeries(values, aggregation: string, pluginId: string, timeFilter: TimeFilter) {
    if (aggregation === 'SUM' && (pluginId === 'singlestat' || pluginId === 'table')) {
      return this.correctMeanToSum(values, timeFilter);
    }
    return values;
  }

  correctMeanToSum(values, timeFilter: TimeFilter) {
    const secondMultiplier = this.getDefaultMetricRollupDuration(timeFilter).rollup / 1000;
    return _.map(values, value => {
     return {
       'value': value.value * secondMultiplier,
       'timestamp': value.timestamp
     };
    });
  }

  fetchMetricsForSnapshot(snapshotId: string, metric: string, timeFilter: TimeFilter) {
    const rollup = this.getDefaultMetricRollupDuration(timeFilter).rollup;
    const url = `/api/metrics?metric=${metric}&from=${timeFilter.from}&to=${timeFilter.to}&rollup=${rollup}&snapshotId=${snapshotId}`;

    return this.doRequest(url);
  }

  getDefaultMetricRollupDuration(timeFilter: TimeFilter, minRollup = 1000): Rollup {
    // Ignoring time differences for now since small time differences
    // can be accepted. This time is only used to calculate the rollup.
    const now = this.currentTime();
    const windowSize = this.getWindowSize(timeFilter);

    let availableRollupDefinitions = this.rollupDurationThresholds.filter(
      rollupDefinition => timeFilter.from >= now - rollupDefinition.availableFor
    );
    if (minRollup > 1000) {
      availableRollupDefinitions = availableRollupDefinitions.filter(
        rollupDefinition => rollupDefinition.rollup != null && rollupDefinition.rollup >= minRollup
      );
    }

    for (let i = 0, len = availableRollupDefinitions.length; i < len; i++) {
      // this works because the rollupDurationThresholds array is sorted by rollup
      // the first rollup matching the requirements is returned
      const rollupDefinition = availableRollupDefinitions[i];
      const rollup = rollupDefinition && rollupDefinition.rollup ? rollupDefinition.rollup : 1000;
      if (windowSize / rollup <= this.maximumNumberOfUsefulDataPoints) {
        return rollupDefinition;
      }
    }

    return this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1];
  }
}
