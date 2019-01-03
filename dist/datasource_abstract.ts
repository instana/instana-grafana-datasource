import _ from 'lodash';

export default class AbstractDatasource {
  id: number;
  name: string;
  pluginVersion: string;

  url: string;
  apiToken: string;

  CACHE_MAX_AGE = 60000;

  /** @ngInject */
  constructor(instanceSettings, public backendSrv, public templateSrv, public $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.pluginVersion = _.get(instanceSettings, ['meta', 'info', 'version'], '2.0.0');

    // grafana 5.3+ wanted to resolve dynamic routes in proxy mode
    const version = _.get(window, ['grafanaBootData', 'settings', 'buildInfo', 'version'], '3.0.0');
    const versions = _.split(version, '.', 2);
    if (versions[0] >= 5 && versions[1] >= 3) {
      this.url = instanceSettings.url + '/instana'; // to match proxy route in plugin.json
    } else {
      this.url = instanceSettings.jsonData.url;
      this.apiToken = instanceSettings.jsonData.apiToken;
    }
  }

  currentTime = () => {
    return Date.now();
  }

  getWindowSize(timeFilter) {
    return timeFilter.from ? timeFilter.to - timeFilter.from : timeFilter.windowSize;
  }

  doRequest(url, maxRetries = 1) {
    const request = {
      method: 'GET',
      url: this.url + url
    };
    return this.execute(request, maxRetries);
  }

  postRequest(url, data, maxRetries = 0) {
    const request = {
      method: 'POST',
      url: this.url + url,
      data: data
    };
    return this.execute(request, maxRetries);
  }

  execute(request, maxRetries) {
    if (this.apiToken) {
      request['headers'] = { Authorization: 'apiToken ' + this.apiToken };
    } else {
      // request['headers'] = { 'X-Client-App': 'Grafana', 'X-Client-Version': this.pluginVersion };
    }
    return this.backendSrv
      .datasourceRequest(request)
      .catch(error => {
        if (maxRetries > 0) {
          return this.execute(request, maxRetries - 1);
        }
        throw error;
      });
  }
}
