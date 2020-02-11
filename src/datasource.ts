import {
  getDefaultChartGranularity,
  getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups
} from "./util/rollup_granularity_util";
import { generateStableHash, hasIntersection, appendData} from './util/delta_util';
import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaEndpointDataSource from "./datasource_endpoint";
import InstanaServiceDataSource from "./datasource_service";
import InstanaWebsiteDataSource from './datasource_website';
import { aggregateTarget } from "./util/aggregation_util";
import AbstractDatasource from './datasource_abstract';
import { readItemMetrics } from './util/analyze_util';
import TimeFilter from './types/time_filter';
import migrate from './migration';
import Cache from './cache';

import _ from 'lodash';
import Selectable from "./types/selectable";

export default class InstanaDatasource extends AbstractDatasource {
  infrastructure: InstanaInfrastructureDataSource;
  application: InstanaApplicationDataSource;
  website: InstanaWebsiteDataSource;
  service: InstanaServiceDataSource;
  endpoint: InstanaEndpointDataSource;
  availableGranularities: Array<Selectable>;
  availableRollups: Array<Selectable>;
  maxWindowSizeInfrastructure: number;
  maxWindowSizeAnalyzeWebsites: number;
  maxWindowSizeAnalyzeApplications: number;
  maxWindowSizeAnalyzeMetrics: number;
  resultCache: Cache<any>;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.infrastructure = new InstanaInfrastructureDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.application = new InstanaApplicationDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.website = new InstanaWebsiteDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.service = new InstanaServiceDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.endpoint = new InstanaEndpointDataSource(instanceSettings, backendSrv, templateSrv, $q);
    this.availableGranularities = [];
    this.availableRollups = [];
    this.maxWindowSizeInfrastructure = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_infra);
    this.maxWindowSizeAnalyzeWebsites = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_website_metrics);
    this.maxWindowSizeAnalyzeApplications = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_app_calls);
    this.maxWindowSizeAnalyzeMetrics = this.hoursToMs(instanceSettings.jsonData.queryinterval_limit_app_metrics);
    this.resultCache = new Cache<any>();
  }

  query(options) {
    if (Object.keys(options.targets[0]).length === 0) {
      return this.$q.resolve({ data: [] });
    }

    const panelTimeFilter: TimeFilter = this.readTime(options);

    this.availableRollups = getPossibleRollups(panelTimeFilter);
    this.availableGranularities = getPossibleGranularities(panelTimeFilter.windowSize);

    const targets = [];

    return this.$q.all(
      _.map(options.targets, target => {
        let timeFilter: TimeFilter = this.readTime(options);
        targets[target.refId] = target;

        // grafana setting to disable query execution
        if (target.hide) {
          return { data: [] };
        }

        // target migration for downwards compatibility
        migrate(target);

        if (target.timeShift) {
          timeFilter = this.applyTimeShiftOnTimeFilter(timeFilter, this.convertTimeShiftToMillis(target.timeShift));
        }

        target['timeFilter'] = timeFilter;
        target['stableHash'] = generateStableHash(target);
        timeFilter = this.adjustTimeFilterIfCached(timeFilter, target);

        if (target.metricCategory === this.BUILT_IN_METRICS || target.metricCategory === this.CUSTOM_METRICS) {
          this.setRollupTimeInterval(target, timeFilter);
          return this.getInfrastructureMetrics(target, timeFilter).then(data => {
            return this.buildTargetWithAppendedDataResult(target, timeFilter, data);
          });
        } else if (target.metricCategory) {
          this.setGranularityTimeInterval(target, timeFilter);
          if (target.metricCategory === this.ANALYZE_WEBSITE_METRICS) {
            return this.getAnalyzeWebsiteMetrics(target, timeFilter).then(data => {
              return this.buildTargetWithAppendedDataResult(target, timeFilter, data);
            });
          } else if (target.metricCategory === this.ANALYZE_APPLICATION_METRICS) {
            return this.getAnalyzeApplicationMetrics(target, timeFilter).then(data => {
              return this.buildTargetWithAppendedDataResult(target, timeFilter, data);
            });
          } else if (target.metricCategory === this.APPLICATION_SERVICE_ENDPOINT_METRICS) {
            return this.getApplicationServiceEndpointMetrics(target, timeFilter).then(data => {
              return this.buildTargetWithAppendedDataResult(target, timeFilter, data);
            });
          }
        }
      })
    ).then(targetData => {
      var result = [];
      _.each(targetData, (targetAndData, index) => {
        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
        var resultData = _.compact(_.flatten(targetAndData.data)); // Also remove empty data items
        this.applyTimeShiftIfNecessary(resultData, targetAndData.target);
        resultData = this.aggregateDataIfNecessary(resultData, targetAndData.target);
        this.cacheResult(resultData, targetAndData.target);
        result.push(resultData);
      });

      return { data: _.flatten(result) };
    });
  }

  appendResult(data, target) {
    var cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && cachedResult.results) {
      data = appendData(data, cachedResult.results);
    }
    return data;
  }

  adjustTimeFilterIfCached(timeFilter: TimeFilter, target): TimeFilter {
    var cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && hasIntersection(timeFilter, cachedResult.timeFilter)) {
      var newFrom = this.getDeltaRequestTimestamp(cachedResult.results, cachedResult.timeFilter.from);
      var newTo = Math.round(timeFilter.to / 10000) * 10000;
      return {
        from: newFrom,
        to: newTo,
        windowSize: newTo - newFrom
      };
    }
    return timeFilter;
  }

  getDeltaRequestTimestamp(series, fromDefault: number): number {
    const length = series[0].datapoints.length;
    if (length === 0) {
      return fromDefault;
    }
    const penultimate = length > 1 ? length - 2 : 1;
    return series[0].datapoints[penultimate][1];
  }

  buildTargetWithAppendedDataResult(target, timeFilter: TimeFilter, data) {
    if (timeFilter.from !== target.timeFilter.from) {
      data = this.appendResult(data, target);
    }
    return {
      target: target,
      data: data
    };
  }

  cacheResult(result, target) {
    if (!this.isEmptyResult(result)) {
      var cachedObj = {
        timeFilter: target.timeFilter,
        results: result
      };
      this.resultCache.put(target.stableHash, cachedObj, 400000); // to cover up to 5 min refreshs
    }
  }

  isEmptyResult(result) {
    if (result) {
      if (result.length > 0) {
        return false;
      }
    }
    return true;
  }

  removeEmptyTargetsFromResultData(data) {
    return _.filter(data.data, d => d && d.refId);
  }

  applyTimeShiftIfNecessary(data, target) {
    data.forEach(data => {
      if (target.timeShift) {
        this.applyTimeShiftOnData(data, this.convertTimeShiftToMillis(target.timeShift));
      }
    });
  }

  aggregateDataIfNecessary(data, target) {
    var newData = [];

    if (target.aggregateGraphs) {
      newData.push(aggregateTarget(data, target));
      if (!target.hideOriginalGraphs) {
        _.each(data, (dt, index) => newData.push(dt));
      }
      return newData;
    }

    return data;
  }

  groupTargetsByRefId(data) {
    return _.groupBy(data.data, function(target) {
      return target.refId;
    });
  }

  setRollupTimeInterval(target, timeFilter: TimeFilter) {
    if (!target.timeInterval || !_.find(this.availableRollups, ['key', target.timeInterval.key])) {
      target.timeInterval = getDefaultMetricRollupDuration(timeFilter);
    }
  }

  setGranularityTimeInterval(target, timeFilter: TimeFilter) {
    if (!target.timeInterval || !_.find(this.availableGranularities, ['key', target.timeInterval.key])) {
      target.timeInterval = getDefaultChartGranularity(timeFilter.windowSize);
    }
  }

  applyTimeShiftOnData(data, timeshift) {
    data.datapoints.forEach(datapoint => {
      datapoint[1] = datapoint[1] + timeshift;
    });
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
      from: Math.round(from / 1000) * 1000,
      to: Math.round(to / 1000) * 1000,
      windowSize: to - from
    };
  }

  getInfrastructureMetrics(target, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeInfrastructure)) {
      return this.rejectLargeTimeWindow(this.maxWindowSizeInfrastructure);
    }

    // do not try to retrieve data without selected metric
    if (!target.metric && !target.showAllMetrics && !target.freeTextMetrics) {
      return this.$q.resolve({ data: [] });
    }

    // for every target, fetch snapshots in the selected timeframe that satisfy the lucene query.
    return this.infrastructure.fetchSnapshotsForTarget(target, timeFilter).then(snapshots => {
      if (target.showAllMetrics) {
        return this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, target.allMetrics);
      } else if (target.freeTextMetrics) {
        const metrics = this.extractMetricsFromText(target.freeTextMetrics);
        return this.fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, metrics);
      } else {
        return this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter, target.metric);
      }
    });
  }

  extractMetricsFromText(freeText: string) {
    const metricsString = freeText.replace(/\s/g, '').split(',');
    let metrics = [];
    _.each(metricsString, (metricString) => metrics.push(JSON.parse('{ "key": "' + metricString + '"}')));

    if (metrics.length > 4) {
      metrics.slice(0, 3); // API supports up to 4 metrics at once
    }

    return metrics;
  }

  fetchMultipleMetricsForSnapshots(target, snapshots, timeFilter, metrics) {
    const resultPromises = [];
    _.forEach(metrics, metric => {
      resultPromises.push(this.infrastructure.fetchMetricsForSnapshots(target, snapshots, timeFilter, metric));
    });

    return Promise.all(resultPromises).then(allResults => {
      const allMetrics = [];
      allResults.forEach(result => result.forEach(s => allMetrics.push(s)));
      return allMetrics;
    });
  }

  getAnalyzeWebsiteMetrics(target, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeWebsites)) {
      return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeWebsites);
    }

    return this.website.fetchAnalyzeMetricsForWebsite(target, timeFilter).then(response => {
      return readItemMetrics(target, response, this.website.buildAnalyzeWebsiteLabel);
    });
  }

  getAnalyzeApplicationMetrics(target, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeApplications)) {
      return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeApplications);
    }

    return this.application.fetchAnalyzeMetricsForApplication(target, timeFilter).then(response => {
      target.showWarningCantShowAllResults = response.data.canLoadMore;
      return readItemMetrics(target, response, this.application.buildAnalyzeApplicationLabel);
    });
  }

  getApplicationServiceEndpointMetrics(target, timeFilter: TimeFilter) {
    // do not try to execute to big queries
    if (this.isInvalidQueryInterval(timeFilter.windowSize, this.maxWindowSizeAnalyzeMetrics)) {
      return this.rejectLargeTimeWindow(this.maxWindowSizeAnalyzeMetrics);
    }

    if (this.isEndpointSet(target.endpoint)) {
      return this.endpoint.fetchEndpointMetrics(target, timeFilter).then(response => {
        return readItemMetrics(target, response, this.endpoint.buildEndpointMetricLabel);
      });
    } else if (this.isServiceSet(target.service)) {
      return this.service.fetchServiceMetrics(target, timeFilter).then(response => {
        return readItemMetrics(target, response, this.service.buildServiceMetricLabel);
      });
    } else if (this.isApplicationSet(target.entity)) {
      return this.application.fetchApplicationMetrics(target, timeFilter).then(response => {
        target.showWarningCantShowAllResults = response.data.canLoadMore;
        return readItemMetrics(target, response, this.application.buildApplicationMetricLabel);
      });
    }
  }

  isInvalidQueryInterval(windowSize: number, queryIntervalLimit: number): boolean {
    if (queryIntervalLimit > 0) {
      return Math.round(windowSize / 1000) * 1000 > queryIntervalLimit;
    }
    return false;
  }

  rejectLargeTimeWindow(maxWindowSize: number) {
    return this.$q.reject("Limit for maximum selectable windowsize exceeded, " +
      "max is: " + (maxWindowSize / 60 / 60 / 1000) + " hours");
  }

  isApplicationSet(application) {
    return application && application.key;
  }

  isServiceSet(service) {
    return service && service.key;
  }

  isEndpointSet(endpoint) {
    return endpoint && endpoint.key;
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
