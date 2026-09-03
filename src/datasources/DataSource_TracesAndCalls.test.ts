import { buildInstanaOptions, buildTestTarget, buildTimeFilter } from '../util/test_util';
import { DataSourceTracesAndCalls } from './DataSource_TracesAndCalls';
import { emptyResultData } from '../util/target_util';
import { SelectableValue } from '@grafana/data';
import TimeFilter from '../types/time_filter';
import Cache from '../cache';
import _ from 'lodash';

jest.mock('../util/request_handler');
import * as RequestHandler from '../util/request_handler';

const options = buildInstanaOptions();

describe('Given a TracesAndCalls datasource', () => {
  let datasource: DataSourceTracesAndCalls;
  let timeFilter: TimeFilter;
  const getRequestSpy  = RequestHandler.getRequest  as jest.MockedFunction<typeof RequestHandler.getRequest>;
  const postRequestSpy = RequestHandler.postRequest as jest.MockedFunction<typeof RequestHandler.postRequest>;

  beforeEach(() => {
    datasource  = new DataSourceTracesAndCalls(options);
    timeFilter  = buildTimeFilter();
    jest.clearAllMocks();
  });

  afterEach(() => {
    datasource.miscCache = new Cache<any>();
  });

  // ── runQuery ───────────────────────────────────────────────────────────────

  describe('runQuery', () => {
    it('should return empty result when no trace is selected', () => {
      const target = buildTestTarget();
      target.selectedTrace = {};
      target.selectedCall  = {};

      return datasource.runQuery(target, timeFilter).then((result: any) => {
        expect(result).toEqual(emptyResultData('A'));
      });
    });

    it('should call runTracesQuery when a trace is selected but no call', () => {
      const target = buildTestTarget();
      target.selectedTrace = { key: 'trace-001', value: 'trace-001' };
      target.selectedCall  = {};

      getRequestSpy.mockResolvedValue({ data: { items: [] } });
      const spy = jest.spyOn(datasource, 'runTracesQuery');

      return datasource.runQuery(target, timeFilter).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    it('should call runCallDetailQuery when both trace and call are selected', () => {
      const target = buildTestTarget();
      target.selectedTrace = { key: 'trace-001', value: 'trace-001' };
      target.selectedCall  = { key: 'call-001',  value: 'call-001'  };

      getRequestSpy.mockResolvedValue({ data: {} });
      const spy = jest.spyOn(datasource, 'runCallDetailQuery');

      return datasource.runQuery(target, timeFilter).then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ── getTracesTags ──────────────────────────────────────────────────────────

  describe('getTracesTags', () => {
    it('should return tags as selectable values with correct shape', () => {
      getRequestSpy.mockResolvedValue({
        data: [
          {
            name: 'service.name',
            type: 'STRING',
            canApplyToSource: true,
            canApplyToDestination: true,
          },
          {
            name: 'endpoint.name',
            type: 'STRING',
            canApplyToSource: false,
            canApplyToDestination: true,
          },
        ],
      });

      return datasource.getTracesTags(timeFilter).then((tags: SelectableValue[]) => {
        expect(tags).toHaveLength(2);
        _.map(tags, (tag) => {
          expect(tag).toHaveProperty('key');
          expect(tag).toHaveProperty('label');
          expect(tag).toHaveProperty('value');
          expect(tag).toHaveProperty('type');
          expect(tag).toHaveProperty('canApplyToSource');
          expect(tag).toHaveProperty('canApplyToDestination');
        });
      });
    });

    it('should cache tags and not re-fetch on second call', () => {
      getRequestSpy.mockResolvedValue({
        data: [{ name: 'service.name', type: 'STRING' }],
      });

      return datasource.getTracesTags(timeFilter).then(() => {
        return datasource.getTracesTags(timeFilter).then(() => {
          // version check (1) + catalog fetch (1) = 2 calls total, not 4
          expect(getRequestSpy).toHaveBeenCalledTimes(2);
        });
      });
    });

    it('should default canApplyToSource and canApplyToDestination to true when absent', () => {
      getRequestSpy.mockResolvedValue({
        data: [{ name: 'call.type', type: 'STRING' }],
      });

      return datasource.getTracesTags(timeFilter).then((tags: SelectableValue[]) => {
        expect(tags[0].canApplyToSource).toBe(true);
        expect(tags[0].canApplyToDestination).toBe(true);
      });
    });
  });

  // ── fetchTracesForDropdown ─────────────────────────────────────────────────

  describe('fetchTracesForDropdown', () => {
    it('should return traces as selectable values with key, label and value', () => {
      postRequestSpy.mockResolvedValue({
        data: {
          items: [
            {
              trace: {
                id: 'trace-001',
                service: { label: 'myService' },
                endpoint: { label: 'GET /api' },
                duration: 42,
              },
            },
          ],
          pagination: {},
        },
      });

      return datasource.fetchTracesForDropdown(timeFilter).then((traces) => {
        expect(traces).toHaveLength(1);
        expect(traces[0]).toHaveProperty('key', 'trace-001');
        expect(traces[0]).toHaveProperty('value', 'trace-001');
        expect(traces[0].label).toContain('myService');
        expect(traces[0].label).toContain('GET /api');
        expect(traces[0].label).toContain('42 ms');
      });
    });

    it('should use traceId as label when service and endpoint are absent', () => {
      postRequestSpy.mockResolvedValue({
        data: {
          items: [{ trace: { id: 'trace-xyz' } }],
          pagination: {},
        },
      });

      return datasource.fetchTracesForDropdown(timeFilter).then((traces) => {
        expect(traces[0].label).toBe('trace-xyz');
      });
    });

    it('should send tagFilterExpression when tagFilters are provided', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      const tagFilters = [
        { name: 'service.name', operator: 'EQUALS', entity: 'DESTINATION', value: 'myService' },
      ];

      return datasource.fetchTracesForDropdown(timeFilter, false, false, tagFilters).then(() => {
        const body: any = postRequestSpy.mock.calls[0][2];
        expect(body).toHaveProperty('tagFilterExpression');
        expect(body.tagFilterExpression.elements).toHaveLength(1);
        expect(body.tagFilterExpression.elements[0]).toMatchObject({
          type:     'TAG_FILTER',
          name:     'service.name',
          operator: 'EQUALS',
          entity:   'DESTINATION',
          value:    'myService',
        });
      });
    });

    it('should NOT send tagFilterExpression when tagFilters are empty', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      return datasource.fetchTracesForDropdown(timeFilter).then(() => {
        const body: any = postRequestSpy.mock.calls[0][2];
        expect(body).not.toHaveProperty('tagFilterExpression');
      });
    });

    it('should set includeInternal and includeSynthetic in the request body', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      return datasource.fetchTracesForDropdown(timeFilter, true, true).then(() => {
        const body: any = postRequestSpy.mock.calls[0][2];
        expect(body.includeInternal).toBe(true);
        expect(body.includeSynthetic).toBe(true);
      });
    });

    it('should send retrievalSize of 200 in pagination', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      return datasource.fetchTracesForDropdown(timeFilter).then(() => {
        const body: any = postRequestSpy.mock.calls[0][2];
        expect(body.pagination.retrievalSize).toBe(200);
      });
    });

    it('should NOT send offset or ingestionTime on the first page', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      return datasource.fetchTracesForDropdown(timeFilter).then(() => {
        const body: any = postRequestSpy.mock.calls[0][2];
        expect(body.pagination).not.toHaveProperty('offset');
        expect(body.pagination).not.toHaveProperty('ingestionTime');
      });
    });

    it('should automatically fetch the next page when the first page is full (200 items)', () => {
      const fullPage = Array.from({ length: 200 }, (_, i) => ({
        trace: { id: `trace-${i}` },
      }));
      const partialPage = [{ trace: { id: 'trace-last' } }];

      postRequestSpy
        .mockResolvedValueOnce({
          data: {
            items: fullPage,
            pagination: { ingestionTime: 1725519793 },
          },
        })
        .mockResolvedValueOnce({
          data: {
            items: partialPage,
            pagination: {},
          },
        });

      return datasource.fetchTracesForDropdown(timeFilter).then((traces) => {
        expect(postRequestSpy).toHaveBeenCalledTimes(2);
        expect(traces).toHaveLength(201);
        // Second call must carry the ingestionTime cursor
        const secondBody: any = postRequestSpy.mock.calls[1][2];
        expect(secondBody.pagination.ingestionTime).toBe(1725519793);
        expect(secondBody.pagination).not.toHaveProperty('offset');
      });
    });

    it('should stop paginating when a page returns fewer than 200 items', () => {
      postRequestSpy.mockResolvedValue({
        data: {
          items: [{ trace: { id: 'trace-only' } }],
          pagination: { ingestionTime: 1725519793 },
        },
      });

      return datasource.fetchTracesForDropdown(timeFilter).then((traces) => {
        expect(postRequestSpy).toHaveBeenCalledTimes(1);
        expect(traces).toHaveLength(1);
      });
    });

    it('should return empty array when no items are returned', () => {
      postRequestSpy.mockResolvedValue({ data: { items: [], pagination: {} } });

      return datasource.fetchTracesForDropdown(timeFilter).then((traces) => {
        expect(traces).toHaveLength(0);
      });
    });
  });

  // ── fetchCallsForDropdown ──────────────────────────────────────────────────

  describe('fetchCallsForDropdown', () => {
    it('should return spans as selectable values with key, label and value', () => {
      getRequestSpy.mockResolvedValue({
        data: {
          items: [
            {
              id: 'span-001',
              name: 'HTTP GET',
              destination: { service: { label: 'myService' } },
            },
          ],
        },
      });

      return datasource.fetchCallsForDropdown('trace-001').then((calls) => {
        expect(calls).toHaveLength(1);
        expect(calls[0]).toHaveProperty('key', 'span-001');
        expect(calls[0]).toHaveProperty('value', 'span-001');
        expect(calls[0].label).toContain('HTTP GET');
        expect(calls[0].label).toContain('myService');
      });
    });

    it('should use only the span name as label when service is absent', () => {
      getRequestSpy.mockResolvedValue({
        data: { items: [{ id: 'span-002', name: 'DB Query' }] },
      });

      return datasource.fetchCallsForDropdown('trace-001').then((calls) => {
        expect(calls[0].label).toBe('DB Query');
      });
    });

    it('should URL-encode the traceId in the request path', () => {
      getRequestSpy.mockResolvedValue({ data: { items: [] } });

      return datasource.fetchCallsForDropdown('trace/with spaces').then(() => {
        const url: string = getRequestSpy.mock.calls[0][1];
        expect(url).toContain('trace%2Fwith%20spaces');
      });
    });
  });

  // ── buildTraceDetailFrame ──────────────────────────────────────────────────

  describe('buildTraceDetailFrame', () => {
    it('should return a frame with all expected fields', () => {
      const target = buildTestTarget();
      target.selectedTrace = { key: 'trace-001' };

      const data = {
        items: [
          {
            id: 'call-001',
            parentId: 'parent-001',
            timestamp: 1000,
            duration: 55,
            name: 'HTTP GET',
            errorCount: 0,
            destination: {
              service:  { label: 'svc' },
              endpoint: { label: 'GET /', type: 'HTTP' },
            },
          },
        ],
      };

      const frame = datasource.buildTraceDetailFrame(target, data);
      expect(frame.fields.map((f) => f.name)).toEqual([
        'callId', 'parentId', 'traceId', 'timestamp',
        'duration (ms)', 'name', 'service', 'endpoint', 'endpointType',
        'errorCount', 'error',
      ]);
      expect(frame.length).toBe(1);
    });

    it('should return empty frame when data has no items', () => {
      const target = buildTestTarget();
      target.selectedTrace = { key: 'trace-001' };

      const frame = datasource.buildTraceDetailFrame(target, { items: [] });
      expect(frame.length).toBe(0);
    });

    it('should set error=true when errorCount > 0', () => {
      const target = buildTestTarget();
      target.selectedTrace = { key: 'trace-001' };

      const data = {
        items: [
          { id: 'c1', errorCount: 2, destination: {} },
        ],
      };

      const frame = datasource.buildTraceDetailFrame(target, data);
      const errorField = frame.fields.find((f) => f.name === 'error')!;
      expect(errorField.values.get(0)).toBe(true);
    });
  });

  // ── buildCallDetailFrame ───────────────────────────────────────────────────

  describe('buildCallDetailFrame', () => {
    it('should return a two-column Property/Value frame', () => {
      const target = buildTestTarget();
      target.selectedCall = { key: 'call-001' };

      const data = {
        id: 'call-001',
        label: 'HTTP GET',
        start: 1000,
        duration: 42,
        errorCount: 0,
        source:      { service: { label: 'srcSvc' }, endpoint: { label: 'src-ep', type: 'HTTP' } },
        destination: { service: { label: 'dstSvc' }, endpoint: { label: 'dst-ep', type: 'HTTP' }, applications: [] },
        spans: [],
      };

      const frame = datasource.buildCallDetailFrame(target, data);
      expect(frame.fields.map((f) => f.name)).toEqual(['Property', 'Value']);
      expect(frame.length).toBeGreaterThan(0);
    });

    it('should return empty frame when data is null', () => {
      const target = buildTestTarget();
      target.selectedCall = { key: 'call-001' };

      const frame = datasource.buildCallDetailFrame(target, null);
      expect(frame.length).toBe(0);
    });

    it('should omit rows for null, undefined and Unspecified values', () => {
      const target = buildTestTarget();
      target.selectedCall = { key: 'call-001' };

      const data = {
        id: 'call-001',
        label: 'Unspecified',   // should be omitted
        start: null,            // should be omitted
        duration: 0,            // 0 is meaningful → included
        errorCount: undefined,  // should be omitted
        source: {}, destination: {}, spans: [],
      };

      const frame = datasource.buildCallDetailFrame(target, data);
      const props: string[] = frame.fields[0].values.toArray();
      expect(props).not.toContain('Operation');   // label was 'Unspecified'
      expect(props).not.toContain('Start Time');  // null
      expect(props).not.toContain('Error Count'); // undefined
      expect(props).toContain('Duration (ms)');   // 0 is meaningful
    });

    it('should include span data fields', () => {
      const target = buildTestTarget();
      target.selectedCall = { key: 'call-001' };

      const data = {
        id: 'call-001',
        source: {}, destination: {}, spans: [
          {
            name: 'db.query',
            kind: 'CLIENT',
            duration: 10,
            errorCount: 0,
            data: {
              db: { statement: 'SELECT 1', type: 'sql' },
            },
          },
        ],
      };

      const frame = datasource.buildCallDetailFrame(target, data);
      const props: string[] = frame.fields[0].values.toArray();
      expect(props).toContain('Span — Name');
      expect(props).toContain('Span — Kind');
      expect(props.some((p) => p.startsWith('Span — db.'))).toBe(true);
    });
  });
});
