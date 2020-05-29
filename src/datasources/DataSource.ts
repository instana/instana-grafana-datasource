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
import { DataSourceSlo } from "./DataSource_Slo";
import MetricCategories from '../lists/metric_categories';
import TimeFilter from "../types/time_filter";
import { readTime } from "../util/time_util";
import Cache from '../cache';
import { emptyResultData } from "../util/target_util";
import _ from "lodash";
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import {
  getDefaultChartGranularity, getDefaultMetricRollupDuration,
  getPossibleGranularities,
  getPossibleRollups
} from '../util/rollup_granularity_util';
import { appendData, generateStableHash, hasIntersection } from '../util/delta_util';
import { SLO_INFORMATION } from '../GlobalVariables';
import getVersion from '../util/instana_version';
import { aggregateTarget } from '../util/aggregation_util';
import { DataSourceWebsite } from './DataSource_Website';

export class DataSource extends DataSourceApi<InstanaQuery, InstanaOptions> {
  options: InstanaOptions;
  dataSourceInfrastructure: DataSourceInfrastructure;
  dataSourceWebsite: DataSourceWebsite;
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
    this.resultCache = new Cache<any>();
  }

  async query(options: DataQueryRequest<InstanaQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    this.timeFilter = readTime(range!);
    this.availableRollups = getPossibleRollups(this.timeFilter);
    this.availableGranularities = getPossibleGranularities(this.timeFilter.windowSize);

    return Promise.all(options.targets.map(target => {
      let targetTimeFilter = readTime(range!);

      if (!target.metricCategory) {
        target.metricCategory = MetricCategories[0];
      }

      this.setPossibleTimeIntervals(target);

      // target migration for downwards compatibility
      //migrate(target);

      if (target.timeShift) {
        let millis = this.convertTimeShiftToMillis(target.timeShift);
        if (millis) {
          targetTimeFilter = this.applyTimeShiftOnTimeFilter(targetTimeFilter, millis);
        }
      }

      target.timeFilter = targetTimeFilter;
      target.stableHash = generateStableHash(target);
      targetTimeFilter = this.adjustTimeFilterIfCached(targetTimeFilter, target);

      if (target.metricCategory.key === 7) {
        return this.dataSourceSlo.runQuery(target, targetTimeFilter).then((data: any) => {
          return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
        });
      } else if (target.metricCategory.key === 0 || target.metricCategory.key === 1) {
        return this.dataSourceInfrastructure.runQuery(target, targetTimeFilter).then((data: any) => {
          return this.buildTargetWithAppendedDataResult(target, targetTimeFilter, data);
        });
      }

      return Promise.resolve(emptyResultData(target.refId));
    })).then(targetData => {
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
    })
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
        results: result
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

  buildTargetWithAppendedDataResult(target: InstanaQuery, timeFilter: TimeFilter, data: any) {
    if (timeFilter.from !== target.timeFilter.from && data) {
      data = this.appendResult(data, target);
    }

    return {
      target: target,
      data: data
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
        windowSize: newTo - newFrom
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

  getSloReports(): Promise<SelectableValue<string>[]> {
    return this.dataSourceSlo.getConfiguredSLOs();
  }

  getEntityTypes(): Promise<SelectableValue<string>[]> {
    return this.dataSourceInfrastructure.getEntityTypes();
  }

  fetchTypesForTarget(query: InstanaQuery) {
    return this.dataSourceInfrastructure.fetchTypesForTarget(query, this.getTimeFilter());
  }

  fetchWebsites(): Promise<SelectableValue<string>[]> {
    return this.dataSourceWebsite.getWebsites(this.getTimeFilter());
  }

  getDefaultTimeInterval(query: InstanaQuery) {
    if (query.metricCategory.key === 0 || query.metricCategory.key === 1) {
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
    if (timeShift) {
      return {
        from: timeFilter.from - timeShift,
        to: timeFilter.to - timeShift,
        windowSize: timeFilter.windowSize
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
        windowSize: windowSize
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
