import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  SelectableValue,
} from '@grafana/data';

import { InstanaQuery } from '../types/instana_query';
import { InstanaOptions } from '../types/instana_options';
import { getRequest } from '../util/request_handler';
import { DataSourceSlo } from './DataSource_Slo';
import MetricCategories from '../lists/metric_categories';
import TimeFilter from '../types/time_filter';
import { hoursToMs, readTime } from '../util/time_util';
import Cache from '../cache';
import { emptyResultData } from '../util/target_util';
import _ from 'lodash';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import {
  getDefaultChartGranularity,
  getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups,
} from '../util/rollup_granularity_util';
import { appendData, generateStableHash, hasIntersection } from '../util/delta_util';
import {
  ANALYZE_APPLICATION_METRICS,
  ANALYZE_WEBSITE_METRICS,
  APPLICATION_SERVICE_ENDPOINT_METRICS,
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  SLO_INFORMATION,
} from '../GlobalVariables';
import getVersion from '../util/instana_version';
import { aggregateTarget } from '../util/aggregation_util';
import { DataSourceWebsite } from './DataSource_Website';
import { DataSourceApplication } from './DataSource_Application';
import { DataSourceService } from './DataSource_Service';
import { DataSourceEndpoint } from './DataSource_Endpoint';
import { isInvalidQueryInterval } from '../util/queryInterval_check';
import { readItemMetrics } from '../util/analyze_util';
import migrate from '../migration';

export class DataSource extends DataSourceApi<InstanaQuery, InstanaOptions> {
  options: InstanaOptions;
  dataSourceInfrastructure: DataSourceInfrastructure;
  dataSourceWebsite: DataSourceWebsite;
  dataSourceApplication: DataSourceApplication;
  dataSourceService: DataSourceService;
  dataSourceEndpoint: DataSourceEndpoint;
  dataSourceSlo: DataSourceSlo;
  timeFilter!: TimeFilter;
  availableGranularities: SelectableValue[];
  availableRollups: SelectableValue[];
  availableTimeIntervals: SelectableValue[];
  resultCache: Cache<any>;

  constructor(instanceSettings: DataSourceInstanceSettings<InstanaOptions>) {
    super(instanceSettings);
    this.options = instanceSettings.jsonData;
    this.availableGranularities = [];
    this.availableRollups = [];
    this.availableTimeIntervals = [];
    this.dataSourceSlo = new DataSourceSlo(instanceSettings.jsonData);
    this.dataSourceInfrastructure = new DataSourceInfrastructure(instanceSettings.jsonData);
    this.dataSourceWebsite = new DataSourceWebsite(instanceSettings.jsonData);
    this.dataSourceApplication = new DataSourceApplication(instanceSettings.jsonData);
    this.dataSourceService = new DataSourceService(instanceSettings.jsonData);
    this.dataSourceEndpoint = new DataSourceEndpoint(instanceSettings.jsonData);
    this.resultCache = new Cache<any>();
  }

