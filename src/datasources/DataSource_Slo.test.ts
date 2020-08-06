import TimeFilter from '../types/time_filter';
import { buildInstanaOptions, buildTestTarget } from '../util/test_util';
import { DataSourceSlo } from './DataSource_Slo';
import { InstanaOptions } from '../types/instana_options';
import * as RequestHandler from '../util/request_handler';
import { InstanaQuery } from '../types/instana_query';

const options: InstanaOptions = buildInstanaOptions();

describe('Given an sli datasource', () => {
  const dataSourceSlo: DataSourceSlo = new DataSourceSlo(options);
  let getRequestSpy: any;
  const timeFilter: TimeFilter = {
    to: 1516472658604,
    from: 1516451043603,
    windowSize: 21615001,
  };

  describe('When retrieving SLO information', () => {
    const definedSli = [
      {
        id: '1',
        sliName: 'Slo 1',
        initialEvaluationTimestamp: 1585046123732,
        metricName: 'latency',
        metricAggregation: 'P95',
        threshold: 150,
        applicationId: 'PYmAf835TSKdhR6Nm4gFMQ',
        serviceId: null,
        endpointId: null,
        lastUpdated: 1585066443732,
      },
      {
        id: '2',
        sliName: 'Slo 2',
        initialEvaluationTimestamp: 1585046123732,
        metricName: 'latency',
        metricAggregation: 'P95',
        threshold: 150,
        applicationId: 'PYmAf835TSKdhR6Nm4gFMR',
        serviceId: null,
        endpointId: null,
        lastUpdated: 1585066443732,
      },
      {
        id: '3',
        sliName: 'Slo 3',
        initialEvaluationTimestamp: 1585046123732,
        metricName: 'latency',
        metricAggregation: 'P95',
        threshold: 150,
        applicationId: 'PYmAf835TSKdhR6Nm4gFMS',
        serviceId: null,
        endpointId: null,
        lastUpdated: 1585066443732,
      },
    ];

    const sliReportResponse = {
      data: {
        sli: 1.0,
        slo: 0.8,
        errorBudgetRemaining: 72,
        fromTimestamp: 1587029766000,
        toTimestamp: 1587051366000,
        violationDistribution: {
          '0': 1,
          '1': 1,
          '2': 1,
          '3': 1,
          '4': 1,
          '5': 1,
          '6': 1,
          '7': 1,
          '8': 1,
          '9': 0,
          '10': 0,
          '11': 0,
          '12': 0,
          '13': 0,
          '14': 0,
          '15': 0,
          '16': 0,
          '17': 0,
          '18': 0,
          '19': 0,
          '20': 0,
          '21': 0,
          '22': 0,
          '23': 0,
          '24': 0,
          '25': 0,
          '26': 0,
          '27': 0,
          '28': 0,
          '29': 0,
          '30': 0,
          '31': 0,
          '32': 1,
          '33': 1,
          '34': 1,
          '35': 1,
          '36': 1,
          '37': 1,
          '38': 1,
          '39': 1,
          '40': 1,
          '41': 1,
          '42': 1,
          '43': 1,
          '44': 1,
          '45': 1,
          '46': 1,
          '47': 1,
          '48': 1,
          '49': 1,
          '50': 1,
          '51': 1,
          '52': 1,
          '53': 1,
          '54': 1,
          '55': 1,
          '56': 1,
          '57': 1,
          '58': 1,
          '59': 1,
          '60': 1,
          '61': 1,
          '62': 1,
          '63': 1,
          '64': 1,
          '65': 1,
          '66': 1,
          '67': 1,
          '68': 1,
          '69': 1,
          '70': 1,
          '71': 1,
          '72': 1,
          '73': 1,
          '74': 1,
          '75': 1,
          '76': 1,
          '77': 0,
          '78': 0,
          '79': -1,
          '80': -1,
          '81': -1,
          '82': -1,
          '83': -1,
          '84': -1,
          '85': -1,
          '86': -1,
          '87': -1,
          '88': -1,
          '89': -1,
          '90': -1,
          '91': -1,
          '92': -1,
          '93': -1,
          '94': 0,
          '95': 0,
          '96': 0,
          '97': 0,
          '98': 0,
          '99': 0,
          '100': 0,
        },
      },
    };

    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
      switch (endpoint) {
        case '/api/datasources/proxy/1/instana/api/settings/sli':
          return Promise.resolve(definedSli);
        case '/api/sli/report/2?from=1516451043603&to=1516472658604&slo=0.8':
          return Promise.resolve(sliReportResponse);
        default:
          throw new Error('Unexpected call URL: ' + endpoint);
      }
    });

    it('should return only one value for sli', () => {
      const target: InstanaQuery = buildTestTarget();
      target.sloReport = { key: '2', label: 'Some Random SloReport' };
      target.sloSpecific = { key: 'SLI', label: 'SLI' };
      target.sloValue = '0.8';
      return dataSourceSlo.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(1);
        expect(results[0].target).toBe('SLI');
        expect(results[0].datapoints.length).toBe(1);
        expect(results[0].datapoints[0][0]).toBe(1.0);
      });
    });

    it('should return only one value for remaining error budget', () => {
      const target: InstanaQuery = buildTestTarget();
      target.sloReport = { key: '2', label: 'Some Random SloReport' };
      target.sloSpecific = { key: 'Remaining Error Budget', label: 'Remaining Error Budget' };
      target.sloValue = '0.8';
      return dataSourceSlo.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(1);
        expect(results[0].target).toBe('Remaining Error Budget');
        expect(results[0].datapoints.length).toBe(1);
        expect(results[0].datapoints[0][0]).toBe(72);
      });
    });

    it('should return three result targets with only datapoint values of 1', () => {
      const target: InstanaQuery = buildTestTarget();
      target.sloReport = { key: '2', label: 'Some Random SloReport' };
      target.sloSpecific = { key: 'Timeseries', label: 'Timeseries' };
      target.sloValue = '0.8';
      return dataSourceSlo.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(3);
        expect(results[0].target).toBe('No violation');
        expect(results[1].target).toBe('Violation');
        expect(results[2].target).toBe('No data');

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < results[i].datapoints.length; j++) {
            expect(results[i].datapoints[j][0]).toBe(1);
          }
        }
      });
    });
  });
});
