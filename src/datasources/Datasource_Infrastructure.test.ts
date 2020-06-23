import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import * as RequestHandler from '../util/request_handler';
import _ from 'lodash';
import { SelectableValue } from '@grafana/data';
import { BUILT_IN_METRICS, CUSTOM_METRICS } from '../GlobalVariables';
import TimeFilter from '../types/time_filter';
import { InstanaQuery } from '../types/instana_query';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';

const options = buildInstanaOptions();
const axios = require('axios');

describe('Given an infrastructure datasource', () => {
  const dataSourceInfrastructure: DataSourceInfrastructure = new DataSourceInfrastructure(options);

  describe('with free text metrics', () => {
    let freeText = '';

    it('should return metric in a string array', () => {
      freeText = 'metric1,metric2,metric3,metric4';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(4);
      expect(result[0]).toEqual({ key: 'metric1' });
      expect(result[1]).toEqual({ key: 'metric2' });
      expect(result[2]).toEqual({ key: 'metric3' });
      expect(result[3]).toEqual({ key: 'metric4' });
    });

    it('should ignore white spaces and return result as a string array', () => {
      freeText = 'metric16,      metric09,        metric1997';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual({ key: 'metric16' });
      expect(result[1]).toEqual({ key: 'metric09' });
      expect(result[2]).toEqual({ key: 'metric1997' });
    });

    it('should return a maximum of four metrics', () => {
      freeText = 'metric01,metric02,  metric03,      metric04,metric05,metric06';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(4);
      expect(result[0]).toEqual({ key: 'metric01' });
      expect(result[1]).toEqual({ key: 'metric02' });
      expect(result[2]).toEqual({ key: 'metric03' });
      expect(result[3]).toEqual({ key: 'metric04' });
    });
  });

  describe('when fetching entity types', () => {
    let pluginsSpy: any;

    afterEach(() => {
      resetDataSource();
      pluginsSpy.mockReset();
    });

    it('should return entity types in correct format', () => {
      return axios
        .get(options.url + '/api/infrastructure-monitoring/catalog/plugins', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((types: any) => {
          pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
          pluginsSpy.mockResolvedValue(types);

          let result = dataSourceInfrastructure.getEntityTypes();
          _.map(result, (et) => {
            expect(et).toHaveProperty('key');
            expect(et).toHaveProperty('label');
          });
        });
    });

    it('should cache entityTypes', () => {
      return axios
        .get(options.url + '/api/infrastructure-monitoring/catalog/plugins', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((types: any) => {
          pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
          pluginsSpy.mockResolvedValue(types);

          dataSourceInfrastructure.getEntityTypes();
          dataSourceInfrastructure.getEntityTypes();
          expect(pluginsSpy).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('when fetching metrics catalog', function () {
    let plugin: SelectableValue = { key: 'jvmRuntimePlatform', label: 'java' };
    let catalogSpy: any;

    afterEach(() => {
      resetDataSource();
      catalogSpy.mockReset();
    });

    function mockCatalogResponseAndVerify(catalog: any, metricCategory: number) {
      catalogSpy = jest.spyOn(RequestHandler, 'getRequest');
      catalogSpy.mockResolvedValue(catalog);

      dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory).then((result) => {
        _.map(result, (entry) => {
          expect(entry).toHaveProperty('key');
          expect(entry).toHaveProperty('label');
          expect(entry).toHaveProperty('aggregations');
          expect(entry.aggregations).toBeInstanceOf(Array);
          expect(entry).toHaveProperty('entityType');
        });
      });
    }

    it('should return builtin metrics in the correct format', () => {
      let metricCategory: number = BUILT_IN_METRICS;
      return axios
        .get(options.url + '/api/infrastructure-monitoring/catalog/metrics/jvmRuntimePlatform?filter=builtin', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((catalog: any) => {
          mockCatalogResponseAndVerify(catalog, metricCategory);
        });
    });

    it('should return custom metrics in the correct format', () => {
      let metricCategory: number = CUSTOM_METRICS;
      return axios
        .get(options.url + '/api/infrastructure-monitoring/catalog/metrics/jvmRuntimePlatform?filter=custom', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((catalog: any) => {
          mockCatalogResponseAndVerify(catalog, metricCategory);
        });
    });

    it('should return cache a catalog', () => {
      let metricCategory: number = CUSTOM_METRICS;
      return axios
        .get(options.url + '/api/infrastructure-monitoring/catalog/metrics/jvmRuntimePlatform?filter=custom', {
          headers: {
            Authorization: 'apiToken ' + options.apiToken,
          },
        })
        .then((catalog: any) => {
          mockCatalogResponseAndVerify(catalog, metricCategory);
          mockCatalogResponseAndVerify(catalog, metricCategory);
          expect(catalogSpy).toBeCalledTimes(1);
        });
    });
  });

  describe('when fetching snapshots for target', () => {
    let contextSpy: any = jest.spyOn(RequestHandler, 'getRequest');
    const timeFilter: TimeFilter = buildTimeFilter();
    const target: InstanaQuery = buildTestTarget();
    target.entityType = { key: 'someKey' };
    target.entityQuery = 'java';

    const snapshotA = { status: 200, data: { label: 'label for A' } };
    const snapshotB = { status: 200, data: { label: 'label for B' } };
    const contexts = {
      status: 200,
      data: [
        {
          snapshotId: 'A',
          host: 'Stans-Macbook-Pro',
        },
        {
          snapshotId: 'B',
          host: '',
        },
      ],
    };

    beforeEach(() => {
      contextSpy.mockReset();
      contextSpy = jest.spyOn(RequestHandler, 'getRequest');
      contextSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
        if (endpoint === '/api/snapshots/context?q=java%20AND%20entity.pluginId%3AsomeKey&from=' + timeFilter.from + '&to=' + timeFilter.to) {
          return Promise.resolve(contexts);
        }
        if (endpoint === '/api/snapshots/context?q=daljeet%20AND%20entity.pluginId%3AsomeKey&from=' + timeFilter.from + '&to=' + timeFilter.to) {
          return Promise.resolve(contexts);
        } else if (endpoint === '/api/snapshots/A?from=' + timeFilter.from + '&to=' + timeFilter.to) {
          return Promise.resolve(snapshotA);
        } else if (endpoint === '/api/snapshots/B?from=' + timeFilter.from + '&to=' + timeFilter.to) {
          return Promise.resolve(snapshotB);
        }

        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });

    it('should return snapshots with response', () => {
      dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter).then((results) => {
        expect(results.length).toEqual(2);
        expect(results[0]).toEqual({
          snapshotId: 'A',
          host: 'Stans-Macbook-Pro',
          response: { status: 200, data: { label: 'label for A' } },
        });
        expect(results[1]).toEqual({
          snapshotId: 'B',
          host: '',
          response: { status: 200, data: { label: 'label for B' } },
        });
      });
    });

    it('should cache snapshots with response', () => {
      target.entityQuery = 'daljeet';
      dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);
      dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter).then((results) => {
        expect(contextSpy).toHaveBeenCalledTimes(1);
        expect(results.length).toEqual(2);
        expect(results[0]).toEqual({
          snapshotId: 'A',
          host: 'Stans-Macbook-Pro',
          response: { status: 200, data: { label: 'label for A' } },
        });
        expect(results[1]).toEqual({
          snapshotId: 'B',
          host: '',
          response: { status: 200, data: { label: 'label for B' } },
        });
      });
    });
  });

  function resetDataSource() {
    dataSourceInfrastructure.snapshotCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.snapshotInfoCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.catalogCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.typeCache = new Cache<Promise<SelectableValue[]>>();
  }
});
