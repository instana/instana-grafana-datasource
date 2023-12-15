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
    //avoid involid calls
    /*
    if (
      !target ||
      !target.sloReport ||
      !target.sloReport.key ||
      !target.sloSpecific ||
      !target.sloSpecific.key ||
      !target.sloValue
    ) {
      return Promise.resolve(emptyResultData(target.refId));
    }
   */
    let endpoint = '/api/slo/report/' +  target.sloReport.key
      + '?from=' + Math.floor(timeFilter.from/6000)*6000
      + '&to=' + Math.floor(timeFilter.to/6000)*6000;
    console.info("run here: "+endpoint);

    return getRequest(this.instanaOptions, endpoint).then((response: any) => {
      return this.extractSpecificValueFromSLI(target, response.data, timeFilter);
    });
  }

  extractSpecificValueFromSLI(target: InstanaQuery, sliResult: any, timeFilter: TimeFilter) {
    //console.info("query: "+timeFilter.from+"-"+timeFilter.to);
    console.debug(sliResult.sli)

    if (target.sloSpecific.key === 'Status') {
      return [
        buildTimeSeries(
          target.sloSpecific.label!,
          target.refId,
          this.buildResultArray(sliResult.sli, timeFilter.to)
        ),
      ];
    } else if (target.sloSpecific.key === 'Remaining Error Budget') {
      return [
        buildTimeSeries(
          target.sloSpecific.label!,
          target.refId,
          this.buildResultArray(sliResult.errorBudgetRemaining, timeFilter.to)
        ),
      ];
    } else if (target.sloSpecific.key === 'Timeseries') {
      return this.buildViolationDistributionTimeSeries(target, sliResult.violationDistribution, timeFilter);
    } else if (target.sloSpecific.key === 'ErrorChart') {
      return this.buildChart('Error budget spent', target, sliResult.errorChart, timeFilter);
    } else if (target.sloSpecific.key === 'ErrorAccumulationChart') {
      return this.buildChart('Error Accumulation', target, sliResult.errorAccumulationChart, timeFilter);
    } else if (target.sloSpecific.key === 'ErrorBudgetRemainChart') {
      return this.buildChart('Error budget remain', target, sliResult.errorBudgetRemainChart, timeFilter);
    }

    return [emptyResultData(target.refId)];
  }

  buildResultArray(result: number, timestamp: number): TimeSeriesPoints {
    return [[result, timestamp]];
  }

  buildViolationDistributionTimeSeries(target: InstanaQuery, series: any, timeFilter: TimeFilter): TimeSeries[] {
    const greens: any[] = [];
    const reds: any[] = [];
    const greys: any[] = [];

    let granularity = getWindowSize(timeFilter) / Object.keys(series).length;
    console.info("granularity: "+granularity);
    let startTS=Math.floor(timeFilter.from/granularity)*granularity;
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
    console.info("granularity: "+granularity);
    let startTS=Math.floor(timeFilter.from/granularity)*granularity;
    _.forEach(series, (value: number, index: number) => {
        greens.push([value, startTS + index * granularity]);
    });

    const result: TimeSeries[] = [];
    result.push(buildTimeSeries(name, target.refId, greens));

    return result;
  }

}
