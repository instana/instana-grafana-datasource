import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import { BUILT_IN_METRICS, CUSTOM_METRICS } from '../GlobalVariables';
import * as RequestHandler from '../util/request_handler';
import { atLeastGranularity, getWindowSize } from 'util/time_util';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import Cache from '../cache';
import _ from 'lodash';

const options = buildInstanaOptions();
const axios = require('axios');
beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

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
      freeText = 'metric16,      metric09,        metric1997      ';
      const result = dataSourceInfrastructure.extractMetricsFromText(freeText);
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual({ key: 'metric16' });
      expect(result[1]).toEqual({ key: 'metric09' });
      expect(result[2]).toEqual({ key: 'metric1997' });
    });

    it('should return a maximum of four metrics', () => {
      freeText = 'metric01,metric02,metric03,metric04,metric05,metric06';
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

    it('should return entity types in correct format', async () => {
      const types = [
        { plugin: 'plugin1', label: 'Plugin 1' },
        { plugin: 'plugin2', label: 'Plugin 2' },
      ];
      pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
      pluginsSpy.mockResolvedValue({ data: types });

      const result = await dataSourceInfrastructure.getEntityTypes();

      result.forEach((et) => {
        expect(et).toHaveProperty('key');
        expect(et).toHaveProperty('label');
      });
    });

    it('should cache entityTypes', async () => {
      const types = [
        { plugin: 'plugin1', label: 'Plugin 1' },
        { plugin: 'plugin2', label: 'Plugin 2' },
      ];
      pluginsSpy = jest.spyOn(RequestHandler, 'getRequest');
      pluginsSpy.mockResolvedValue({ data: types });

      await dataSourceInfrastructure.getEntityTypes();
      await dataSourceInfrastructure.getEntityTypes();

      expect(pluginsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when fetching metrics catalog', function () {
    let plugin: SelectableValue = { key: 'jvmRuntimePlatform', label: 'java' };
    let catalogSpy: any;

    afterEach(() => {
      resetDataSource();
      catalogSpy.mockReset();
    });

    it('should return builtin metrics in the correct format', async () => {
      let metricCategory: number = BUILT_IN_METRICS;
      const catalog = [
        { label: 'Plugin 1', metricId: 'metricId1', pluginId: 'pluginId1' },
        { label: 'Plugin 2', metricId: 'metricId2', pluginId: 'pluginId2' },
      ];
      catalogSpy = jest.spyOn(RequestHandler, 'getRequest');
      catalogSpy.mockResolvedValue({ data: catalog });

      const result = await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);
      result.forEach((entry) => {
        expect(entry).toHaveProperty('key');
        expect(entry).toHaveProperty('label');
      });
    });

    it('should return custom metrics in the correct format', async () => {
      let metricCategory: number = CUSTOM_METRICS;
      const catalog = [
        { label: 'Plugin 1', metricId: 'metricId1', pluginId: 'pluginId1' },
        { label: 'Plugin 2', metricId: 'metricId2', pluginId: 'pluginId2' },
      ];
      catalogSpy = jest.spyOn(RequestHandler, 'getRequest');
      catalogSpy.mockResolvedValue({ data: catalog });

      const result = await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);
      result.forEach((entry) => {
        expect(entry).toHaveProperty('key');
        expect(entry).toHaveProperty('label');
      });
    });

    it('should cache entityTypes', async () => {
      let metricCategory: number = CUSTOM_METRICS || BUILT_IN_METRICS;
      const types = [
        { label: 'Plugin 1', metricId: 'metricId1', pluginId: 'pluginId1' },
        { label: 'Plugin 2', metricId: 'metricId2', pluginId: 'pluginId2' },
      ];
      catalogSpy = jest.spyOn(RequestHandler, 'getRequest');
      catalogSpy.mockResolvedValue({ data: types });

      await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);
      await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);

      expect(catalogSpy).toHaveBeenCalledTimes(1);
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
      data: {
        items: [
          {
            snapshotId: 'A',
            host: 'Stans-Macbook-Pro',
          },
          {
            snapshotId: 'B',
            host: '',
          },
        ],
      },
    };

    beforeEach(() => {
      contextSpy.mockReset();
      contextSpy = jest.spyOn(RequestHandler, 'getRequest');
      contextSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
        if (
          endpoint ===
          '/api/infrastructure-monitoring/snapshots?plugin=' +
            target.entityType.key +
            '&size=100&query=' +
            target.entityQuery +
            '&from=' +
            timeFilter.from +
            '&to=' +
            timeFilter.to
        ) {
          return Promise.resolve(contexts);
        }
        if (
          endpoint ===
          'api/infrastructure-monitoring/snapshots?plugin=netCoreRuntimePlatform&size=100&query=host&from=' +
            timeFilter.from +
            '&to=' +
            timeFilter.to
        ) {
          return Promise.resolve(contexts);
        } else if (
          endpoint ===
          '/api/infrastructure-monitoring/snapshots/A?from=' + timeFilter.from + '&to=' + timeFilter.to
        ) {
          return Promise.resolve(snapshotA);
        } else if (
          endpoint ===
          '/api/infrastructure-monitoring/snapshots/B?from=' + timeFilter.from + '&to=' + timeFilter.to
        ) {
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

  describe('when fetching metrics for snapshots', () => {
    let metricSpy: any = jest.spyOn(RequestHandler, 'postRequest');
    const timeFilter: TimeFilter = buildTimeFilter();
    const target: InstanaQuery = buildTestTarget();
    const metricA = { status: 200, data: { label: 'label for A' } };
    const metricB = { status: 200, data: { label: 'label for B' } };
    const snapshotIds = ['snapshotId1', 'snapshotId2'];
    const data = {
      status: 200,
      items: [
        {
          metrics: metricA,
          plugin: 'zCics',
          snapshotIds,
        },
        {
          metrics: metricB,
          plugin: 'zdb2',
          snapshotIds,
        },
      ],
    };
    beforeEach(() => {
      metricSpy.mockReset();
      metricSpy = jest.spyOn(RequestHandler, 'postRequest');
      metricSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
        if (endpoint === '/api/infrastructure-monitoring/metrics') {
          return Promise.resolve(data);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });
    it('should call postRequest with the correct parameters', () => {
      RequestHandler.postRequest(
        dataSourceInfrastructure.instanaOptions,
        '/api/infrastructure-monitoring/metrics',
        () => {
          expect(metricSpy).toHaveBeenCalledTimes(1);
          const windowSize = getWindowSize(timeFilter);
          const expecteddata = {
            metrics: [metricA],
            query: target.entityQuery,
            plugin: target.entityType.key,
            rollup: target.timeInterval.key,
            snapshotIds,
            timeFrame: {
              to: timeFilter.to,
              windowSize: atLeastGranularity(windowSize, target.timeInterval.key),
            },
          };
          dataSourceInfrastructure.fetchMetricsForSnapshot(target, snapshotIds, timeFilter, data);
          expect(RequestHandler.postRequest).toHaveBeenCalledWith(
            dataSourceInfrastructure.instanaOptions,
            '/api/infrastructure-monitoring/metrics',
            expecteddata
          );
        }
      );
    });
  });

  describe('when fetching entities for infrastructure analyze', () => {
    let metricSpy: any = jest.spyOn(RequestHandler, 'postRequest');
    const timeFilter: TimeFilter = buildTimeFilter();
    const target: InstanaQuery = buildTestTarget();
    const response = {
      status: 200,
      data: {
        items: [
          {
            tags: {},
            count: 1,
            metrics: {
              'gc.Copy.inv.MAX.60000': [
                [1701878640000, 7.0],
                [1701878700000, 4.0],
              ],
            },
          },
          {
            tags: {},
            count: 1,
            metrics: {},
          },
        ],
      },
    };

    beforeEach(() => {
      metricSpy.mockReset();
      metricSpy = jest.spyOn(RequestHandler, 'postRequest');
      metricSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
        if (endpoint === '/api/infrastructure-monitoring/analyze/entity-groups') {
          return Promise.resolve(response);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });

    it('should call postRequest with the correct parameters', async () => {
      expect(metricSpy).toHaveBeenCalledTimes(0);

      const windowSize = getWindowSize(timeFilter);
      let tagFilters: any[] = [];
      const metric: any = {
        metric: target.metric.key,
        aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
        granularity: target.timeInterval.key,
      };
      const payload = {
        tagFilterExpression: {
          elements: tagFilters,
          type: 'EXPRESSION',
          logicalOperator: 'AND',
        },
        pagination: {
          retrievalSize: 200,
        },
        groupBy: [target.groupbyTagSecondLevelKey],
        type: target.entity.key,
        metrics: [metric],
        timeFrame: {
          to: timeFilter.to,
          windowSize: atLeastGranularity(windowSize, metric.granularity),
        },
      };

      await dataSourceInfrastructure.fetchAnalyzeEntities(target, timeFilter);
      expect(RequestHandler.postRequest).toHaveBeenCalledWith(
        dataSourceInfrastructure.instanaOptions,
        '/api/infrastructure-monitoring/analyze/entity-groups',
        payload
      );
    });
  });

  function resetDataSource() {
    dataSourceInfrastructure.snapshotCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.snapshotInfoCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.catalogCache = new Cache<Promise<SelectableValue[]>>();
    dataSourceInfrastructure.typeCache = new Cache<Promise<SelectableValue[]>>();
  }
});
