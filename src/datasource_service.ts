import AbstractDatasource from "./datasource_abstract";
import Selectable from "./types/selectable";
import Cache from './cache';
import TimeFilter from "./types/time_filter";
import {getChartGranularity} from "./util/analyze_util";
import _ from "lodash";

export default class InstanaServiceDataSource extends AbstractDatasource {
  servicesCache: Cache<Promise<Array<Selectable>>>;

  maximumNumberOfUsefulDataPoints = 80;

  ALL_SERVICES = '-- No Service Filter --';

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv, $q) {
    super(instanceSettings, backendSrv, templateSrv, $q);

    this.servicesCache = new Cache<Promise<Array<Selectable>>>();
  }

  getServices(target, timeFilter: TimeFilter) {
    const key = this.getTimeKey(timeFilter);

    let services = this.servicesCache.get(key);
    if (services) {
      return services;
    }

    const windowSize = this.getWindowSize(timeFilter);
    let page = 1;
    let pageSize = 200;

    services = this.paginateServices([], windowSize, timeFilter.to, page, pageSize).then(response => {
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
    this.servicesCache.put(key, services);

    return services;
  }

  paginateServices(results, windowSize: number, to: number, page: number, pageSize: number) {
    var queryParameters = "windowSize=" + windowSize
      + "&to=" + to
      + "&page=" + page
      + "&pageSize=" + pageSize;

    return this.doRequest('/api/application-monitoring/applications/services?' + queryParameters).then(response => {
      results.push(response.data);
      if (page * pageSize < response.data.totalHits) {
        page++;
        return this.paginateServices(results, windowSize, to, page, pageSize);
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
      console.log(filteredData);
      return filteredData.map(entry => ({
        'key': entry.application.id,
        'label': entry.application.label
      }));
    });
  }

  fetchServiceMetrics(target, timeFilter: TimeFilter) {
    // avoid invalid calls
    if (!target || !target.metric || !target.entity) {
      return this.$q.resolve({data: {items: []}});
    }

    const windowSize = this.getWindowSize(timeFilter);

    const metric = {
      metric: target.metric.key,
      aggregation: target.aggregation ? target.aggregation : 'SUM',
    };

    if (target.pluginId !== "singlestat" && target.pluginId !== "gauge") { // no granularity for singlestat and gauge
      if (!target.timeInterval) {
        target.timeInterval = getChartGranularity(windowSize, this.maximumNumberOfUsefulDataPoints);
      }
      metric['granularity'] = target.timeInterval.value;
    }

    const data = {
      timeFrame: {
        to: timeFilter.to,
        windowSize: windowSize
      },
      metrics: [metric]
    };

    if (target.entity.key !== null) {
      data['serviceId'] = target.entity.key;
    }

    if (target.selectedApplication && target.selectedApplication.key) {
      data['applicationId'] = target.selectedApplication.key;
    }

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
