import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import proxy_check from './proxy_check';
import Cache from './cache';

import _ from 'lodash';

export default class AbstractDatasource {
  id: number;
  name: string;
  pluginVersion: string;

  url: string;
  apiToken: string;

  simpleCache: Cache<Array<Selectable>>;

  PAGINATION_LIMIT = 15; // pagesize=200 => 3000 results in dropdown (~30sec.)
  CACHE_MAX_AGE = 60000;
  SEPARATOR = '|';

  BUILT_IN_METRICS = '0';
  CUSTOM_METRICS = '1';
  ANALYZE_APPLICATION_METRICS = '2';
  ANALYZE_WEBSITE_METRICS = '3';
  APPLICATION_SERVICE_ENDPOINT_METRICS = '4'; // replaces previous
  // APPLICATION_METRICS = '4';
  // SERVICE_METRICS = '5';
  // ENDPOINT_METRICS = '6';

  /** @ngInject */
  constructor(instanceSettings, public backendSrv, public templateSrv, public $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.simpleCache = new Cache<Array<Selectable>>();

    // old versions have not saved proxy usage, so we switch to the default assumption
    if (instanceSettings.jsonData.useProxy === undefined) {
      instanceSettings.jsonData.useProxy = proxy_check();
    }

    if (instanceSettings.jsonData.useProxy) {
      this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
    } else {
      this.url = instanceSettings.jsonData.url;
      this.apiToken = instanceSettings.jsonData.apiToken;
    }
  }

  currentTime = () => {
    return Date.now();
  }

  getWindowSize(timeFilter: TimeFilter): number {
    return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
  }

  getTimeKey(timeFilter: TimeFilter): string {
    // time might be part of a cache key as this can cause different results
    return this.msToMin(timeFilter.from) + this.SEPARATOR + this.msToMin(timeFilter.to);
  }

  private msToMin(time: number): number {
    return Math.round(time / 60000);
  }

  hoursToMs(hours: any): number {
    if (hours > 0) {
      return hours * 60 * 60 * 1000;
    }
    return 0;
  }

  doRequest(url: string, swallowError = false, maxRetries = 1) {
    const request = {
      method: 'GET',
      url: this.url + url
    };
    return this.execute(request, swallowError, maxRetries);
  }

  postRequest(url: string, data: Object, swallowError = false, maxRetries = 0) {
    const request = {
      method: 'POST',
      url: this.url + url,
      data: data
    };
    return this.execute(request, swallowError, maxRetries);
  }

  private execute(request, swallowError, maxRetries) {
    if (this.apiToken) {
      request['headers'] = {
        "Authorization": 'apiToken ' + this.apiToken
      };
    }

    return this.backendSrv
      .datasourceRequest(request)
      .catch(error => {
        if (error.status === 429) {
          throw new Error("API limit is reached.");
          return;
        }

        if (swallowError && (error.status >= 400 || error.status < 500)) {
          console.log(error);
          return;
        }
        if (maxRetries > 0) {
          return this.execute(request, swallowError, maxRetries - 1);
        }
        throw error;
      });
  }

  sortByTimestamp(datapoints) {
    return _.sortBy(datapoints, [function (o) {
      return o[1];
    }]);
  }
}
