import rollupDurationThresholds from './rollups';
import _ from 'lodash';

export interface EntityTypesCache {
  age: number;
  entityTypes: Array<Object>;
}

export default class InstanaDatasource {
  rollupDurationThresholds = rollupDurationThresholds;
  id: number;
  name: string;
  url: string;
  apiToken: string;
  currentTime: () => number;
  entityTypesCache: EntityTypesCache;
  snapshotCache: Object;
  catalogCache: Object;
  fromFilter: number;
  toFilter: number;
  lastFetchedFromAPI: boolean;

  MAX_NUMBER_OF_METRICS_FOR_CHARTS = 800;
  CACHE_MAX_AGE = 60000;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.snapshotCache = {};
    this.catalogCache = {};

    // 5.3+ wanted to resolve dynamic routes in proxy mode
    const version = _.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
    const versions = _.split(version, '.', 2);
    if (versions[0] >= 5 && versions[1] >= 3) {
      this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
    } else {
      this.url = instanceSettings.jsonData.url;
      this.apiToken = instanceSettings.jsonData.apiToken;
      console.log(`No proxy mode, send request to ${this.url} directly.`);
    }

    this.currentTime = () => { return new Date().getTime(); };
  }

  storeInCache = (query, data) => {
    this.snapshotCache[query] = data;
  }

  wasLastFetchedFromApi = () => { return this.lastFetchedFromAPI; };

  setLastFetchedFromApi = (value) => { this.lastFetchedFromAPI = value; };

  doRequest(url, maxRetries = 1) {
    const request = {
      method: 'GET',
      url: this.url + url
    };
    if (this.apiToken) {
      request['headers'] = { Authorization: 'apiToken ' + this.apiToken };
    }
    return this.backendSrv
      .datasourceRequest(request)
      .catch(error => {
        if (maxRetries > 0) {
          return this.doRequest(url, maxRetries - 1);
        }
        throw error;
      });
  }

  getEntityTypes() {
    const now = this.currentTime();
    if (!this.entityTypesCache || now - this.entityTypesCache.age > this.CACHE_MAX_AGE) {
      this.entityTypesCache = {
        age: now,
        entityTypes: this.doRequest('/api/infrastructure-monitoring/catalog/plugins/').then(typesResponse =>
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
    const id = plugin + '|' + metricCategory;
    const now = this.currentTime();
    if (!this.catalogCache[id] || now - this.catalogCache[id].age > this.CACHE_MAX_AGE) {
      const filter = metricCategory === 1 ? 'custom' : 'builtin';
      this.catalogCache[id] = {
        age: now,
        metrics: this.doRequest(`/api/infrastructure-monitoring/catalog/metrics/${plugin}?filter=${filter}`).then(catalogResponse =>
          catalogResponse.data.map(entry => ({
            'key' : entry.metricId,
            'label' : metricCategory === 1 ? entry.description : entry.label, // built in metrics have nicer labels
            'entityType' : entry.pluginId
          }))
        )
      };
    }
    return this.catalogCache[id].metrics;
  }

  query(options) {
    if (Object.keys(options.targets[0]).length === 0) {
      return this.$q.resolve({ data: [] });
    }

    // Convert ISO 8601 timestamps to millis.
    this.fromFilter  = new Date(options.range.from).getTime();
    this.toFilter = new Date(options.range.to).getTime();
    return this.$q.all(
      _.map(options.targets, target => {
        // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
        return this.fetchSnapshotsForTarget(target, this.fromFilter, this.toFilter)
          .then(snapshots => {
            return {
              'target': target,
              'snapshots': snapshots
            };
          });
      })
    ).then(targetsWithSnapshots => {
      return this.$q.all(
        _.map(targetsWithSnapshots, targetWithSnapshots => {
          // For every target with all snapshots that were returned by the lucene query...
          // Cache the data if fresh
          if (this.wasLastFetchedFromApi()) {
            this.storeInCache(this.buildQuery(targetWithSnapshots.target),
              { time: this.toFilter, age: this.currentTime(), snapshots: targetWithSnapshots.snapshots }
            );
          }

          // do not try to retrieve data without selected metric
          if (!targetWithSnapshots.target.metric) {
            return this.$q.resolve({ data: [] });
          }

          return this.$q.all(
            _.map(targetWithSnapshots.snapshots, snapshot => {

              // ...fetch the metric data for every snapshot in the results.
              return this.fetchMetricsForSnapshot(
                snapshot.snapshotId,
                targetWithSnapshots.target.metric.key,
                this.fromFilter, this.toFilter)
                .then(response => {
                  const timeseries = response.data.values;
                  var result = {
                    'target': this.buildLabel(snapshot.response, snapshot.host, targetWithSnapshots.target),
                    'datapoints': _.map(timeseries, value => [value.value, value.timestamp])
                  };
                  return result;
                });
            })
          );
        })
      );
    }).then(results => {
      // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
      return { data: [].concat.apply([], results) };
    });
  }

  fetchTypesForTarget(target) {
    // as long no timewindow was adjusted for newly created dashboards (now-6h)
    const timeQuery = (this.fromFilter && this.toFilter) ?
      `&from=${this.fromFilter}&to=${this.toFilter}` :
      `&time=${Date.now()}`;
    const fetchSnapshotTypesUrl = `/api/snapshots/types`+
      `?q=${encodeURIComponent(target.entityQuery)}` +
      `${timeQuery}` +
      `&newApplicationModelEnabled=true`;
    return this.doRequest(fetchSnapshotTypesUrl);
  }

  fetchSnapshotsForTarget(target, from, to) {
    const query = this.buildQuery(target);

    if (this.localCacheCopyAvailable(query)) {
      this.setLastFetchedFromApi(false);
      return this.$q.resolve(this.snapshotCache[query].snapshots);
    }

    this.setLastFetchedFromApi(true);

    const fetchSnapshotContextsUrl = `/api/snapshots/context`+
      `?q=${query}` +
      `&from=${from}` +
      `&to=${to}` +
      `&size=100` +
      `&newApplicationModelEnabled=true`;

    return this.doRequest(fetchSnapshotContextsUrl).then(contextsResponse => {
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
  }

  reduceSnapshot(snapshotResponse) {
    // reduce data to used label formatting values
    snapshotResponse.data = _.pick(snapshotResponse.data, ['id', 'label', 'plugin', 'data']);
    return snapshotResponse;
  }

  localCacheCopyAvailable(query) {
    return this.snapshotCache[query] &&
           this.toFilter - this.snapshotCache[query].time < this.CACHE_MAX_AGE &&
           this.currentTime() - this.snapshotCache[query].age < this.CACHE_MAX_AGE;
  }

  buildQuery(target) {
    return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType}`);
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

  fetchMetricsForSnapshot(snapshotId, metric, from, to) {
    const rollup = this.getDefaultMetricRollupDuration(from, to).rollup;
    const url = `/api/metrics?metric=${metric}&from=${from}&to=${to}&rollup=${rollup}&snapshotId=${snapshotId}`;

    return this.doRequest(url);
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }

  metricFindQuery(query: string) {
    throw new Error('Template Variable Support not implemented yet.');
  }

  testDatasource() {
    return this.doRequest('/api/snapshots/non-existing-snapshot-id?time=0')
    .then(
      // We always expect an error response, either a 404 (Not Found) or a 401 (Unauthorized).
      result => {
        return {
          status: 'error',
          message: 'Error connecting to the Instana API.',
          title: 'Error'
        };
      },
      error => {
        if (error.status === 404) {
          return {
            status: 'success',
            message: 'Successfully connected to the Instana API.',
            title: 'Success'
          };
        } else if (error.status === 401) {
          return {
            status: 'error',
            message: 'Unauthorized. Please verify the API Token.',
            title: 'Error'
          };
        } else {
          return {
            status: 'error',
            message: 'Error connecting to the Instana API.',
            title: 'Error'
          };
        }
      });
  }

  getDefaultMetricRollupDuration(from, to, minRollup = 1000) {
    // Ignoring time differences for now since small time differences
    // can be accepted. This time is only used to calculate the rollup.
    const now = Date.now();
    const windowSize = to - from;

    let availableRollupDefinitions = this.rollupDurationThresholds.filter(
      rollupDefinition => from >= now - rollupDefinition.availableFor
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
      if (windowSize / rollup <= this.MAX_NUMBER_OF_METRICS_FOR_CHARTS) {
        return rollupDefinition;
      }
    }

    console.log('from ' + from + ' to ' + to + ' resulting in rollup ' +
      JSON.stringify(this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1]));

    return this.rollupDurationThresholds[this.rollupDurationThresholds.length - 1];
  }
}
