import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import migrate from './migration';

import _ from 'lodash';
import {getPossibleGranularities, readItemMetrics} from "./util/analyze_util";


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
      return this.$q.resolve({data: []});
    }

    const timeFilters = {};
    const timeShifts = {};
    const applyGraphAggregation = [];
    const targetAggregationFunction = [];

    return this.$q.all(
      _.map(options.targets, target => {
        timeFilters[target.refId] = this.readTime(options);
        timeShifts[target.refId] = this.convertTimeShiftToMillis(target.timeShift);
        applyGraphAggregation[target.refId] = target.aggregateGraphs;
        targetAggregationFunction[target.refId] = target.aggregationFunction;

        // grafana setting to disable query execution
        if (target.hide) {
          return {data: []};
        }

        // target migration for downwards compatibility
        migrate(target);

        if (timeShifts[target.refId]) {
          timeFilters[target.refId] = this.applyTimeShiftOnTimeFilter(timeFilters[target.refId], timeShifts[target.refId]);
          target.timeShiftIsValid = true;
        } else {
          target.timeShiftIsValid = false;
        }

        if (target.metricCategory === this.WEBSITE_METRICS) {
          target.availableTimeIntervals = getPossibleGranularities(timeFilters[target.refId].windowSize);
          return this.getWebsiteMetrics(target, timeFilters[target.refId]);
        } else if (target.metricCategory === this.APPLICATION_METRICS) {
          target.availableTimeIntervals = getPossibleGranularities(timeFilters[target.refId].windowSize);
          return this.getApplicationMetrics(target, timeFilters[target.refId]);
        } else {
          target.availableTimeIntervals = this.infrastructure.getPossibleRollups(timeFilters[target.refId]);
          if (!target.timeInterval) {
            target.timeInterval = this.infrastructure.getDefaultMetricRollupDuration(timeFilters[target.refId]);
          }
          return this.getInfrastructureMetrics(target, target.timeInterval, timeFilters[target.refId]);
        }
      })
    ).then(results => {
      // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
      let flatData = {data: _.flatten(results)};

      flatData.data.forEach(data => {
        if (timeShifts[data.refId]) {
          data.datapoints.forEach(datapoint => {
            datapoint[1] = datapoint[1] + timeShifts[data.refId];
          });
        }
      });

      return flatData;
    }).then(flatData => {
      var targetsGroupedByRefId = _.groupBy(flatData.data, function (data) {
        return data.refId;
      });

      var newData = [];

      _.each(targetsGroupedByRefId, (target, index) => {
        var refId = target[0].refId;
        if (applyGraphAggregation[refId]) {
          var concatedTargetData = [];
          _.each(target, (data, index) => {
            concatedTargetData = _.concat(concatedTargetData, data.datapoints);
          });

          var dataGroupedByTimestamp = _.groupBy(concatedTargetData, function (data) {
            return data[1];
          });

          var aggregatedData = [];
          _.each(dataGroupedByTimestamp, (timestampData, timestamp) => {
            var valuesOfTimestamp = _.map(timestampData, (datapoint, index) => {
              return datapoint[0];
            });
            var aggregatedValue = targetAggregationFunction[refId].calculate(valuesOfTimestamp);
            aggregatedData.push([aggregatedValue, timestamp]);
          });

          newData.push(this.buildResult(aggregatedData, refId, refId));
        } else {
          newData.push(target);
        }
      });

      return {data: _.flatten(newData)};
    });
  }

  buildResult(aggregatedData, refId, target) {
    return {
      datapoints: aggregatedData,
      refId: refId,
      target: target
    };
  }

  getAllDatapointsOfTimestamp(data, index) {
    var valuesForSameTimestamp = [];
    _.each(data, (graph, i) => {
      var datapointValue = graph.datapoints[index];
      if (datapointValue && datapointValue[0] > 0) {
        valuesForSameTimestamp.push(datapointValue);
      }
    });

    return valuesForSameTimestamp;
  }

  convertTimeShiftToMillis(timeShift: string): number {
    if (!timeShift) {
      return null;
    }

    try {
      return this.parseTimeShift(timeShift);
    } catch (e) {
      return null;
    }
  }

  parseTimeShift(timeShift: string): number {
    let milliSeconds = 1000;

    if (timeShift.endsWith('s')) {
      return parseInt(timeShift.split('s')[0]) * milliSeconds;
    } else if (timeShift.endsWith('m')) {
      return parseInt(timeShift.split('m')[0]) * 60 * milliSeconds;
    } else if (timeShift.endsWith('h')) {
      return parseInt(timeShift.split('h')[0]) * 60 * 60 * milliSeconds;
    } else if (timeShift.endsWith('d')) {
      return parseInt(timeShift.split('d')[0]) * 60 * 60 * 24 * milliSeconds;
    } else if (timeShift.endsWith('w')) {
      return parseInt(timeShift.split('w')[0]) * 60 * 60 * 24 * 7 * milliSeconds;
    }

    return null;
  }

  applyTimeShiftOnTimeFilter(timeFilter: TimeFilter, timeShift: number): TimeFilter {
    return {
      from: timeFilter.from - timeShift,
      to: timeFilter.to - timeShift,
      windowSize: timeFilter.windowSize
    };
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

  getInfrastructureMetrics(target, rollUp, timeFilter: TimeFilter) {
    // do not try to retrieve data without selected metric
    if (!target.metric && !target.showAllMetrics) {
      return this.$q.resolve({data: []});
    }

    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(snapshots => {
      if (target.showAllMetrics) {
        const resultPromises = [];
        _.forEach(target.allMetrics, metric => {
          resultPromises.push(this.infrastructure.fetchMetricsForSnapshots(target, snapshots, rollUp, timeFilter, metric));
        });

        return Promise.all(resultPromises).then(allResults => {
          const allMetrics = [];
          allResults.forEach(result => result.forEach(s => allMetrics.push(s)));
          return allMetrics;
        });
      } else {
        return this.infrastructure.fetchMetricsForSnapshots(target, snapshots, rollUp, timeFilter, target.metric);
      }
    });
  }

  getWebsiteMetrics(target, timeFilter: TimeFilter) {
    return this.website.fetchMetricsForWebsite(target, timeFilter).then(response => {
      return readItemMetrics(target, response, this.website.buildWebsiteLabel);
    });
  }

  getApplicationMetrics(target, timeFilter) {
    return this.application.fetchMetricsForApplication(target, timeFilter).then(response => {
      target.showWarningCantShowAllResults = response.data.canLoadMore;
      return readItemMetrics(target, response, this.application.buildApplicationLabel);
    });
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }

  metricFindQuery(query: string) {
    throw new Error('Template Variable Support not implemented yet.');
  }

  getVersion(): number {
    return this.doRequest('/api/instana/version').then(
      result => {
        if (result.data) {
          return parseFloat(result.data.imageTag) || null;
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
