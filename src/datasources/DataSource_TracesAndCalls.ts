import { MutableDataFrame, FieldType, SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import Cache from '../cache';
import TimeFilter from '../types/time_filter';
import { getWindowSize } from '../util/time_util';
import { getRequest, postRequest } from '../util/request_handler';
import { InstanaQuery } from '../types/instana_query';
import { emptyResultData } from '../util/target_util';
import getVersion from '../util/instana_version';

export class DataSourceTracesAndCalls {
  instanaOptions: InstanaOptions;
  miscCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.miscCache = new Cache<any>();
  }

  /** Fetches the application-monitoring tag catalog for traces filtering.
   *  Uses the same catalog endpoint as ApplicationCallsMetrics group-by tags,
   *  but scoped to TRACES data source. Results are cached for the session.
   */
  getTracesTags(timeFilter: TimeFilter): Promise<SelectableValue[]> {
    const cached = this.miscCache.get('tracesTags');
    if (cached) {
      return cached;
    }

    const promise = getVersion(this.instanaOptions).then((version: number) => {
      const request =
        version >= 191
          ? getRequest(
              this.instanaOptions,
              '/api/application-monitoring/catalog?dataSource=CALLS&useCase=FILTERING&from=' + timeFilter.from
            )
          : getRequest(this.instanaOptions, '/api/application-monitoring/catalog/tags');

      return request.then((response: any) => {
        const entries: any[] = version >= 191 ? response?.data?.tags ?? [] : response?.data ?? [];
        return entries.map((entry: any) => ({
          key:                  entry.name,
          label:                entry.name,
          value:                entry.name,
          type:                 entry.type,
          canApplyToSource:     entry.canApplyToSource ?? true,
          canApplyToDestination: entry.canApplyToDestination ?? true,
        }));
      });
    });

    this.miscCache.put('tracesTags', promise);
    return promise;
  }

  runQuery(target: InstanaQuery, timeFilter: TimeFilter): Promise<any> {
    if (!target.selectedTrace?.key) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    if (target.selectedCall?.key) {
      return this.runCallDetailQuery(target);
    }
    return this.runTracesQuery(target);
  }

  /**
   * Fetches ALL traces matching the given filters by paginating automatically.
   * The API maximum per request is 200 records. When the response signals
   * canLoadMore=true the last item's cursor is used as ingestionTime for the
   * next request, repeating until no more pages remain.
   * The returned array is a flat list of all collected SelectableValue items.
   */
  fetchTracesForDropdown(
    timeFilter: TimeFilter,
    includeInternal = false,
    includeSynthetic = false,
    tagFilters: Array<{ name: string; operator: string; entity: string; value: string }> = []
  ): Promise<SelectableValue[]> {
    const PAGE_SIZE = 200; // API maximum
    const windowSize = getWindowSize(timeFilter);

    const buildBody = (ingestionTime?: number): any => {
      const pagination: any = { retrievalSize: PAGE_SIZE };
      // ingestionTime is the cursor from the previous page's last item.
      // offset is intentionally omitted (we always start from the cursor).
      if (ingestionTime != null) {
        pagination.ingestionTime = ingestionTime;
      }

      const body: any = {
        timeFrame: { to: timeFilter.to, windowSize },
        includeInternal,
        includeSynthetic,
        pagination,
      };

      if (tagFilters.length > 0) {
        body.tagFilterExpression = {
          type: 'EXPRESSION',
          logicalOperator: 'AND',
          elements: tagFilters.map((f) => ({
            type: 'TAG_FILTER',
            name: f.name,
            operator: f.operator,
            entity: f.entity || 'DESTINATION',
            value: f.value,
          })),
        };
      }

      return body;
    };

    const mapItems = (items: any[]): SelectableValue[] =>
      items.map((item: any) => {
        const trace    = item.trace ?? {};
        const traceId  = trace.id ?? '';
        const service  = trace.service?.label ?? '';
        const endpoint = trace.endpoint?.label ?? trace.endpoint ?? '';
        const opName   = trace.label ?? '';
        const duration = trace.duration != null ? ` (${trace.duration} ms)` : '';

        const routePart = endpoint || opName;
        const label = service && routePart
          ? `${service}  →  ${routePart}${duration}`
          : service || routePart || traceId;

        return {
          key:       traceId,
          label,
          value:     traceId,
          traceData: trace,
        };
      });

    // Recursive accumulator.
    // Continue fetching the next page when the current page is full
    // (items.length === PAGE_SIZE), which means more data may exist.
    // Stop when the page is not full — that means we have reached the end.
    // The ingestionTime cursor for the next page is taken from the response's
    // own pagination.ingestionTime field (a plain Long).
    const fetchPage = (accumulated: SelectableValue[], ingestionTime?: number): Promise<SelectableValue[]> => {
      return postRequest(
        this.instanaOptions,
        '/api/application-monitoring/analyze/traces',
        buildBody(ingestionTime)
      ).then((response: any) => {
        const data  = response?.data ?? {};
        const items: any[] = data.items ?? [];
        const page  = mapItems(items);
        const all   = [...accumulated, ...page];

        // If the page came back full (== PAGE_SIZE), there may be more data —
        // fetch the next page using the cursor from the response pagination.
        if (items.length === PAGE_SIZE) {
          const nextIngestionTime: number = data.pagination?.ingestionTime;
          if (nextIngestionTime != null) {
            return fetchPage(all, nextIngestionTime);
          }
        }

        // Page is not full (< PAGE_SIZE) — we have all the data.
        return all;
      });
    };

    return fetchPage([]);
  }

  fetchCallsForDropdown(traceId: string): Promise<SelectableValue[]> {
    const encoded = encodeURIComponent(traceId.trim());
    return getRequest(
      this.instanaOptions,
      `/api/application-monitoring/v2/analyze/traces/${encoded}`
    ).then((response: any) => {
      const items: any[] = response?.data?.items ?? [];
      return items.map((span: any) => {
        const spanId  = span.id ?? '';
        const name    = span.name ?? '';
        const service = span.destination?.service?.label ?? '';
        const label   = service ? `${name}  (${service})` : name;

        return {
          key:      spanId,
          label,
          value:    spanId,
          spanData: span,
        };
      });
    });
  }

  runTracesQuery(target: InstanaQuery): Promise<any> {
    const traceId = target.selectedTrace?.key;
    if (!traceId) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const encoded = encodeURIComponent(String(traceId).trim());
    let url = `/api/application-monitoring/v2/analyze/traces/${encoded}`;

    const params: string[] = [];
    if (target.tracesRetrievalSize) {
      params.push(`retrievalSize=${encodeURIComponent(target.tracesRetrievalSize)}`);
    }
    if (target.tracesOffset != null) {
      params.push(`offset=${encodeURIComponent(target.tracesOffset)}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return getRequest(this.instanaOptions, url).then((response: any) => {
      return this.buildTraceDetailFrame(target, response?.data);
    });
  }

  buildTraceDetailFrame(target: InstanaQuery, data: any): MutableDataFrame {
    const traceId = target.selectedTrace?.key ?? '';
    const frame = new MutableDataFrame({
      refId: target.refId,
      name: 'trace_' + traceId,
      fields: [
        { name: 'callId',        type: FieldType.string  },
        { name: 'parentId',      type: FieldType.string  },
        { name: 'traceId',       type: FieldType.string  },
        { name: 'timestamp',     type: FieldType.time    },
        { name: 'duration (ms)', type: FieldType.number  },
        { name: 'name',          type: FieldType.string  },
        { name: 'service',       type: FieldType.string  },
        { name: 'endpoint',      type: FieldType.string  },
        { name: 'endpointType',  type: FieldType.string  },
        { name: 'errorCount',    type: FieldType.number  },
        { name: 'error',         type: FieldType.boolean },
      ],
    });

    const items: any[] = data?.items ?? [];
    items.forEach((span: any) => {
      const dest = span.destination ?? {};
      frame.appendRow([
        span.id               ?? '',
        span.parentId         ?? '',
        traceId,
        span.timestamp        ?? null,
        span.duration         ?? null,
        span.name             ?? '',
        dest.service?.label   ?? '',
        dest.endpoint?.label  ?? '',
        dest.endpoint?.type   ?? '',
        span.errorCount       ?? 0,
        (span.errorCount ?? 0) > 0,
      ]);
    });

    return frame;
  }

  runCallDetailQuery(target: InstanaQuery): Promise<any> {
    const traceId = target.selectedTrace?.key;
    const callId  = target.selectedCall?.key;

    if (!traceId || !callId) {
      return Promise.resolve(emptyResultData(target.refId));
    }

    const tId = encodeURIComponent(String(traceId).trim());
    const cId = encodeURIComponent(String(callId).trim());

    return getRequest(
      this.instanaOptions,
      `/api/application-monitoring/v2/analyze/traces/${tId}/calls/${cId}/details`
    ).then((response: any) => {
      return this.buildCallDetailFrame(target, response?.data);
    });
  }

  buildCallDetailFrame(target: InstanaQuery, data: any): MutableDataFrame {
    const callId = target.selectedCall?.key ?? '';
    const frame = new MutableDataFrame({
      refId: target.refId,
      name: 'call_detail_' + callId,
      fields: [
        { name: 'Property', type: FieldType.string },
        { name: 'Value',    type: FieldType.string },
      ],
    });

    if (!data) {
      return frame;
    }

    const isMeaningful = (v: any) =>
      v !== null && v !== undefined && String(v).trim() !== '' && String(v).trim() !== 'Unspecified';

    const append = (label: string, value: any) => {
      if (isMeaningful(value)) {
        frame.appendRow([label, String(value)]);
      }
    };

    append('Call ID',       data.id);
    append('Operation',     data.label);
    append('Start Time',    data.start);
    append('Duration (ms)', data.duration);
    append('Error Count',   data.errorCount);

    const src = data.source ?? {};
    append('Source Service',       src.service?.label);
    append('Source Endpoint',      src.endpoint?.label);
    append('Source Endpoint Type', src.endpoint?.type);

    const dest = data.destination ?? {};
    append('Destination Service',       dest.service?.label);
    append('Destination Endpoint',      dest.endpoint?.label);
    append('Destination Endpoint Type', dest.endpoint?.type);

    const apps: any[] = dest.applications ?? [];
    if (apps.length > 0) {
      append('Applications', apps.map((a: any) => a.label).join(', '));
    }

    const phys = dest.physicalContext ?? {};
    append('Host',      phys.host?.label);
    append('Container', phys.container?.label);
    append('Process',   phys.process?.label);

    const spans: any[] = data.spans ?? [];
    spans.forEach((span: any, i: number) => {
      const prefix = spans.length === 1 ? 'Span' : `Span [${i}]`;
      append(`${prefix} — Name`,        span.name);
      append(`${prefix} — Kind`,        span.kind);
      append(`${prefix} — Duration`,    span.duration);
      append(`${prefix} — Error Count`, span.errorCount);

      const spanData = span.data ?? {};
      Object.entries(spanData).forEach(([protocol, fields]: [string, any]) => {
        if (fields && typeof fields === 'object') {
          Object.entries(fields).forEach(([k, v]) => {
            if (isMeaningful(v) && typeof v !== 'object') {
              append(`${prefix} — ${protocol}.${k}`, v);
            }
          });
        }
      });
    });

    return frame;
  }
}
