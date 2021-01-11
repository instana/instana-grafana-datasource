import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';
import { DataSourceApplication } from './DataSource_Application';
import * as RequestHandler from '../util/request_handler';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import Cache from '../cache';
import _ from 'lodash';

const options = buildInstanaOptions();

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
      paginateApplicationsSpy.mockResolvedValue([
        {
          id: 'id',
          label: 'label',
          boundaryScope: 'ALL',
        },
      ]);

      getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
    });

    it('should return application tag in the correct format', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'testName',
            type: 'testType',
            canApplyToSource: true,
            canApplyToDestination: false,
          },
        ],
      });

      getApplicationTagsAndVerifyFormat(dataSourceApplication, timeFilter);
    });
  });

  describe('and fetch application tag catalog', () => {
    let catalogSpy = jest.spyOn(dataSourceApplication, 'getCatalog');
    // let deprecatedCatalogSpy = jest.spyOn(dataSourceApplication, 'getCatalogFromDeprecatedEndpoint');
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

    it('should retrieve new catalog when Instana version is at least 191', () => {
      const versionMock = jest.fn();
      versionMock.mockReturnValueOnce(191);
      jest.mock('../util/instana_version', () => {
        return 191;
      });
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'testName',
            type: 'testType',
            canApplyToSource: true,
            canApplyToDestination: false,
          },
        ],
      });

      dataSourceApplication.getCatalog(timeFilter);
      getApplicationTagsAndVerifyFormat(dataSourceApplication, timeFilter);
      expect(catalogSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('and invoking functions multiple times', () => {
    paginateApplicationsSpy = jest.spyOn(dataSourceApplication, 'paginateApplications');
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

    it('should return applications as SelectableValues and cache result', () => {
      paginateApplicationsSpy.mockResolvedValue([
        {
          id: 'id',
          label: 'label',
          boundaryScope: 'ALL',
        },
      ]);

      getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
      getApplicationsAndVerifyFormat(dataSourceApplication, timeFilter);
      expect(paginateApplicationsSpy).toHaveBeenCalledTimes(1);
    });

    it('should cache application tags', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'testName',
            type: 'testType',
            canApplyToSource: true,
            canApplyToDestination: false,
          },
        ],
      });
      getApplicationTagsAndVerifyFormat(dataSourceApplication, timeFilter);
      getApplicationTagsAndVerifyFormat(dataSourceApplication, timeFilter);
      return expect(getRequestSpy).toHaveBeenCalledTimes(2); // once for the version and once for the catalog
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

  function getApplicationTagsAndVerifyFormat(dataSourceApplication: DataSourceApplication, timeFilter: TimeFilter) {
    return dataSourceApplication.getApplicationTags(timeFilter).then((appTags: any) => {
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
