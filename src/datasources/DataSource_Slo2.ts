import { SelectableValue, TimeSeries, TimeSeriesPoints } from '@grafana/data';
import { buildTimeSeries, emptyResultData } from '../util/target_util';

import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';
import { getRequest } from '../util/request_handler';
import { getWindowSize } from '../util/time_util';

export class DataSourceSlo2 {
  sloReportsCache: Cache<Promise<SelectableValue[]>>;
  instanaOptions: InstanaOptions;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.sloReportsCache = new Cache<Promise<SelectableValue[]>>();
  }

  getSLOConfigurations(): Promise<SelectableValue[]> {
    let sloReports = this.sloReportsCache.get('sloReports');
    if (sloReports) {
      return sloReports;
    }

    sloReports = getRequest(this.instanaOptions, '/api/settings/slo').then((response: any) =>
      _.map(response.data.items, (r) => {
        return {
          key: r.id,
          label: r.name,
        };
      })
    );

    this.sloReportsCache.put('sloReports', sloReports);
    return sloReports;
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.slo2Report || !target.slo2Report.key || !target.slo2Specific || !target.slo2Specific.key) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    let endpoint =
      '/api/slo/report/' +
      target.slo2Report.key +
      '?from=' +
      Math.floor(timeFilter.from / 6000) * 6000 +
      '&to=' +
      Math.floor(timeFilter.to / 6000) * 6000;

    return getRequest(this.instanaOptions, endpoint).then((response: any) => {
      return this.extractSpecificValueFromSLI(target, response.data, timeFilter);
    });
  }

  extractSpecificValueFromSLI(target: InstanaQuery, sloResult: any, timeFilter: TimeFilter) {
    if (target.slo2Specific.key === 'Status') {
      return [
        buildTimeSeries(
          target.slo2Specific.label!,
          target.refId,
          this.buildResultArray(sloResult.sli, timeFilter.to, true)
        ),
      ];
    } else if (target.slo2Specific.key === 'Service Level Target') {
      return [
        buildTimeSeries(
          target.slo2Specific.label!,
          target.refId,
          this.buildResultArray(sloResult.slo, timeFilter.to, true)
        ),
      ];
    } else if (target.slo2Specific.key === 'Total Error Budget') {
      return [
        buildTimeSeries(
          target.slo2Specific.label!,
          target.refId,
          this.buildResultArray(sloResult.totalErrorBudget, timeFilter.to)
        ),
      ];
    } else if (target.slo2Specific.key === 'Remaining Error Budget') {
      return [
        buildTimeSeries(
          target.slo2Specific.label!,
          target.refId,
          this.buildResultArray(sloResult.errorBudgetRemaining, timeFilter.to)
        ),
      ];
    } else if (target.slo2Specific.key === 'Spended Error Budget') {
      return [
        buildTimeSeries(
          target.slo2Specific.label!,
          target.refId,
          this.buildResultArray(sloResult.errorBudgetSpent, timeFilter.to)
        ),
      ];
    } else if (target.slo2Specific.key === 'Timeseries') {
      return this.buildViolationDistributionTimeSeries(target, sloResult.violationDistribution, timeFilter);
    } else if (target.slo2Specific.key === 'Error Chart') {
      return this.buildChart('Error budget spent', target, sloResult.errorChart, timeFilter);
    } else if (target.slo2Specific.key === 'Error Accumulation Chart') {
      return this.buildChart('Error Accumulation', target, sloResult.errorAccumulationChart, timeFilter);
    } else if (target.slo2Specific.key === 'Error Budget Remain Chart') {
      return this.buildChart('Error Budget Remain Chart', target, sloResult.errorBudgetRemainChart, timeFilter);
    }

    return [emptyResultData(target.refId)];
  }

  buildResultArray(result: number, timestamp: number, asPercentage: boolean = false): TimeSeriesPoints {
    if (asPercentage) {
      result = parseFloat((result * 100).toFixed(4));
    }
    return [[result, timestamp]];
  }

  buildViolationDistributionTimeSeries(target: InstanaQuery, series: any, timeFilter: TimeFilter): TimeSeries[] {
    const greens: any[] = [];
    const reds: any[] = [];
    const greys: any[] = [];

    let granularity = getWindowSize(timeFilter) / Object.keys(series).length;
    let startTS = Math.floor(timeFilter.from / granularity) * granularity;
    _.forEach(series, (value: number, index: number) => {
      if (value === 1) {
        greens.push([1, startTS + index * granularity]);
      } else if (value === 0) {
        greys.push([1, startTS + index * granularity]);
      } else if (value === -1) {
        reds.push([1, startTS + index * granularity]);
      }
    });

    const result: TimeSeries[] = [];
    result.push(buildTimeSeries('No violation', target.refId, greens));
    result.push(buildTimeSeries('Violation', target.refId, reds));
    result.push(buildTimeSeries('No data', target.refId, greys));

    return result;
  }

  buildChart(name: any, target: InstanaQuery, series: any, timeFilter: TimeFilter): TimeSeries[] {
    const greens: any[] = [];

    let granularity = getWindowSize(timeFilter) / Object.keys(series).length;
    let startTS = Math.floor(timeFilter.from / granularity) * granularity;
    _.forEach(series, (value: number, index: number) => {
      greens.push([value, startTS + index * granularity]);
    });

    const result: TimeSeries[] = [];
    result.push(buildTimeSeries(name, target.refId, greens));

    return result;
  }
}
