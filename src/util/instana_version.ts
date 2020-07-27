import Cache from '../cache';
import { getRequest } from './request_handler';
import { InstanaOptions } from '../types/instana_options';

const versionCache: Cache<number> = new Cache<number>();

/*
  Get version of current Instana backend and cache it for 10 minutes.
  This should be the ONLY way to retrieve any information about the Instana backend version.
 */
export default function getVersion(options: InstanaOptions) {
  let cachedVersion = versionCache.get('version');
  if (cachedVersion) {
    return Promise.resolve(cachedVersion);
  }

  return getRequest(options, '/api/instana/version').then(
    (result: any) => {
      if (result.data && result.data.imageTag) {
        const majorVersion = parseInt(result.data.imageTag.split('.', 2)[1], 10) || null;
        if (majorVersion) {
          versionCache.put(options.url, majorVersion, 600000);
        }
        return majorVersion;
      }
      return null;
    },
    (error: any) => {
      return null;
    }
  );
}