  async query(options: DataQueryRequest<InstanaQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    this.timeFilter = readTime(range!);
    this.availableRollups = getPossibleRollups(this.timeFilter);
    this.availableGranularities = getPossibleGranularities(this.timeFilter.windowSize);

    return Promise.all(
      options.targets.map((target) => {
        let targetTimeFilter = readTime(range!);

        // grafana setting to disable query execution
        if (target.hide) {
          return { data: [], target: target };
        }

        migrate(target);

        if (!target.metricCategory) {
          target.metricCategory = MetricCategories[0];
        }

        this.setPossibleTimeIntervals(target);

        // target migration for downwards compatibility
        migrate(target);

        if (target.timeShift) {
          let millis = this.convertTimeShiftToMillis(target.timeShift);
          if (millis) {
            targetTimeFilter = this.applyTimeShiftOnTimeFilter(targetTimeFilter, millis);
          }
        }

        target.timeFilter = targetTimeFilter;
        target.stableHash = generateStableHash(target);
        targetTimeFilter = this.adjustTimeFilterIfCached(targetTimeFilter, target);

        if (target.metricCategory.key === SLO_INFORMATION) {
          return this.dataSourceSlo.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (target.metricCategory.key === BUILT_IN_METRICS || target.metricCategory.key === CUSTOM_METRICS) {
          return this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (target.metricCategory.key === ANALYZE_WEBSITE_METRICS) {
          return this.dataSourceWebsite.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (target.metricCategory.key === ANALYZE_APPLICATION_METRICS) {
          return this.dataSourceApplication.runQuery(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        } else if (target.metricCategory.key === APPLICATION_SERVICE_ENDPOINT_METRICS) {
          return this.getApplicationServiceEndpointMetrics(target, targetTimeFilter).then((data: any) => {
            return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
          });
        }

        return Promise.resolve(emptyResultData(target.refId));
      })
    ).then((targetData) => {
      let result: any = [];
      _.each(targetData, (targetAndData) => {
        // Flatten the list as Grafana expects a list of targets with corresponding datapoints.
        let resultData = _.compact(_.flatten(targetAndData.data)); // Also remove empty data items
        this.applyTimeShiftIfNecessary(resultData, targetAndData.target);
        resultData = this.aggregateDataIfNecessary(resultData, targetAndData.target);
        this.cacheResultIfNecessary(resultData, targetAndData.target);
        result.push(resultData);
      });

      return { data: _.flatten(result) };
    });
  }

  getApplicationServiceEndpointMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // do not try to execute too big queries
    if (isInvalidQueryInterval(timeFilter.windowSize, hoursToMs(this.options.queryinterval_limit_app_metrics))) {
      throw new Error(
        'Limit for maximum selectable windowsize exceeded, max is: ' +
          this.options.queryinterval_limit_app_metrics +
          ' hours'
      );
    }

    if (target.endpoint && target.endpoint.key) {
      return this.dataSourceEndpoint.fetchEndpointMetrics(target, timeFilter).then((response: any) => {
        return readItemMetrics(target, response, this.dataSourceEndpoint.buildEndpointMetricLabel);
      });
    } else if (target.service && target.service.key) {
      return this.dataSourceService.fetchServiceMetrics(target, timeFilter).then((response: any) => {
        return readItemMetrics(target, response, this.dataSourceService.buildServiceMetricLabel);
      });
    } else if (target.entity && target.entity.key) {
      return this.dataSourceApplication.fetchApplicationMetrics(target, timeFilter).then((response: any) => {
        if (response.data) {
          target.showWarningCantShowAllResults = response.data.canLoadMore;
        }
        return readItemMetrics(target, response, this.dataSourceApplication.buildApplicationMetricLabel);
      });
    }

    return Promise.resolve({ data: { items: [] } });
  }

  applyTimeShiftIfNecessary(data: any, target: InstanaQuery) {
    data.forEach((data: any) => {
      if (target.timeShift) {
        this.applyTimeShiftOnData(data, this.convertTimeShiftToMillis(target.timeShift));
      }
    });
  }

  cacheResultIfNecessary(result: any, target: InstanaQuery) {
    if (this.supportsDeltaRequests(target) && this.hasResult(result)) {
      let cachedObj = {
        timeFilter: target.timeFilter,
        results: result,
      };
      this.resultCache.put(target.stableHash, cachedObj, 400000); // to cover at least 5 min refreshs
    }
  }

  supportsDeltaRequests(target: InstanaQuery): boolean {
    if (target.metricCategory && target.metricCategory.key === SLO_INFORMATION) {
      return false;
    }

    let version = this.resultCache.get('version');
    if (!version) {
      return getVersion(this.options).then((version: any) => {
        this.resultCache.put('version', version, 3600000); // one hour
        return version >= 171;
      });
    }

    return version >= 171;
  }

  hasResult(result: any) {
    return result && result.length > 0;
  }

  applyTimeShiftOnData(data: any, timeshift: any) {
    data.datapoints.forEach((datapoint: any) => {
      datapoint[1] = datapoint[1] + timeshift;
    });
  }

  aggregateDataIfNecessary(data: any, target: InstanaQuery) {
    let newData = [];

    if (target.aggregateGraphs) {
      const aggregatedData = aggregateTarget(data, target);
      newData.push(aggregatedData);
      if (!target.hideOriginalGraphs) {
        _.each(data, (dt) => {
          if (dt.target !== aggregatedData.target) {
            newData.push(dt);
          }
        });
      }
      return newData;
    }

    return data;
  }

  buildTargetWithAppendedDataResult(target: InstanaQuery, timeFilter: TimeFilter, data: any) {
    if (timeFilter.from !== target.timeFilter.from && data) {
      data = this.appendResult(data, target);
    }

    return {
      target: target,
      data: data,
    };
  }

  appendResult(data: any, target: InstanaQuery) {
    let cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && cachedResult.results) {
      data = appendData(data, cachedResult.results);
    }
    return data;
  }

  adjustTimeFilterIfCached(timeFilter: TimeFilter, target: InstanaQuery): TimeFilter {
    let cachedResult = this.resultCache.get(target.stableHash);
    if (cachedResult && hasIntersection(timeFilter, cachedResult.timeFilter)) {
      let newFrom = this.getDeltaRequestTimestamp(cachedResult.results, cachedResult.timeFilter.from);
      let newTo = Math.floor(timeFilter.to / 10000) * 10000;
      return {
        from: newFrom,
        to: newTo,
        windowSize: newTo - newFrom,
      };
    }
    return timeFilter;
  }

  getDeltaRequestTimestamp(series: any, fromDefault: number): number {
    const length = series[0].datapoints.length;
    if (length === 0) {
      return fromDefault;
    }
    const penultimate = length > 1 ? length - 2 : 1;
    return series[0].datapoints[penultimate][1];
  }

  getSloReports(): Promise<SelectableValue[]> {
    return this.dataSourceSlo.getConfiguredSLIs();
  }

  getEntityTypes(): Promise<SelectableValue[]> {
    return this.dataSourceInfrastructure.getEntityTypes();
  }

  fetchApplications() {
    return this.dataSourceApplication.getApplications(this.getTimeFilter());
  }

  fetchServices(target: InstanaQuery) {
    return this.dataSourceService.getServicesOfApplication(target, this.getTimeFilter());
  }

  fetchEndpoints(target: InstanaQuery) {
    return this.dataSourceEndpoint.getEndpointsOfService(target, this.getTimeFilter());
  }

  fetchTypesForTarget(query: InstanaQuery) {
    return this.dataSourceInfrastructure.fetchTypesForTarget(query, this.getTimeFilter());
  }

  fetchWebsites(): Promise<SelectableValue[]> {
    return this.dataSourceWebsite.getWebsites(this.getTimeFilter());
  }

  getDefaultTimeInterval(query: InstanaQuery) {
    if (query.metricCategory.key === BUILT_IN_METRICS || query.metricCategory.key === CUSTOM_METRICS) {
      return getDefaultMetricRollupDuration(this.getTimeFilter());
    } else {
      return getDefaultChartGranularity(this.getTimeFilter().windowSize);
    }
  }

  convertTimeShiftToMillis(timeShift: string) {
    if (!timeShift) {
      return null;
    }

    try {
      return this.parseTimeShift(timeShift);
    } catch (e) {
      return null;
    }
  }

  parseTimeShift(timeShift: string) {
    let milliSeconds = 1000;

    if (timeShift.endsWith('s')) {
      return parseInt(timeShift.split('s')[0], 10) * milliSeconds;
    } else if (timeShift.endsWith('m')) {
      return parseInt(timeShift.split('m')[0], 10) * 60 * milliSeconds;
    } else if (timeShift.endsWith('h')) {
      return parseInt(timeShift.split('h')[0], 10) * 60 * 60 * milliSeconds;
    } else if (timeShift.endsWith('d')) {
      return parseInt(timeShift.split('d')[0], 10) * 60 * 60 * 24 * milliSeconds;
    } else if (timeShift.endsWith('w')) {
      return parseInt(timeShift.split('w')[0], 10) * 60 * 60 * 24 * 7 * milliSeconds;
    }

    return null;
  }

  applyTimeShiftOnTimeFilter(timeFilter: TimeFilter, timeShift: number): TimeFilter {
    if (timeShift) {
      return {
        from: timeFilter.from - timeShift,
        to: timeFilter.to - timeShift,
        windowSize: timeFilter.windowSize,
      };
    } else {
      return timeFilter;
    }
  }

  setPossibleTimeIntervals(target: InstanaQuery) {
    if (target.metricCategory.key === 0 || target.metricCategory.key === 1) {
      this.availableTimeIntervals = this.availableRollups;
    } else {
      this.availableTimeIntervals = this.availableGranularities;
    }
  }

  getTimeFilter(): TimeFilter {
    if (!this.timeFilter || !this.timeFilter.from) {
      const now = Math.floor(Date.now() / 1000) * 1000;
      const windowSize = 6 * 60 * 60 * 1000; // 6h
      this.timeFilter = {
        from: now - windowSize,
        to: now,
        windowSize: windowSize,
      };
    }

    return this.timeFilter;
  }

  testDatasource(): Promise<any> {
    return getRequest(this.options, '/api/monitoringState').then(
      () => {
        return {
          status: 'success',
          message: 'Successfully connected to the Instana API.',
          title: 'Success',
        };
      },
      (error: any) => {
        if (error.status === 401) {
          return {
            status: 'error',
            message: 'Unauthorized. Please verify the API Token.',
            title: 'Error',
          };
        } else {
          console.log(error);
          return {
            status: 'error',
            message: 'Error (' + error.status + ') connecting to the Instana API: ' + error.statusText,
            title: 'Error',
          };
        }
      }
    );
  }
}
