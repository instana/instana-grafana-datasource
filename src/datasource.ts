import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import rollupDurationThresholds from './lists/rollups';
import TimeFilter from './types/time_filter';
import migrate from './migration';

import _ from 'lodash';

export default class InstanaDatasource extends AbstractDatasource {
  infrastructure: InstanaInfrastructureDataSource;
  application: InstanaApplicationDataSource;
  website: InstanaWebsiteDataSource;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.infrastructure = new InstanaInfrastructureDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.application = new InstanaApplicationDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.website = new InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q);
  }

  query(options) {
    if (Object.keys(options.targets[0]).length === 0) {
      return this.$q.resolve({ data: [] });
    }

    const timeFilter: TimeFilter = this.readTime(options);

    return this.$q.all(
      _.map(options.targets, target => {

        // grafana setting to disable query execution
        if (target.hide) {
          return { data: [] };
        }

        // target migration for downwards compability
        migrate(target);

        if (target.metricCategory === this.WEBSITE_METRICS) {
          return this.getWebsiteMetrics(target, timeFilter);
        } else if (target.metricCategory === this.APPLICATION_METRICS) {
          return this.getApplicationMetrics(target, timeFilter);
        } else {
          return this.getInfrastructureMetrics(target, timeFilter);
        }
      })
    ).then(results => {
      // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
      return { data: [].concat.apply([], results) };
    });
  }

  readTime(options): TimeFilter {
    const from = new Date(options.range.from).getTime();
    const to = new Date(options.range.to).getTime();
    return {
      from: from,
      to: to,
      windowSize: to - from
    };
  }

  getInfrastructureMetrics(target, timeFilter: TimeFilter) {
    // do not try to retrieve data without selected metric
    if (!target.metric) {
      return this.$q.resolve({ data: [] });
    }

    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(snapshots => {
      return this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter);
    });
  }

  getWebsiteMetrics(target, timeFilter: TimeFilter) {
    return this.website.fetchMetricsForWebsite(target, timeFilter).then(response => {
      return this.website.readItemMetrics(target, response);
    });
  }

  getApplicationMetrics(target, timeFilter) {
    return this.application.fetchMetricsForApplication(target, timeFilter).then(response => {
      target.showWarningCantShowAllResults = response.data.canLoadMore;
      return this.application.readItemMetrics(target, response);
    });
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }

  metricFindQuery(query: string) {
    throw new Error('Template Variable Support not implemented yet.');
  }

  getVersion(): number {
    return this.doRequest('/build.json').then(
      result => {
        if (result.data) {
          return parseFloat(result.data.tag) || null;
        }
        return null;
      }, error => {
        return null;
      });
  }

  testDatasource() {
    return this.doRequest('/api/monitoringState').then(
      result => {
        return {
          status: 'success',
          message: 'Successfully connected to the Instana API.',
          title: 'Success'
        };
      },
      error => {
        if (error.status === 401) {
          return {
            status: 'error',
            message: 'Unauthorized. Please verify the API Token.',
            title: 'Error'
          };
        } else {
          console.log(error);
          return {
            status: 'error',
            message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
            title: 'Error'
          };
        }
      }
    );
  }
}
