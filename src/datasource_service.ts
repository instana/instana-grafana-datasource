import {getDefaultChartGranularity} from "./util/rollup_granularity_util";
import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';

import _ from "lodash";

export default class InstanaServiceDataSource extends AbstractDatasource {
  servicesCache: Cache<Promise<Array<Selectable>>>;
  maximumNumberOfUsefulDataPoints = 80;

  // duplicate to QueryCtrl.NO_SERVICE_FILTER
  NO_SERVICE_FILTER = '-- No Service Filter --';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.servicesCache = new Cache<Promise<Array<Selectable>>>();
  }

  getServicesOfApplication(target, timeFilter: TimeFilter) {
    let applicationId = "";
    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    const key = this.getTimeKey(timeFilter) + applicationId;
    let services = this.servicesCache.get(key);
    if (services) {
      return services;
    }

    const windowSize = this.getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    services = this.paginateServices([], applicationId, windowSize, timeFilter.to, page, pageSize, this.PAGINATION_LIMIT).then(response => {
      let allResults = _.flattenDeep(_.map(response, (pageSet, index) => {
        return pageSet.items;
      }));

      return allResults.map(entry => {
        return {
          'key': entry.id,
          'label': entry.label
        };
      });
    });
    this.servicesCache.put(key, services, 600000);

    return services;
  }

  paginateServices(results, applicationId, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number) {
    console.log(applicationId);
    if (page > pageLimit) {
      return results;
    }

    var queryParameters = "windowSize=" + windowSize
      + "&to=" + to
      + "&page=" + page
      + "&pageSize=" + pageSize;

    var url = '/api/application-monitoring/applications;id='
      + applicationId
      + '/services?'
      + queryParameters;

    return this.doRequest(url).then(response => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateServices(results, applicationId, windowSize, to, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  }

  fetchServiceMetrics(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric) {
      return this.$q.resolve({data: {items: []}});
    }

    const windowSize = this.getWindowSize(timeFilter);

    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM',
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getDefaultChartGranularity(windowSize);
      }
      metric['granularity'] = target.timeInterval.key;
    }

    const data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric]
    };

    if (target.entity && target.entity.key) { //see migration.ts why "NO_SERVICE_FILTER"
      data['applicationId'] = target.entity.key;
    }

    if (target.service && target.service.key) {
      data['serviceId'] = target.service.key;
    }

    return this.postRequest('/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
  }

  buildServiceMetricLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.service.label);
      label = _.replace(label, '$service', target.service.label);
      label = _.replace(label, '$application', target.entity.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.service.label === this.NO_SERVICE_FILTER) {
      return target.timeShift ? item.service.label + ' - ' + key + " - " + target.timeShift : item.service.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.service.label + ' (' + target.service.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.service.label + ' (' + target.service.label + ')' + ' - ' + key;
  }

}
