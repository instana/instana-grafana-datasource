import { getBackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime/services/backendSrv';
import { InstanaOptions } from '../types/instana_options';

export function getRequest(options: InstanaOptions, endpoint: string, swallowError = false, maxRetries = 1) {
  const request = {
    method: 'GET',
    url: buildUrl(options, endpoint),
  };

  return doRequest(options, request, swallowError, maxRetries);
}

export function postRequest(options: InstanaOptions, endpoint: string, data: {}, swallowError = false, maxRetries = 0) {
  const request = {
    method: 'POST',
    url: buildUrl(options, endpoint),
    data: data,
  };

  return doRequest(options, request, swallowError, maxRetries);
}

function doRequest(options: InstanaOptions, request: BackendSrvRequest, swallowError: boolean, maxRetries: number) {
  if (options.useProxy) {
    return execute(request, swallowError, maxRetries, undefined);
  } else {
    return execute(request, swallowError, maxRetries, options.apiToken);
  }
}

export function buildUrl(options: InstanaOptions, endpoint: string) {
  if (options.useProxy) {
    return options.url + '/instana' + endpoint; // to match proxy route in plugin.json
  } else {
    return options.url + endpoint;
  }
}

function execute(
  request: BackendSrvRequest,
  swallowError: boolean,
  maxRetries: number,
  apiToken?: string
): any {
  if (apiToken) {
    request['headers'] = {
      Authorization: 'apiToken ' + apiToken,
    };
  }

  return getBackendSrv()
    .datasourceRequest(request)
    .catch(error => {
      if (error.status === 429) {
        throw new Error('API limit is reached.');
        return;
      }

      if (swallowError && (error.status >= 400 || error.status < 500)) {
        console.log(error);
        return;
      }
      if (maxRetries > 0) {
        return execute(request, swallowError, maxRetries - 1, apiToken);
      }
      throw error;
    });
}
