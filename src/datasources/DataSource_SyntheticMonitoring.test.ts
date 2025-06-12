import { DataSourceSyntheticMonitoring } from './DataSource_SyntheticMonitoring';
import * as RequestHandler from '../util/request_handler';
import { InstanaOptions } from '../types/instana_options';
import { buildInstanaOptions } from '../util/test_util';
import TimeFilter from '../types/time_filter';
import { InstanaQuery } from '../types/instana_query';
import { emptyResultData } from '../util/target_util';

jest.mock('../util/request_handler');

const options: InstanaOptions = buildInstanaOptions();
const timeFilter: TimeFilter = {
  from: 1716353172000,
  to: 1716374766000,
  windowSize: 21615000,
};

describe('DataSourceSyntheticMonitoring', () => {
  let dataSource: DataSourceSyntheticMonitoring;

  beforeEach(() => {
    dataSource = new DataSourceSyntheticMonitoring(options);

    dataSource.fetchMetricsForSyntheticMonitoring = jest.fn();
    dataSource.fetchResultsForSyntheticMonitoring = jest.fn();

    jest.clearAllMocks();

    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should return metric-based results from synthetic monitoring', async () => {
    const mockResponse = {
      data: {
        testResult: [
          {
            testName: 'TestA',
            locationId: ['loc1'],
            metrics: [{ responseTime: 250 }],
          },
        ],
      },
    };

    (dataSource.fetchMetricsForSyntheticMonitoring as jest.Mock).mockResolvedValue(mockResponse);

    const target: InstanaQuery = {
      refId: 'A',
      testType: { value: 'metric' },
      entity: { value: 'someEntity' },
      metric: { key: 'responseTime' },
      stableHash: 'hash1',
    } as any;

    const result = await dataSource.runQuery(target, timeFilter);

    expect(result).toHaveLength(1);
    expect(result[0].target).toBe('TestA (loc1) - responseTime');
  });

  it('should return result-based synthetic monitoring results', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            testResultCommonProperties: {
              testName: 'TestB',
              locationDisplayLabel: 'loc2',
            },
            metrics: {
              availability: [[1716353172000, 98.0]],
            },
          },
        ],
      },
    };

    (dataSource.fetchResultsForSyntheticMonitoring as jest.Mock).mockResolvedValue(mockResponse);

    const target: InstanaQuery = {
      refId: 'B',
      testType: { value: 'result' },
      entity: { value: 'anotherEntity' },
      stableHash: 'hash2',
    } as any;

    const result = await dataSource.runQuery(target, timeFilter);

    expect(result).toHaveLength(1);
    expect(result[0].target).toBe('TestB (loc2) - availability');
    expect(result[0].datapoints[0][0]).toBe(98.0);
  });

  it('should return empty data when metric is missing', async () => {
    const target: InstanaQuery = {
      refId: 'C',
      testType: { value: 'metric' },
      entity: { value: 'someEntity' },
    } as any;

    const result = await dataSource.runQuery(target, timeFilter);
    expect(result).toEqual(emptyResultData('C'));
  });

  it('should return empty data when entity is missing', async () => {
    const target: InstanaQuery = {
      refId: 'D',
      testType: { value: 'metric' },
      metric: { key: 'responseTime' },
    } as any;

    const result = await dataSource.runQuery(target, timeFilter);
    expect(result).toEqual(emptyResultData('D'));
  });

  it('should fetch synthetic monitoring tests and cache them', async () => {
    const testList = [
      { id: 't1', label: 'Test 1' },
      { id: 't2', label: 'Test 2' },
    ];

    (RequestHandler.getRequest as jest.Mock).mockResolvedValue({ data: testList });

    const result = await dataSource.getSyntheticMonitoringtests();

    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('Test 1');

    const cachedResult = await dataSource.getSyntheticMonitoringtests();
    expect(RequestHandler.getRequest).toHaveBeenCalledTimes(1);
    expect(cachedResult).toEqual(result);
  });
});
