import { SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import _ from 'lodash';
import TimeFilter from '../types/time_filter';
import { getTimeKey, getWindowSize } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import { getDefaultChartGranularity } from '../util/rollup_granularity_util';
import { InstanaQuery } from '../types/instana_query';
import { PAGINATION_LIMIT } from '../GlobalVariables';
import { emptyResultData } from '../util/target_util';

export class DataSourceService {
  instanaOptions: InstanaOptions;
  servicesCache: Cache<Promise<SelectableValue[]>>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.servicesCache = new Cache<Promise<SelectableValue[]>>();
  }

  getServicesOfApplication(target: InstanaQuery, timeFilter: TimeFilter) {
    let applicationId = '';
    if (target.entity && target.entity.key) {
      applicationId = target.entity.key;
    }

    const key = getTimeKey(timeFilter) + applicationId + target.applicationBoundaryScope;
    let services = this.servicesCache.get(key);
    if (services) {
      return services;
    }

    const windowSize = getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    services = this.paginateServices(
      [],
      applicationId,
      windowSize,
      timeFilter.to,
      target.applicationBoundaryScope,
      page,
      pageSize,
      PAGINATION_LIMIT
    ).then((response: any) => {
      let allResults = _.flattenDeep(
        _.map(response, (pageSet) => {
          return pageSet.items;
        })
      );

      return _.orderBy(
        _.compact(allResults).map((entry) => {
          return {
            key: entry.id,
            label: entry.label,
          };
        }),
        [(service) => service.label.toLowerCase()],
        ['asc']
      );
    });

    this.servicesCache.put(key, services, 600000);
    return services;
  }

  paginateServices(
    results: any,
    applicationId: string,
    windowSize: number,
    to: number,
    applicationBoundaryScope: string,
    page: number,
    pageSize: number,
    pageLimit: number
  ) {
    if (page > pageLimit) {
      return results;
    }

    let queryParameters = 'windowSize=' + windowSize + '&to=' + to + '&page=' + page + '&pageSize=' + pageSize;
    if (applicationBoundaryScope === 'ALL' || applicationBoundaryScope === 'INBOUND') {
      queryParameters += '&applicationBoundaryScope=' + applicationBoundaryScope;
    }

    let url =
      '/api/application-monitoring/applications;id=' +
      (applicationId ? applicationId : '') +
      '/services?' +
      queryParameters;

    return getRequest(this.instanaOptions, url).then((response: any) => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateServices(results, applicationId, windowSize, to, applicationBoundaryScope, page, pageSize, pageLimit);
      } else {
        return results;
      }
    });
  }

  fetchServiceMetrics(target: InstanaQuery, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.metric.key) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const windowSize = getWindowSize(timeFilter);

    if (!target.timeInterval) {
      target.timeInterval = getDefaultChartGranularity(windowSize);
    }

    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
      granularity: target.timeInterval.key,
    };

    const data: any = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize,
      },
      metrics: [metric],
    };

    if (target.entity && target.entity.key) {
      data['applicationId'] = target.entity.key;
      // only set applicationBoundaryScope when an application is selected
      data['applicationBoundaryScope'] = target.applicationBoundaryScope;
    }

    if (target.service && target.service.key) {
      data['serviceId'] = target.service.key;
    }

    return postRequest(this.instanaOptions, '/api/application-monitoring/metrics/services?fillTimeSeries=true', data);
  }

  buildServiceMetricLabel(target: InstanaQuery, item: any, key: string, index: number): string {
    if (target.labelFormat) {
      let label = target.labelFormat;
      label = _.replace(label, '$label', item.service.label);
      label = _.replace(label, '$service', target.service.label!);
      label = _.replace(label, '$application', target.entity.label!);
      label = _.replace(label, '$metric', target.metric.label!);
      label = _.replace(label, '$key', key);
      label = _.replace(label, '$index', index + 1 + '');
      label = _.replace(label, '$timeShift', target.timeShift);
      return label;
    }

    if (target.service.key === null) {
      return target.timeShift
        ? item.service.label + ' - ' + key + ' - ' + target.timeShift
        : item.service.label + ' - ' + key;
    }

    return target.timeShift && target.timeShiftIsValid
      ? item.service.label + ' (' + target.service.label + ')' + ' - ' + key + ' - ' + target.timeShift
      : item.service.label + ' (' + target.service.label + ')' + ' - ' + key;
  }
}
