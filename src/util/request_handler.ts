import { getBackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime/services/backendSrv';
import { InstanaOptions } from '../types/instana_options';
import { DataSourceInstanceSettings } from '@grafana/data';
import _ from 'lodash';

interface ExtendedBackendSrvRequest extends BackendSrvRequest {
  tlsSkipVerify?: boolean;
}

export const getRequest = (options: InstanaOptions, endpoint: string, swallowError = false, maxRetries = 1) => {
  const request: ExtendedBackendSrvRequest = {
    method: 'GET',
    url: options.url + endpoint,
  };
console.log(doRequest,"options");

  return doRequest(options, request, swallowError, maxRetries);
};

export const postRequest = (
  options: InstanaOptions,
  endpoint: string,
  data: {},
  swallowError = false,
  maxRetries = 0
) => {
  const request: ExtendedBackendSrvRequest = {
    method: 'POST',
    url: options.url + endpoint,
    data: data,
  };

  return doRequest(options, request, swallowError, maxRetries);
};

function doRequest(
  options: InstanaOptions,
  request: ExtendedBackendSrvRequest,
  swallowError: boolean,
  maxRetries: number
): any {
  // Add skipTLSVerify option if enabled
  if (options.tlsSkipVerify) {
    request.tlsSkipVerify = true;
  }

  return getBackendSrv()
    .datasourceRequest(request)
    .catch((error) => {
      if (error.status === 429) {
        // if the error was caused by a concurrent execution limit, we will retry
        if (
          maxRetries > 0 &&
          error.data?.errors &&
          error.data.errors[0] &&
          error.data.errors[0].includes('concurrent')
        ) {
          const backoff = maxRetries >= 4 ? 10000 : (4 - maxRetries) * 20000; // something between 10 and 60 seconds
          return new Promise((resolve) => setTimeout(resolve, backoff)).then(() => {
            return doRequest(options, request, swallowError, maxRetries - 1);
          });
        }
        throw new Error('API limit is reached.');
      }

      if (swallowError && (error.status >= 400 || error.status < 500)) {
        console.log(error);
        return;
      }
      if (maxRetries > 0 && error.status >= 500) {
        return doRequest(options, request, swallowError, maxRetries - 1);
      }
      // in order to display a reasonable error message text inside ui
      if (!error.statusText && error.data?.errors && error.data.errors[0]) {
        throw new Error(error.data.errors[0]);
      }
      throw error;
    });
}

export function instanaUrl(instanceSettings: DataSourceInstanceSettings<InstanaOptions>): string {
  if (instanceSettings.jsonData.useProxy) {
    return _.trimEnd(instanceSettings.url, '/ ') + '/instana'; // to match proxy route in plugin.json
  } else {
    return _.trimEnd(instanceSettings.jsonData.url, '/ ');
  }
}
