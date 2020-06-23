import { buildInstanaOptions } from '../util/test_util';
import { DataSourceWebsite } from './DataSource_Website';
import * as RequestHandler from '../util/request_handler';
import _ from 'lodash';

const options = buildInstanaOptions();
const axios = require('axios');

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

describe('Given a website datasource', () => {
  const dataSourceWebsite: DataSourceWebsite = new DataSourceWebsite(options);

  describe('when fetching website tags', () => {
    let getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation(() => {
      return axios.get(options.url + '/api/website-monitoring/catalog/tags', {
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      });
    });

    it('should return tags as selectable values with a type', () => {
      return dataSourceWebsite.getWebsiteTags().then((result: any) => {
        _.map(result, (tag) => {
          expect(tag).toHaveProperty('key');
          expect(tag).toHaveProperty('label');
          expect(tag).toHaveProperty('type');
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
    let getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation(() => {
      return axios.get(options.url + '/api/website-monitoring/catalog/metrics', {
        headers: {
          Authorization: 'apiToken ' + options.apiToken,
        },
      });
    });

    it('should return the catalog as an array of selectable values with aggregations and beaconTypes', () => {
      return dataSourceWebsite.getWebsiteMetricsCatalog().then((catalog: any) => {
        return _.map(catalog, (metric) => {
          expect(metric).toHaveProperty('key');
          expect(metric).toHaveProperty('label');
          expect(metric).toHaveProperty('aggregations');
          expect(metric).toHaveProperty('beaconTypes');
        });
      });
    });
  });
  /*
  describe('when fetching website metrics catalog', () => {
    let postRequestSpy = jest.spyOn(RequestHandler, 'postRequest');
    const data: BeaconGroupBody = {
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
        data: data,
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
  }); */
});
