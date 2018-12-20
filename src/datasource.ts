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
    this.timeFilter.windowSize = this.timeFilter.to - this.timeFilter.from;

    if (Object.keys(options.targets[0]).length === 0) {
      return this.$q.resolve({ data: [] });
    }

    return this.$q.all(
      _.map(options.targets, target => {
        if (target.metricCategory === this.WEBSITE_METRICS) {
          return this.getWebsiteMetrics(target);
        } else {
          return this.getInfrastructureMetrics(target);
        }
      })
    ).then(results => {
      // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
      return { data: [].concat.apply([], results) };
    });
  }

  getInfrastructureMetrics(target) {
    // do not try to retrieve data without selected metric
    if (!target.metric) {
      return this.$q.resolve({ data: [] });
    }

    // For every target, fetch snapshots that in the selected timeframe that satisfy the lucene query.
    return this.infrastructure.fetchSnapshotsForTarget(target, this.timeFilter)
      .then(snapshots => {
        return this.infrastructure.getMetricsForTarget(target, snapshots, this.timeFilter);
      });
  }

  getWebsiteMetrics(target) {
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
