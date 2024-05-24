import { SelectableValue, TimeSeries, TimeSeriesPoints } from '@grafana/data';
import { buildTimeSeries, emptyResultData } from '../util/target_util';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import { getRequest } from '../util/request_handler';
import { getWindowSize } from '../util/time_util';
import TimeFilter from '../types/time_filter';
import Cache from '../cache';
import _ from 'lodash';

export class DataSourceSlo {
  sliReportsCache: Cache<Promise<SelectableValue[]>>;
  instanaOptions: InstanaOptions;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.sliReportsCache = new Cache<Promise<SelectableValue[]>>();
  }

  getConfiguredSLIs(): Promise<SelectableValue[]> {
    let sliReports = this.sliReportsCache.get('sliReports');
    if (sliReports) {
      return sliReports;
    }

    sliReports = getRequest(this.instanaOptions, '/api/settings/sli').then((response: any) =>
      _.map(response.data, (r) => {
        return {
          key: r.id,
          label: r.sliName,
        };
      })
    );

    this.sliReportsCache.put('sliReports', sliReports);
    return sliReports;
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    //avoid involid calls
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

    let endpoint =
      '/api/sli/report/' +
      target.sloReport.key +
      '?from=' +
      timeFilter.from +
      '&to=' +
      timeFilter.to +
      '&slo=' +
      target.sloValue;
    return getRequest(this.instanaOptions, endpoint).then((response: any) => {
      return this.extractSpecificValueFromSLI(target, response.data, timeFilter);
    });
  }

  extractSpecificValueFromSLI(target: InstanaQuery, sliResult: any, timeFilter: TimeFilter) {
    if (target.sloSpecific.key === 'SLI') {
      return [
        buildTimeSeries(target.sloSpecific.label!, target.refId, this.buildResultArray(sliResult.sli, timeFilter.to)),
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
    }

    return [emptyResultData(target.refId)];
  }

  buildResultArray(result: number, timestamp: number): TimeSeriesPoints {
    return [[result, timestamp]];
  }

  buildViolationDistributionTimeSeries(target: InstanaQuery, series: any, timeFilter: TimeFilter): TimeSeries[] {
    if (!series) {
      // Handle the case where series is undefined or null
      return [];
    }
    const greens: any[] = [];
    const reds: any[] = [];
    const greys: any[] = [];

    let granularity = getWindowSize(timeFilter) / Object.keys(series).length;
    _.forEach(series, (value: number, index: number) => {
      if (value === 1) {
        greens.push([1, timeFilter.from + index * granularity]);
      } else if (value === 0) {
        greys.push([1, timeFilter.from + index * granularity]);
      } else if (value === -1) {
        reds.push([1, timeFilter.from + index * granularity]);
      }
    });

    const result: TimeSeries[] = [];
    result.push(buildTimeSeries('No violation', target.refId, greens));
    result.push(buildTimeSeries('Violation', target.refId, reds));
    result.push(buildTimeSeries('No data', target.refId, greys));

    return result;
  }
}
