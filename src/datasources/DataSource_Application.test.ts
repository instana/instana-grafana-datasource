import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';
import TimeFilter from '../types/time_filter';
import { DataSourceApplication } from './DataSource_Application';
import * as RequestHandler from '../util/request_handler';
import _ from 'lodash';
import Cache from '../cache';
import { SelectableValue } from '@grafana/data';

const options = buildInstanaOptions();
const axios = require('axios');

describe('Given an application datasource', () => {
  const dataSourceApplication: DataSourceApplication = new DataSourceApplication(options);
  const timeFilter: TimeFilter = buildTimeFilter();
  let paginateApplicationsSpy: any;
  let getRequestSpy: any;

  afterEach(() => {
    dataSourceApplication.applicationsCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceApplication.miscCache = new Cache<any>();
    paginateApplicationsSpy.mockReset();
    getRequestSpy.mockReset();
  });

  describe('and invoking functions only once', () => {
    paginateApplicationsSpy = jest.spyOn(dataSourceApplication, 'paginateApplications');
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

    it('should return applications as SelectableValues', () => {
      return axios
        .get(
          options.url +
            '/api/application-monitoring/applications?windowSize' +
            timeFilter.windowSize +
            '&to=' +
            timeFilter.to,
          {
            headers: {
              Authorization: 'apiToken ' + options.apiToken,
            },
          }
        )
        .then((applications: any) => {
          paginateApplicationsSpy.mockResolvedValue(applications);
          getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
        });
    });

    it('should return application tag in the correct format', () => {
      return axios
        .get(options.url + '/api/application-monitoring/catalog/tags', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((tags: any) => {
          getRequestSpy.mockResolvedValue(tags);
          getApplicationTagsAndVerifyFormat(dataSourceApplication);
        });
    });
  });

  describe('and invoking functions multiple times', () => {
    paginateApplicationsSpy = jest.spyOn(dataSourceApplication, 'paginateApplications');
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

    it('should return applications as SelectableValues', () => {
      return axios
        .get(
          options.url +
            '/api/application-monitoring/applications?windowSize' +
            timeFilter.windowSize +
            '&to=' +
            timeFilter.to,
          {
            headers: {
              Authorization: 'apiToken ' + options.apiToken,
            },
          }
        )
        .then((applications: any) => {
          paginateApplicationsSpy.mockResolvedValue(applications);
          getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
          getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
          expect(paginateApplicationsSpy).toHaveBeenCalledTimes(1);
        });
    });

    it('should cache application tags', () => {
      return axios
        .get(options.url + '/api/application-monitoring/catalog/tags', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((tags: any) => {
          getRequestSpy.mockResolvedValue(tags);
          getApplicationTagsAndVerifyFormat(dataSourceApplication);
          getApplicationTagsAndVerifyFormat(dataSourceApplication);
          return expect(getRequestSpy).toHaveBeenCalledTimes(1);
        });
    });
  });

  function getApplicationsAndVerifyFormat(dataSourceApplication: DataSourceApplication, timeFilter: TimeFilter) {
    return dataSourceApplication.getApplications(timeFilter).then((apps) => {
      _.map(apps, (app) => {
        expect(app).toHaveProperty('key');
        expect(app).toHaveProperty('label');
      });
    });
  }

  function getApplicationTagsAndVerifyFormat(dataSourceApplication: DataSourceApplication) {
    return dataSourceApplication.getApplicationTags().then((appTags: any) => {
      _.map(appTags, (tag) => {
        expect(tag).toHaveProperty('key');
        expect(tag).toHaveProperty('label');
        expect(tag).toHaveProperty('type');
        expect(tag).toHaveProperty('canApplyToSource');
        expect(tag).toHaveProperty('canApplyToDestination');
      });
    });
  }
});
