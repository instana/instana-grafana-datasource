import { getBackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime/services/backendSrv';

export function doRequest(url: string, apiToken: string, swallowError = false, maxRetries = 1) {
  const request = {
    method: 'GET',
    url: url,
  };
  return execute(request, apiToken, swallowError, maxRetries);
}

export function postRequest(url: string, apiToken: string, data: {}, swallowError = false, maxRetries = 0) {
  const request = {
    method: 'POST',
    url: url,
    data: data,
  };
  return execute(request, apiToken, swallowError, maxRetries);
}

function execute(
  request: BackendSrvRequest,
  apiToken: string,
  swallowError: boolean,
  maxRetries: number
): Promise<any> {
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
        return execute(request, apiToken, swallowError, maxRetries - 1);
      }
      throw error;
    });
}
