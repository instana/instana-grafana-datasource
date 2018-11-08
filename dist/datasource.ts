import _ from 'lodash';

export default class InstanaDatasource {
  id: number;
  name: string;
  url: string;
  apiToken: string;
  currentTime: () => number;
  snapshotCache: Object;
  catalogPromise: Object;
  fromFilter: number;
  toFilter: number;
  lastFetchedFromAPI: boolean;

  MAX_NUMBER_OF_METRICS_FOR_CHARTS = 800;
  CACHE_MAX_AGE = 60000;

  rollupDurationThresholds = [
    {
      availableFor: 1000 * 60 * 10 + 3000, // 10m + 3s (to give it some slack when deactivating live mode)
      rollup: 1000, // 1s
      label: '1s'
    },
    {
      availableFor: 1000 * 60 * 60 * 24, // 1d
      rollup: 1000 * 5, // 5s
      label: '5s'
    },
    {
      availableFor: 1000 * 60 * 60 * 24 * 31, // 1 month
      rollup: 1000 * 60, // 1m
      label: '1min'
    },
    {
      availableFor: 1000 * 60 * 60 * 24 * 31 * 3, // 3 months
      rollup: 1000 * 60 * 5, // 5m
      label: '5min'
    },
    {
      availableFor: Number.MAX_VALUE, // forever
      rollup: 1000 * 60 * 60, // 1h
      label: '1h'
    }
  ];

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.url = instanceSettings.jsonData.url;
    this.apiToken = instanceSettings.jsonData.apiToken;
    this.snapshotCache = {};

    this.currentTime = () => { return new Date().getTime(); };
  }

  storeInCache = (id, query, data) => {
    if (!this.snapshotCache) {
      this.snapshotCache = {};
    }
    if (!this.snapshotCache[id]) {
      this.snapshotCache[id] = {};
    }
    if (!this.snapshotCache[id][query]) {
      this.snapshotCache[id][query] = {};
    }

    this.snapshotCache[id][query] = data;
  }

  getSnapshotCache = () => { return this.snapshotCache; };

  wasLastFetchedFromApi = () => { return this.lastFetchedFromAPI; };

  setLastFetchedFromApi = (value) => { this.lastFetchedFromAPI = value; };

  request(method, url, requestId?) {
    return this.backendSrv.datasourceRequest({
      url: this.url + url,
      method: method,
      requestId: requestId,
      headers: {
        Authorization: 'apiToken ' + this.apiToken
      }
    });
  }

  getCatalog = () => {
    if (!this.catalogPromise) { // || this.currentTime() - catalogTime < this.CACHE_MAX_AGE * 10
      this.catalogPromise = this.$q.resolve(
        this.request('GET', "/api/metricsCatalog/custom").then(catalogResponse =>
          this.$q.all(
            _.map(catalogResponse.data, entry => ({
              'key' : entry.metricId,
              'label' : entry.description, // shorter than entry.label
              'entityType' : entry.pluginId
            }))
          )
        )
      );
    }
    return this.catalogPromise;
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
            this.storeInCache(
              targetWithSnapshots.target.refId,
              this.buildQuery(targetWithSnapshots.target),
              { time: this.toFilter, snapshots: targetWithSnapshots.snapshots });
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
                    'target': snapshot.label,
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
    const url = `/api/snapshots/types?q=${encodeURIComponent(target.entityQuery)}` +
      `&from=${this.fromFilter}` +
      `&to=${this.toFilter}` +
      `&newApplicationModelEnabled=true`;
    return this.request('GET', url);
  }

  fetchSnapshotsForTarget(target, from, to) {
    const query = this.buildQuery(target);

    if (this.localCacheCopyAvailable(target, query)) {
      this.setLastFetchedFromApi(false);
      return this.$q.resolve(this.getSnapshotCache()[target.refId][query].snapshots);
    }

    this.setLastFetchedFromApi(true);

    const fetchSnapshotContextsUrl = `/api/snapshots/context`+
      `?q=${query}` +
      `&from=${from}` +
      `&to=${to}` +
      `&size=100` +
      `&newApplicationModelEnabled=true`;

    return this.request('GET', fetchSnapshotContextsUrl).then(contextsResponse => {
      return this.$q.all(
        contextsResponse.data.map(({snapshotId, host, plugin}) => {
          const fetchSnapshotUrl = `/api/snapshots/${snapshotId}`;

          return this.request('GET', fetchSnapshotUrl).then(snapshotResponse => {
            return {
              snapshotId, host, plugin,
              'response': snapshotResponse, // TODO minimize snapshot size to label options
              'label': this.buildLabel(snapshotResponse, host, target)
            };
          });
        })
      );
    });
  }

  modifyLocalCacheCopyFor(target) {
    if (this.snapshotCache[target.refId]) {
      const query = this.buildQuery(target);
      if (_.includes(Object.keys(this.snapshotCache[target.refId]), query)) {
        _.map(this.getSnapshotCache()[target.refId][query].snapshots, snapshot => {
          snapshot.label = this.buildLabel(snapshot.response, snapshot.host, target);
        });
        return true;
      }
    }
    return false;
  }

  localCacheCopyAvailable(target, query) {
    return this.snapshotCache[target.refId] &&
           _.includes(Object.keys(this.snapshotCache[target.refId]), query) &&
           this.currentTime() - this.snapshotCache[target.refId][query].time < this.CACHE_MAX_AGE;
  }

  buildQuery(target) {
    return encodeURIComponent(`${target.entityQuery} AND entity.pluginId:${target.entityType}`);
  }

  buildLabel(snapshotResponse, host, target) {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, "$label", snapshotResponse.data.label);
      label = _.replace(label, "$plugin", snapshotResponse.data.plugin);
      label = _.replace(label, "$host", host ? host : "unknown");
      label = _.replace(label, "$pid", _.get(snapshotResponse.data, ["data", "pid"], ""));
      label = _.replace(label, "$type", _.get(snapshotResponse.data, ["data", "type"], ""));
      label = _.replace(label, "$name", _.get(snapshotResponse.data, ["data", "name"], ""));
      label = _.replace(label, "$service", _.get(snapshotResponse.data, ["data", "service_name"], ""));
      label = _.replace(label, "$metric", _.get(target, ["metric", "key"], "n/a"));
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

    return this.request('GET', url);
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }

  metricFindQuery(query: string) {
    throw new Error('Template Variable Support not implemented yet.');
  }

  testDatasource() {
    return this.request('GET', '/api/snapshots/non-existing-snapshot-id')
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
