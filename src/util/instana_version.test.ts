import * as RequestHandler from './request_handler';
import { buildInstanaOptions } from './test_util';
import getVersion from './instana_version';

describe('when retrieving the version of instana', () => {

  const options = buildInstanaOptions();
  const axios = require('axios');

  it('should return correct format and cache the version', () => {
    let getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation((instanaOptions, endpoint) => {
      return axios.get(instanaOptions.url + endpoint, {
        headers: {
          Authorization: 'apiToken ' + options.apiToken
        }
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
