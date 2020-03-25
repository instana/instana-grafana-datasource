import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';

import _ from "lodash";

export default class InstanaSLODataSource extends AbstractDatasource {
  sloCache: Cache<Promise<Array<Selectable>>>;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.sloCache = new Cache<Promise<Array<Selectable>>>();
  }

  getConfiguredSLOs(target, timeFilter: TimeFilter) {
    let url = 'api/settings/sli'; //TODO verify endpoint
    return this.doRequest(url).then(response => {
      return _.map(response.data, (r, index) => {
        return {
          'key': r.id,
          'label': r.sloName
        };
      });
    });
  }

  fetchSLOReport(target, timeFilter) {
    //avoid involid calls
    if (!target || !target.sloReport || !target.sloReport.key || !target.sloSpecific || !target.sloSpecific.key || !target.sloValue) {
      return this.$q.resolve({data: {items: []}});
    }

    let url = 'api/sli/report/' + target.sloReport.key + '?from=' + timeFilter.from + '&to=' + timeFilter.to + '&slo=' + target.sloValue;
    return this.doRequest(url).then(response => {
      return this.extractSpecificValueFromSLI(target, response.data, target.sloSpecific, timeFilter);
    });
  }

  extractSpecificValueFromSLI(target, sliResult, sloSpecific, timeFilter: TimeFilter) {
    if (sloSpecific.key === 'SLI') {
      return this.createTarget(sloSpecific.label, this.buildResultArray(sliResult.sli), target.refId);
    } else if (sloSpecific.key === 'Remaining Error Budget') {
      return this.createTarget(sloSpecific.label, this.buildResultArray(sliResult.errorBudgetRemaining), target.refId);
    } else if (sloSpecific.key === 'Timeseries') {
      return this.splitAndPopulate(target, sliResult.violationDistribution, timeFilter);
    }

    return this.$q.resolve({data: {items: []}});
  }

  buildResultArray(result) {
    return [[result, Date.now()]];
  }

  splitAndPopulate(target, series, timeFilter: TimeFilter) {
    var greens = [];
    var reds = [];
    var greys = [];

    var granularity = this.getWindowSize(timeFilter) / 101;
    _.forEach(series, (value, index) => {
      if (value === 1) {
        greens.push([1, timeFilter.from + (index * granularity)]);
      } else if (value === 0) {
        greys.push([1, timeFilter.from + (index * granularity)]);
      } else if (value === -1) {
        reds.push([1, timeFilter.from + (index * granularity)]);
      }
    });

    var result = [];
    result.push(this.createTarget("No violation", greens, target.refId));
    result.push(this.createTarget("", [], target.refId));
    result.push(this.createTarget("No data", greys, target.refId));
    result.push(this.createTarget("", [], target.refId));
    result.push(this.createTarget("Violation", reds, target.refId));

    return result;
  }

  createTarget(target, datapoints, refId) {
    return {
      'target': target,
      'datapoints': datapoints,
      'refId': refId
    };
  }
}
