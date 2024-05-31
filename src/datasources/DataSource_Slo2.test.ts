import TimeFilter from '../types/time_filter';
import { buildInstanaOptions, buildTestTarget } from '../util/test_util';
import { DataSourceSlo2 } from './DataSource_Slo2';
import { InstanaOptions } from '../types/instana_options';
import * as RequestHandler from '../util/request_handler';
import { InstanaQuery } from '../types/instana_query';

const options: InstanaOptions = buildInstanaOptions();

describe('Given an slo datasource', () => {
  const dataSourceSlo2: DataSourceSlo2 = new DataSourceSlo2(options);
  let getRequestSpy: any;
  const timeFilter: TimeFilter = {
    to: 1716374766000,
    from: 1716353172000,
    windowSize: 21615001,
  };

  describe('When retrieving SLO information', () => {
    const definedSlo = {
      items: [
        {
          id: 'SLOY2KDCFExTvmsLyf4W067JQ',
          name: 'Stans test SLO 2',
          target: 0.99,
          createdDate: 1680182215442,
          lastUpdated: 1680182215442,
          entity: {
            type: 'application',
            applicationId: 'VTNvC_sATZqMj4vSZfsjKA',
            serviceId: null,
            endpointId: null,
            boundaryScope: 'INBOUND',
            includeInternal: false,
            includeSynthetic: false,
            tagFilterExpression: null,
          },
          indicator: {
            type: 'timeBased',
            threshold: 100.0,
            aggregation: 'P90',
            badEventsFilter: {
              type: 'TAG_FILTER',
              name: 'call.erroneous',
              stringValue: null,
              numberValue: null,
              booleanValue: true,
              key: null,
              value: null,
              operator: 'EQUALS',
              entity: 'NOT_APPLICABLE',
            },
            goodEventsFilter: {
              type: 'TAG_FILTER',
              name: 'call.erroneous',
              stringValue: null,
              numberValue: null,
              booleanValue: false,
              key: null,
              value: null,
              operator: 'EQUALS',
              entity: 'NOT_APPLICABLE',
            },
            blueprint: 'latency',
          },
          timeWindow: {
            type: 'rolling',
            duration: 1,
            durationUnit: 'week',
          },
          tags: ['Stan', 'testing'],
        },
        {
          id: 'SLO4w2m8_hbQXuo7r5V0u62Dw',
          name: 'Time-Based Availability SLO with Rolling Time Window',
          target: 0.99,
          createdDate: 1708529442488,
          lastUpdated: 1708529442488,
          entity: {
            type: 'application',
            applicationId: 'acfRC1IqTVi41OMLAJU4Cw',
            serviceId: null,
            endpointId: null,
            boundaryScope: 'ALL',
            includeInternal: false,
            includeSynthetic: false,
            tagFilterExpression: {
              type: 'EXPRESSION',
              logicalOperator: 'AND',
              elements: [],
            },
          },
          indicator: {
            type: 'timeBased',
            threshold: 1.0,
            aggregation: 'MEAN',
            badEventsFilter: {
              type: 'TAG_FILTER',
              name: 'call.erroneous',
              stringValue: null,
              numberValue: null,
              booleanValue: true,
              key: null,
              value: null,
              operator: 'EQUALS',
              entity: 'NOT_APPLICABLE',
            },
            goodEventsFilter: {
              type: 'TAG_FILTER',
              name: 'call.erroneous',
              stringValue: null,
              numberValue: null,
              booleanValue: false,
              key: null,
              value: null,
              operator: 'EQUALS',
              entity: 'NOT_APPLICABLE',
            },
            blueprint: 'availability',
          },
          timeWindow: {
            type: 'rolling',
            duration: 1,
            durationUnit: 'week',
          },
          tags: ['test', 'timeBased', 'availability', 'rolling', 'andre'],
        },
      ],
    };

    const sloReportResponse = {
      data: {
        sli: 1.0,
        slo: 0.99,
        totalErrorBudget: 101,
        errorBudgetRemaining: 101,
        errorBudgetSpent: 0,
        fromTimestamp: 1715769966000,
        toTimestamp: 1716374766000,
        violationDistribution: {
          '0': 0,
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
        },
        errorChart: {
          '0': 0,
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
        },
        errorAccumulationChart: {
          '0': 0,
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
        },
        errorBudgetRemainChart: {
          '0': 101,
          '1': 101,
          '2': 101,
          '3': 101,
          '4': 101,
          '5': 101,
        },
      },
    };

    getRequestSpy = jest.spyOn(RequestHandler, 'getRequest');
    getRequestSpy.mockImplementation((instanaOptions: InstanaOptions, endpoint: string) => {
      switch (endpoint) {
        case '/api/datasources/proxy/uid/fdlrkcgk8td6oa/instana/api/settings/slo':
          return Promise.resolve(definedSlo);
        case '/api/slo/report/SLOY2KDCFExTvmsLyf4W067JQ?from=1716353172000&to=1716374766000':
          return Promise.resolve(sloReportResponse);
        default:
          throw new Error('Unexpected call URL: ' + endpoint);
      }
    });

    it('should return only one value for sli', () => {
      const target: InstanaQuery = buildTestTarget();
      target.slo2Report = { key: 'SLOY2KDCFExTvmsLyf4W067JQ', label: 'Stans test SLO 2' };
      target.slo2Specific = { key: 'Status', label: 'Status' };
      return dataSourceSlo2.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(1);
        expect(results[0].target).toBe('Status');
        expect(results[0].datapoints.length).toBe(1);
        expect(results[0].datapoints[0][0]).toBe(1.0);
      });
    });
    it('should return only five value for remaining error budget chart', () => {
      const target: InstanaQuery = buildTestTarget();
      target.slo2Report = { key: 'SLOY2KDCFExTvmsLyf4W067JQ', label: 'Stans test SLO 2' };
      target.slo2Specific = { key: 'Error Budget Remain Chart', label: 'Error Budget Remain Chart' };
      return dataSourceSlo2.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(1);
        expect(results[0].target).toBe('Error Budget Remain Chart');
        expect(results[0].datapoints.length).toBe(6);
        expect(results[0].datapoints[0][0]).toBe(101);
      });
    });
    it('should return only one value for remaining error budget', () => {
      const target: InstanaQuery = buildTestTarget();
      target.slo2Report = { key: 'SLOY2KDCFExTvmsLyf4W067JQ', label: 'Stans test SLO 2' };
      target.slo2Specific = { key: 'Remaining Error Budget', label: 'Remaining Error Budget' };
      return dataSourceSlo2.runQuery(target, timeFilter).then((results: any) => {
        expect(results.length).toBe(1);
        expect(results[0].target).toBe('Remaining Error Budget');
        expect(results[0].datapoints.length).toBe(1);
        expect(results[0].datapoints[0][0]).toBe(101);
      });
    });

    it('should return three result targets with only datapoint values of 1', () => {
      const target: InstanaQuery = buildTestTarget();
      target.slo2Report = { key: 'SLOY2KDCFExTvmsLyf4W067JQ', label: 'Stans test SLO 2' };
      target.slo2Specific = { key: 'Timeseries', label: 'Timeseries' };
      return dataSourceSlo2.runQuery(target, timeFilter).then((results: any) => {
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