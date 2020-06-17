import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import _ from 'lodash';
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import { InstanaQuery } from '../types/instana_query';
import { ALL_ENDPOINTS, PAGINATION_LIMIT } from '../GlobalVariables';
import { emptyResultData } from '../util/target_util';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';

export class DataSourceEndpoint {

  instanaOptions: InstanaOptions;
  endpointsCache: Cache<Promise<Array<SelectableValue>>>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.endpointsCache = new Cache<Promise<Array<SelectableValue>>>();
  }

  getEndpointsOfService(target: InstanaQuery, timeFilter: TimeFilter) {
    let applicationId = '';
    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    let serviceId = '';
    if (target.service) {
      serviceId = target.service.key;
    }

    const key = getTimeKey(timeFilter) + applicationId + serviceId;
    let endpoints = this.endpointsCache.get(key);
    if (endpoints) {
      return endpoints;
    }

    const windowSize = getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    endpoints = this.paginateEndpoints([], applicationId, serviceId, windowSize, timeFilter.to, page, pageSize, PAGINATION_LIMIT)
      .then((response: any) => {
        let allResults = _.flattenDeep(_.map(response, (pageSet, index) => {
          return pageSet.items;
        }));

        return _.compact(allResults).map(entry => {
          return {
            'key': entry.id,
            'label': entry.label
          };
        });
      });

    this.endpointsCache.put(key, endpoints, 600000);
    return endpoints;
  }

  paginateEndpoints(results: any, applicationId: string, serviceId: string, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number) {
    if (page > pageLimit) {
      return results;
    }

    var queryParameters = 'windowSize=' + windowSize
      + '&to=' + to
      + '&page=' + page
      + '&pageSize=' + pageSize;

    var url = '/api/application-monitoring/applications;id='
      + (applicationId ? applicationId : '')
      + '/services;id='
      + (serviceId ? serviceId : '')
      + '/endpoints?' + queryParameters;

    return getRequest(this.instanaOptions, url).then((response: any) => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateEndpoints(results, applicationId, serviceId, windowSize, to, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  }

  fetchEndpointMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);
    const metric: any = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getDefaultChartGranularity(windowSize);
      }
      metric['granularity'] = target.timeInterval.key;
    }

    const data: any = {
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

    return postRequest(this.instanaOptions, '/api/application-monitoring/metrics/endpoints?fillTimeSeries=true', data);
  }

  buildEndpointMetricLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.endpoint.label);
      label = _.replace(label, '$endpoint', target.endpoint.label!);
      label = _.replace(label, '$service', target.service.label!);
      label = _.replace(label, '$application', target.entity.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', '' + index + 1);
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.endpoint.label === ALL_ENDPOINTS) {
      return target.timeShift ? item.endpoint.label + ' - ' + key + " - " + target.timeShift : item.endpoint.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid ?
      item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key + " - " + target.timeShift
      :
      item.endpoint.label + ' (' + target.endpoint.label + ')' + ' - ' + key;
  }
}
