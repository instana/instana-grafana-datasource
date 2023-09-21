import * as RequestHandler from '../util/request_handler';

import { buildInstanaOptions, buildTimeFilter } from '../util/test_util';

import { DataSourceMobileApp } from './DataSource_MobileApp';
import TimeFilter from '../types/time_filter';
import _ from 'lodash';

const options = buildInstanaOptions();

describe('Given a mobileapp datasource', () => {
  const dataSourceMobileApp: DataSourceMobileApp = new DataSourceMobileApp(options);
  let getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');

  afterEach(() => {
    getRequestSpy.mockReset();
  });

  describe('when fetching mobileapp tags', () => {
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

      return dataSourceMobileApp.getMobileappTags().then((result: any) => {
        _.map(result, (tag) => {
          expect(tag).toHaveProperty('key');
          expect(tag).toHaveProperty('label');
          expect(tag).toHaveProperty('type');
        });
      });
    });
  });

  describe('when fetching mobileapp metrics catalog', () => {
    it('should return the catalog as an array of selectable values with aggregations and beaconTypes', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            metricId: 'metricId',
            label: 'label',
            aggregations: ['MEAN', 'SUM'],
            beaconTypes: ['sessionStart', 'crash', 'httpRequest', 'custom', 'viewChange'],
          },
          {
            metricId: 'singleId',
            label: 'single',
            aggregations: ['MEAN'],
            beaconTypes: ['httpRequest'],
          },
          {
            metricId: 'noArrayId',
            label: 'noArrays',
          },
        ],
      });

      return dataSourceMobileApp.getMobileappMetricsCatalog().then((catalog: any) => {
        expect(catalog).toHaveLength(3);
        return _.map(catalog, (metric) => {
          expect(metric).toHaveProperty('key');
          expect(metric).toHaveProperty('label');
          expect(metric).toHaveProperty('aggregations');
          expect(metric).toHaveProperty('beaconTypes');
        });
      });
    });
  });

  describe('when fetching configured mobileapps', () => {
    const timeFilter: TimeFilter = buildTimeFilter();

    it('should cache mobileapps and return as selectable values', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'myMobileAppConfig',
          },
        ],
      });

      return dataSourceMobileApp.getMobileapp(timeFilter).then(() => {
        return dataSourceMobileApp.getMobileapp(timeFilter).then((result) => {
          expect(getRequestSpy).toBeCalledTimes(1);
          _.map(result, (mobileapp) => {
            expect(mobileapp).toHaveProperty('key');
            expect(mobileapp).toHaveProperty('label');
          });
        });
      });
    });
  });
});
