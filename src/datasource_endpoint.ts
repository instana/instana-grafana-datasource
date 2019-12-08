import {getDefaultChartGranularity} from "./util/rollup_granularity_util";
import InstanaServiceDataSource from "./datasource_service";
import AbstractDatasource from "./datasource_abstract";
import Selectable from "./types/selectable";
import Cache from './cache';
import TimeFilter from "./types/time_filter";

import _ from "lodash";

export default class InstanaEndpointDataSource extends AbstractDatasource {
  endpointsCache: Cache<Promise<Array<Selectable>>>;
  serviceDataSource: InstanaServiceDataSource;
  maximumNumberOfUsefulDataPoints = 80;

  // duplicate to QueryCtrl.NO_ENDPOINT_FILTER
  NO_ENDPOINT_FILTER = '-- No Endpoint Filter --';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);
    this.endpointsCache = new Cache<Promise<Array<Selectable>>>();
  }

  getEndpointsOfService(target, timeFilter: TimeFilter) {
    let applicationId = "";
    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    let serviceId = "";
    if (target.service) {
      serviceId = target.service.key;
    }

    const key = this.getTimeKey(timeFilter) + applicationId + serviceId;
    let endpoints = this.endpointsCache.get(key);
    if (endpoints) {
      return endpoints;
    }

    const windowSize = this.getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;


    endpoints = this.paginateEndpoints([], applicationId, serviceId, windowSize, timeFilter.to, page, pageSize).then(response => {
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

    this.endpointsCache.put(key, endpoints, 600000);
    return endpoints;
  }

  paginateEndpoints(results, applicationId, serviceId, windowSize: number, to: number, page: number, pageSize: number) {
    var queryParameters = "windowSize=" + windowSize
      + "&to=" + to
      + "&page=" + page
      + "&pageSize=" + pageSize;

    var url = '/api/application-monitoring/applications;id='
      + applicationId
      + '/services;id='
      + serviceId
      + '/endpoints?' + queryParameters;

    return this.doRequest(url).then(response => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateEndpoints(results, applicationId, serviceId, windowSize, to, page, pageSize);
      } else {
        return results;
      }
    });
  }

  fetchEndpointMetrics(target, timeFilter: TimeFilter) {
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
      endpointId: target.endpoint.key,
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric]
    };

    if (target.entity && target.entity.key) { //see migration.ts why "ALL_SERVICES"
      data['applicationId'] = target.entity.key;
    }

    if (target.service && target.service.key) {
      data['serviceId'] = target.service.key;
    }

    return this.postRequest('/api/application-monitoring/metrics/endpoints?fillTimeSeries=true', data);
  }

  buildEndpointMetricLabel(target, item, key, index): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.endpoint.label);
      label = _.replace(label, '$endpoint', target.endpoint.label);
      label = _.replace(label, '$service', target.service.label);
      label = _.replace(label, '$application', target.entity.label);
      label = _.replace(label, '$metric', target.metric.label);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.endpoint.label === this.NO_ENDPOINT_FILTER) {
      return target.timeShift ? item.endpoint.label + ' - ' + key + " - " + target.timeShift : item.endpoint.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key;
  }

}
