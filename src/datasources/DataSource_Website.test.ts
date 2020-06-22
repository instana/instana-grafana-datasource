import TimeFilter from '../types/time_filter';
import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';
import { DataSourceWebsite } from './DataSource_Website';
import * as RequestHandler from '../util/request_handler';
import BeaconGroupBody from '../types/beacon_group_body';
import _ from 'lodash';

const options = buildInstanaOptions();
const axios = require('axios');

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

describe('Given a website datasource', () => {
  const dataSourceWebsite: DataSourceWebsite = new DataSourceWebsite(options);
  const timeFilter: TimeFilter = buildTimeFilter();
  let postRequestSpy: any;
  let getRequestSpy: any;

  afterEach(() => {
    postRequestSpy.mockReset();
    getRequestSpy.mockReset();
  });

  describe('when fetching websites', () => {
    postRequestSpy = jest.spyOn(RequestHandler, 'postRequest');
    const beaconGroupBody: BeaconGroupBody = {
      group: {
        groupbyTag: 'beacon.website.name',
      },
      timeFrame: {
        to: timeFilter.to,
        windowSize: timeFilter.windowSize,
      },
      type: 'PAGELOAD',
      metrics: [
        {
          metric: 'pageLoads',
          aggregation: 'SUM',
        },
      ],
      order: {
        by: 'pageLoads',
        direction: 'desc',
      },
      pagination: {
        ingestionTime: 0,
        offset: 0,
        retrievalSize: 200,
      },
    };

    postRequestSpy.mockImplementation(() => {
      return axios.post(options.url + '/api/website-monitoring/analyze/beacon-groups', {
        data: beaconGroupBody,
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      });
    });

    it('should return websites as selectable values', () => {
      return dataSourceWebsite.getWebsites(timeFilter).then((result) => {
        _.map(result, (website) => {
          expect(website).toHaveProperty('key');
          expect(website).toHaveProperty('label');
        });
      });
    });

    it('should cache websites', () => {
      return dataSourceWebsite.getWebsites(timeFilter).then(() => {
        return dataSourceWebsite.getWebsites(timeFilter).then(() => {
          expect(postRequestSpy).toBeCalledTimes(1);
        });
      });
    });
  });

  describe('when fetching website tags', () => {
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation(() => {
      return axios.get(options.url + '/api/website-monitoring/catalog/tags', {
        headers: {
          Authorization: 'apiToken' + options.apiToken,
        },
      });
    });

    it('should return tags as selectable values', () => {
      return dataSourceWebsite.getWebsiteTags().then((result: any) => {
        _.map(result, (tag) => {
          expect(tag).toHaveProperty('key');
          expect(tag).toHaveProperty('label');
        });
      });
    });

    it('should cache website tags', () => {
      return dataSourceWebsite.getWebsiteTags().then(() => {
        return dataSourceWebsite.getWebsiteTags().then(() => {
          expect(getRequestSpy).toBeCalledTimes(1);
        });
      });
    });
  });

  describe('when fetching website metrics catalog', () => {
    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation(() => {
      return axios.get(options.url + '/api/website-monitoring/catalog/metrics', {
        headers: {
          Authorization: 'apiToken' + options.apiToken,
        },
      });
    });

    it('should return the catalog in the correct format', () => {
      return dataSourceWebsite.getWebsiteTags().then((catalog: any) => {
        return _.map(catalog, (metric) => {
          expect(metric).toHaveProperty('key');
          expect(metric).toHaveProperty('label');
          expect(metric).toHaveProperty('aggregations');
          expect(metric).toHaveProperty('beaconTypes');
        });
      });
    });
  });
});
