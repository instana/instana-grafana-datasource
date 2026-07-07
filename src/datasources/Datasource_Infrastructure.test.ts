import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceInfrastructure } from './Datasource_Infrastructure';
import { BUILT_IN_METRICS, CUSTOM_METRICS } from '../GlobalVariables';
import { atLeastGranularity, getWindowSize } from 'util/time_util';
import { InstanaOptions } from '../types/instana_options';
import { InstanaQuery } from '../types/instana_query';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import Cache from '../cache';
import _ from 'lodash';

jest.mock('../util/request_handler');
import * as RequestHandler from '../util/request_handler';

const options = buildInstanaOptions();
const axios = require('axios');
const getRequestSpy = RequestHandler.getRequest as jest.MockedFunction<typeof RequestHandler.getRequest>;
const postRequestSpy = RequestHandler.postRequest as jest.MockedFunction<typeof RequestHandler.postRequest>;

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Given an infrastructure datasource', () => {
  const dataSourceInfrastructure: DataSourceInfrastructure = new DataSourceInfrastructure(options, undefined);

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
    afterEach(() => {
      resetDataSource();
    });

    it('should return entity types in correct format', async () => {
      const types = [
        { plugin: 'plugin1', label: 'Plugin 1' },
        { plugin: 'plugin2', label: 'Plugin 2' },
      ];
      getRequestSpy.mockResolvedValue({ data: types });

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
      getRequestSpy.mockResolvedValue({ data: types });

      await dataSourceInfrastructure.getEntityTypes();
      await dataSourceInfrastructure.getEntityTypes();

      expect(getRequestSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when fetching metrics catalog', function () {
    let plugin: SelectableValue = { key: 'jvmRuntimePlatform', label: 'java' };
    

    afterEach(() => {
      resetDataSource();
      
    });

    it('should return builtin metrics in the correct format', async () => {
      let metricCategory: number = BUILT_IN_METRICS;
      const catalog = [
        { label: 'Plugin 1', metricId: 'metricId1', pluginId: 'pluginId1' },
        { label: 'Plugin 2', metricId: 'metricId2', pluginId: 'pluginId2' },
      ];
      // Using mocked getRequestSpy
      getRequestSpy.mockResolvedValue({ data: catalog });

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
      // Using mocked getRequestSpy
      getRequestSpy.mockResolvedValue({ data: catalog });

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
      // Using mocked getRequestSpy
      getRequestSpy.mockResolvedValue({ data: types });

      await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);
      await dataSourceInfrastructure.getMetricsCatalog(plugin, metricCategory);

      expect(getRequestSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when fetching snapshots for target', () => {
    
    
    const timeFilter: TimeFilter = buildTimeFilter();

    beforeEach(() => {
      // Using mocked getRequestSpy
      // Using mocked postRequestSpy
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    const target: InstanaQuery = buildTestTarget();
    const windowSize = getWindowSize(timeFilter);
    target.entityType = { key: 'someKey' };
    target.entityQuery = 'java';

    const snapshotA = { snapshotId: 'A', host: 'Stans-Macbook-Pro', label: 'label for A' };
    const snapshotB = { snapshotId: 'B', host: '', label: 'label for B' };
    const contexts = {
      status: 200,
      data: {
        items: [
          { snapshotId: 'A', host: 'Stans-Macbook-Pro' },
          { snapshotId: 'B', host: '' },
        ],
      },
    };
    const snapshotsResponse = {
      status: 200,
      data: {
        items: [snapshotA, snapshotB],
      },
    };

    beforeEach(() => {
      getRequestSpy.mockReset();
      postRequestSpy.mockReset();

      // Using mocked getRequestSpy
      // Using mocked postRequestSpy

      getRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
        if (
          endpoint ===
          `/api/infrastructure-monitoring/snapshots?plugin=${target.entityType.key}` +
            `&size=100` +
            `&windowSize=${atLeastGranularity(windowSize, target.timeInterval.key)}` +
            `&to=${timeFilter.to}&offline=${instanaOptions.showOffline}`
        ) {
          return Promise.resolve(contexts);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });

      postRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string, payload: any) => {
        if (endpoint === `/api/infrastructure-monitoring/snapshots` && payload.snapshotIds) {
          return Promise.resolve(snapshotsResponse);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });

    it('should return snapshots with response', async () => {
      const results = await dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);
      expect(results.length).toEqual(2);
      expect(results[0]).toEqual({
        snapshotId: 'A',
        host: 'Stans-Macbook-Pro',
        name: '',
        pid: '',
        response: expect.anything(),
      });
      expect(results[1]).toEqual({
        snapshotId: 'B',
        host: '',
        name: '',
        pid: '',
        response: expect.anything(),
      });
    });

    it('should cache snapshots with response', async () => {
      target.entityQuery = 'daljeet';
      await dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);
      await dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(postRequestSpy).toHaveBeenCalledTimes(1);
    });

    it('should use selectedEntity snapshot id for builtin/custom metrics', async () => {
      target.metricCategory = { key: BUILT_IN_METRICS, label: 'Built-in metrics' } as any;
      target.selectedEntity = { key: 'snapshot-123', label: 'Entity Name' } as any;
      target.entity = { key: 'crIRuntimePlatform', label: '.NET App' } as any;

      const results = await dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);

      expect(getRequestSpy).not.toHaveBeenCalled();
      expect(postRequestSpy).toHaveBeenCalledWith(
        dataSourceInfrastructure.instanaOptions,
        '/api/infrastructure-monitoring/snapshots',
        {
          snapshotIds: ['snapshot-123'],
          timeFrame: {
            to: timeFilter.to,
            windowSize: atLeastGranularity(windowSize, target.timeInterval.key),
          },
        }
      );
      expect(results.length).toEqual(2);
    });

    it('should not use entity type as snapshot id when selectedEntity is missing', async () => {
      target.metricCategory = { key: CUSTOM_METRICS, label: 'Custom metrics' } as any;
      target.selectedEntity = { key: null, label: 'Please specify' } as any;
      target.entity = { key: 'crIRuntimePlatform', label: '.NET App' } as any;
      target.entityQuery = 'missing-selected-entity';

      dataSourceInfrastructure.snapshotCache = new Cache<Promise<SelectableValue[]>>();

      await dataSourceInfrastructure.fetchSnapshotsForTarget(target, timeFilter);

      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(postRequestSpy).toHaveBeenCalledTimes(1);
      expect(postRequestSpy).not.toHaveBeenCalledWith(
        dataSourceInfrastructure.instanaOptions,
        '/api/infrastructure-monitoring/snapshots',
        expect.objectContaining({
          snapshotIds: ['crIRuntimePlatform'],
        })
      );
    });
  });

  describe('when fetching metrics for snapshots', () => {
    
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
      postRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string, payload: any) => {
        if (
          endpoint ===
          '/api/infrastructure-monitoring/metrics?offline=' + dataSourceInfrastructure.instanaOptions.showOffline
        ) {
          return Promise.resolve(data);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });
    it('should call postRequest with the correct parameters', () => {
      RequestHandler.postRequest(
        dataSourceInfrastructure.instanaOptions,
        '/api/infrastructure-monitoring/metrics?offline=' + dataSourceInfrastructure.instanaOptions.showOffline,
        () => {
          expect(postRequestSpy).toHaveBeenCalledTimes(1);
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
            '/api/infrastructure-monitoring/metrics?offline=' + dataSourceInfrastructure.instanaOptions.showOffline,
            expecteddata
          );
        }
      );
    });
  });

  describe('when fetching entities for infrastructure analyze', () => {
    
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
      postRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string, payload: any) => {
        if (endpoint === '/api/infrastructure-monitoring/analyze/entity-groups') {
          return Promise.resolve(response);
        }
        throw new Error('Unexpected call URL: ' + endpoint);
      });
    });

    it('should call postRequest with the correct parameters', async () => {
      expect(postRequestSpy).toHaveBeenCalledTimes(0);

      const windowSize = getWindowSize(timeFilter);
      let tagFilters: any[] = [];
      const metric: any = {
        metric: target.metric.key,
        aggregation: target.aggregation && target.aggregation.key ? target.aggregation.key : 'SUM',
        granularity: target.timeInterval.key,
        crossSeriesAggregation: 'DISTINCT_COUNT',
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
