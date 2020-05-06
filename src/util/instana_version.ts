import Cache from '../cache';
import { doRequest } from './request_handler';

const versionCache: Cache<Promise<any>> = new Cache<Promise<any>>();

/*
  Get version of current Instana backend and cache it for 10 minutes. This should be the ONLY way to retrieve
  any information about the Instana backend version.
 */
export default function getVersion(baseUrl: string, apiToken: string) {
  let version = versionCache.get('version');
  if (version) {
    return version;
  }

  version = doRequest(baseUrl + '/api/instana/version', apiToken).then(
    result => {
      if (result.data && result.data.imageTag) {
        return parseInt(result.data.imageTag.split('.', 2)[1], 10) || null;
      }
      return null;
    },
    error => {
      return null;
    }
  );

  versionCache.put('version', version, 10000);
  return version;
}
