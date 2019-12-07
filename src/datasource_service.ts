import {getDefaultChartGranularity} from "./util/rollup_granularity_util";
import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';

import _ from "lodash";

export default class InstanaServiceDataSource extends AbstractDatasource {
  servicesCache: Cache<Promise<Array<Selectable>>>;

  maximumNumberOfUsefulDataPoints = 80;

  // duplicate to QueryCtrl.ALL_SERVICES
  ALL_SERVICES = '-- No Service Filter --';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.servicesCache = new Cache<Promise<Array<Selectable>>>();
  }

  getServicesOfApplication(target, timeFilter: TimeFilter) {
    let applicationId = "";
    if (target.entity) {
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

    services = this.paginateServices([], applicationId, windowSize, timeFilter.to, page, pageSize).then(response => {
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

  paginateServices(results, applicationId, windowSize: number, to: number, page: number, pageSize: number) {
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
        return this.paginateServices(applicationId, results, windowSize, to, page, pageSize);
      } else {
        return results;
      }
    });
  }

  getApplicationsUsingService(target, timeFilter: TimeFilter) {
    const windowSize = this.getWindowSize(timeFilter);

    const metric = {
      metric: "calls",
      aggregation: "SUM"
    };

    const data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric],
      serviceId: target.entity.key
    };

    let page = 1;
    let pageSize = 200;
    let pagination = {
      page: page,
      pageSize: pageSize
    };

    data['pagination'] = pagination;

    return this.postRequest('/api/application-monitoring/metrics/applications', data).then(response => {
      let filteredData = _.filter(response.data.items, item => item.metrics['calls.sum'][0][0] > 0);
      return filteredData.map(entry => ({
        'key': entry.application.id,
        'label': entry.application.label
      }));
    });
  }

  fetchServiceMetrics(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.entity || !target.service) {
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

    data['applicationId'] = target.entity.key;
    data['serviceId'] = target.service.key;

    return this.postRequest('/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
  }

  buildServiceMetricLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.service.label);
      label = _.replace(label, '$service', target.entity.label);
      label = _.replace(label, '$application', target.selectedApplication.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.entity.label === this.ALL_SERVICES) {
      return target.timeShift ? item.service.label + ' - ' + key + " - " + target.timeShift : item.service.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.service.label + ' (' + target.entity.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.service.label + ' (' + target.entity.label + ')' + ' - ' + key;
  }

}
