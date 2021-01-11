import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';
import * as RequestHandler from '../util/request_handler';
import { DataSourceWebsite } from './DataSource_Website';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';

const options = buildInstanaOptions();

describe('Given a website datasource', () => {
  const dataSourceWebsite: DataSourceWebsite = new DataSourceWebsite(options);
  let getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

  afterEach(() => {
    getRequestSpy.mockReset();
  });

  describe('when fetching website tags', () => {
    it('should return tags as selectable values with a type', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'name',
            type: 'type',
            category: 'category',
          },
        ],
      });

      return dataSourceWebsite.getWebsiteTags().then((result: any) => {
        _.map(result, (tag) => {
          expect(tag).toHaveProperty('key');
          expect(tag).toHaveProperty('label');
          expect(tag).toHaveProperty('type');
        });
      });
    });
  });

  describe('when fetching website metrics catalog', () => {
    it('should return the catalog as an array of selectable values with aggregations and beaconTypes', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            metricId: 'metricId',
            label: 'label',
            aggregations: ['MEAN', 'SUM'],
            beaconTypes: ['pageLoad', 'resourceLoad', 'httpRequest', 'error', 'custom', 'pageChange'],
          },
        ],
      });

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

  describe('when fetching configured websites', () => {
    const timeFilter: TimeFilter = buildTimeFilter();

    it('should cache websites and return as selectable values', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'myWebsiteConfig',
          },
        ],
      });

      return dataSourceWebsite.getWebsites(timeFilter).then(() => {
        return dataSourceWebsite.getWebsites(timeFilter).then((result) => {
          expect(getRequestSpy).toBeCalledTimes(1);
          _.map(result, (website) => {
            expect(website).toHaveProperty('key');
            expect(website).toHaveProperty('label');
          });
        });
      });
    });
  });
});
