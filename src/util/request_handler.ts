import { getBackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime/services/backendSrv';
import { InstanaOptions } from '../types/instana_options';
import { DataSourceInstanceSettings } from '@grafana/data';

export function getRequest(
  options: InstanaOptions,
  endpoint: string,
  swallowError = false,
  maxRetries = 1
): any {
  const request = {
    method: 'GET',
    url: options.url + endpoint,
  };

  return doRequest(options, request, swallowError, maxRetries);
}

export function postRequest(
  options: InstanaOptions,
  endpoint: string,
  data: {},
  swallowError = false,
  maxRetries = 0
): any {
  const request = {
    method: 'POST',
    url: options.url + endpoint,
    data: data,
  };

  return doRequest(options, request, swallowError, maxRetries);
}

function doRequest(
  options: InstanaOptions,
  request: BackendSrvRequest,
  swallowError: boolean,
  maxRetries: number
): any {
  if (!options.useProxy) {
    request['headers'] = {
      Authorization: 'apiToken ' + options.apiToken,
    };
  }

  return getBackendSrv()
    .datasourceRequest(request)
    .catch((error) => {
      if (error.status === 429) {
        // if the error was caused by a concurrent execution limit, we will retry
        if (error.statusText && error.statusText.includes == "concurrent" && maxRetries > 0) {
          console.log("reload in " + 2000 ** maxRetries + " ms");
          return sleep(2000 ** maxRetries).then(() => {
            return doRequest(options, request, swallowError, maxRetries - 1);
          });
        }
        throw new Error('API limit is reached.');
        return;
      }

      if (swallowError && (error.status >= 400 || error.status < 500)) {
        console.log(error);
        return;
      }
      if (maxRetries > 0) {
        return doRequest(options, request, swallowError, maxRetries - 1);
      }
      throw error;
    });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function instanaUrl(instanceSettings: DataSourceInstanceSettings<InstanaOptions>): string {
  if (instanceSettings.jsonData.useProxy) {
    return instanceSettings.url + '/instana'; // to match proxy route in plugin.json
  } else {
    return instanceSettings.jsonData.url;
  }
}
