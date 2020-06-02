import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import _ from 'lodash';
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize } from '../util/time_util';
import { getRequest } from '../util/request_handler';
import { InstanaQuery } from '../types/instana_query';
import { PAGINATION_LIMIT } from '../GlobalVariables';

export class DataSourceEndpoint {

  instanaOptions: InstanaOptions;
  endpointsCache: Cache<Promise<Array<SelectableValue>>>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.endpointsCache = new Cache<Promise<Array<SelectableValue>>>();
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter) {

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
}
