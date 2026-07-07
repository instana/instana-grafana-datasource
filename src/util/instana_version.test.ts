import { buildInstanaOptions } from './test_util';
import getVersion from './instana_version';

jest.mock('./request_handler');
import * as RequestHandler from './request_handler';

describe('when retrieving the version of instana', () => {
  const options = buildInstanaOptions();
  const axios = require('axios');
  const getRequestSpy = RequestHandler.getRequest as jest.MockedFunction<typeof RequestHandler.getRequest>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct format and cache the version', () => {
    getRequestSpy.mockImplementation((instanaOptions: any, endpoint: any) => {
      return axios.get(instanaOptions.url + endpoint, {
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      });
    });

    getVersion(options).then((version: any) => {
      expect(version).toBeInstanceOf(Number);
    });

    //verify version cached
    getVersion(options).then((version: any) => {
      expect(version).toBeInstanceOf(Number);
      expect(getRequestSpy).toBeCalledTimes(1);
    });
  });
});
