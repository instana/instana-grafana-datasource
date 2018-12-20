import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import rollupDurationThresholds from './rollups';
import _ from 'lodash';

export interface TimeFilter {
  to: number;
  from?: number;
  windowSize?: number;
}

export default class InstanaDatasource extends AbstractDatasource {
  infrastructure: InstanaInfrastructureDataSource;
  website: InstanaWebsiteDataSource;
  timeFilter: TimeFilter;

  CUSTOM_METRICS = '1';
  WEBSITE_METRICS = '3';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.infrastructure = new InstanaInfrastructureDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.website = new InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.timeFilter = {
      to: this.currentTime(),
      windowSize: 3600
    };
  }

  query(options) {
    this.timeFilter.from = options.range.from.valueOf();
    this.timeFilter.to = options.range.to.valueOf();

    if (Object.keys(options.targets[0]).length === 0) {
      return this.$q.resolve({ data: [] });
    }

    return this.$q.all(
      _.map(options.targets, target => {

        if (target.metricCategory === this.WEBSITE_METRICS) {
          return this.website.fetchMetricsForEntity(target, this.timeFilter).then(response => {
            // as we map two times we need to flatten the result
            return _.flatten(response.data.items.map(item => {
              return _.map(item.metrics, function(value, key) {
                return {
                  'target': item.name.replace(/"/g, '') + ' (' + target.entity.key + ') - ' + key, // TODO remove in API
                  'datapoints': _.map(value, metric => [metric[1], metric[0]])
                };
              });
            }));
          });
        } else {
          // TODO here infrastructure
        }
      })
    ).then(results => {
      // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
      return { data: [].concat.apply([], results) };
    });

    return this.$q.all(
      _.map(options.targets, target => {
        // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
        return this.infrastructure.fetchSnapshotsForTarget(target, this.timeFilter)
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
          if (this.infrastructure.wasLastFetchedFromApi()) {
            this.infrastructure.storeInCache(this.infrastructure.buildQuery(targetWithSnapshots.target),
              { time: this.timeFilter.to, age: this.currentTime(), snapshots: targetWithSnapshots.snapshots }
            );
          }

          // do not try to retrieve data without selected metric
          if (!targetWithSnapshots.target.metric) {
            return this.$q.resolve({ data: [] });
          }

          return this.$q.all(
            _.map(targetWithSnapshots.snapshots, snapshot => {

              // ...fetch the metric data for every snapshot in the results.
              return this.infrastructure.fetchMetricsForSnapshot(
                snapshot.snapshotId,
                targetWithSnapshots.target.metric.key,
                this.timeFilter)
                .then(response => {
                  const timeseries = response.data.values;
                  var result = {
                    'target': this.infrastructure.buildLabel(snapshot.response, snapshot.host, targetWithSnapshots.target),
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
}
