import AbstractDatasource from './datasource_abstract';
import rollupDurationThresholds from './rollups';
import Cache from './cache';
import _ from 'lodash';

export interface EntityTypesCache {
  age: number;
  entityTypes: Array<Object>;
}

export default class InstanaInfrastructureDataSource extends AbstractDatasource {
  rollupDurationThresholds = rollupDurationThresholds;
  entityTypesCache: EntityTypesCache;
  snapshotCache: Cache;
  catalogCache: Cache;
  lastFetchedFromAPI: boolean;

  maximumNumberOfUsefulDataPoints = 800;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.snapshotCache = new Cache();
    this.catalogCache = new Cache();
  }

  getEntityTypes(metricCategory) {
    const now = this.currentTime();
    if (!this.entityTypesCache || now - this.entityTypesCache.age > this.CACHE_MAX_AGE) {
      this.entityTypesCache = {
        age: now,
        entityTypes: this.doRequest('/api/infrastructure-monitoring/catalog/plugins').then(typesResponse =>
          typesResponse.data.map(entry => ({
            'key' : entry.plugin,
            'label' : entry.label
          }))
        )
      };
    }
    return this.entityTypesCache.entityTypes;
  }

  getMetricsCatalog(plugin, metricCategory) {
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
        'entityType' : entry.pluginId
      }))
    );
    this.catalogCache.put(key, metrics);

    return metrics;
  }

  fetchTypesForTarget(target, timeFilter) {
    const fetchSnapshotTypesUrl = `/api/snapshots/types`+
      `?q=${encodeURIComponent(target.entityQuery)}` +
      `&from=${timeFilter.from}&to=${timeFilter.to}` +
      `&newApplicationModelEnabled=true`;
    return this.doRequest(fetchSnapshotTypesUrl);
  }

  fetchSnapshotsForTarget(target, timeFilter) {
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
      `&size=100` +
      `&newApplicationModelEnabled=true`;

    snapshots = this.doRequest(fetchSnapshotContextsUrl).then(contextsResponse => {
      return this.$q.all(
        contextsResponse.data.map(({snapshotId, host, plugin}) => {
          const fetchSnapshotUrl = `/api/snapshots/${snapshotId}`;

          return this.doRequest(fetchSnapshotUrl).then(snapshotResponse => {
            return {
              snapshotId, host,
              'response': this.reduceSnapshot(snapshotResponse)
            };
          });
        })
      );
    });
    this.snapshotCache.put(key, snapshots);

    return snapshots;
  }

  reduceSnapshot(snapshotResponse) {
    // reduce data to used label formatting values
    snapshotResponse.data = _.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
    return snapshotResponse;
  }

  buildQuery(target) {
    return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType.key}`);
  }

  buildSnapshotCacheKey(query, timeFilter) {
    return query + this.SEPARATOR + this.getTimeKey(timeFilter);
  }

  buildLabel(snapshotResponse, host, target) {
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
      return label;
    }
    return snapshotResponse.data.label + this.getHostSuffix(host);
  }

  getHostSuffix(host) {
    if (host) {
      return ' (on host "' + host + '")';
    }
    return '';
  }

  fetchMetricsForSnapshots(target, snapshots, timeFilter) {
    return this.$q.all(
      _.map(snapshots, snapshot => {
        // ...fetch the metric data for every snapshot in the results.
        return this.fetchMetricsForSnapshot(snapshot.snapshotId, target.metric.key, timeFilter).then(response => {
          const timeseries = response.data.values;
          var result = {
            'target': this.buildLabel(snapshot.response, snapshot.host, target),
            'datapoints': _.map(timeseries, value => [value.value, value.timestamp])
          };
          return result;
        });
      })
    );
  }

  fetchMetricsForSnapshot(snapshotId, metric, timeFilter) {
    const rollup = this.getDefaultMetricRollupDuration(timeFilter).rollup;
    const url = `/api/metrics?metric=${metric}&from=${timeFilter.from}&to=${timeFilter.to}&rollup=${rollup}&snapshotId=${snapshotId}`;

    return this.doRequest(url);
  }

  getDefaultMetricRollupDuration(timeFilter, minRollup = 1000) {
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
