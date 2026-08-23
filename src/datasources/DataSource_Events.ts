import { getRequest } from '../util/request_handler';
import Cache from '../cache';
import { InstanaOptions } from '../types/instana_options';
import { SelectableValue, FieldType, createDataFrame } from '@grafana/data';
import { InstanaQuery } from 'types/instana_query';
import TimeFilter from 'types/time_filter';

export const INSTANA_EVENT_TYPES: SelectableValue[] = [
  { key: 'INCIDENT', label: 'Incident' },
  { key: 'ISSUE', label: 'Issue' },
  { key: 'CHANGE', label: 'Change' },
];

export class DataSourceEvents {
  instanaOptions: InstanaOptions;
  eventsCache: Cache<any>;

  constructor(options: InstanaOptions) {
    this.instanaOptions = options;
    this.eventsCache = new Cache<any>();
  }

  async runQuery(target: InstanaQuery, timeFilter: TimeFilter) {
    const { windowSize, to } = timeFilter;

    // Build query string manually so eventTypeFilters can be repeated for multi-select
    const parts: string[] = [
      `windowSize=${encodeURIComponent(String(windowSize))}`,
      `to=${encodeURIComponent(String(to))}`,
    ];

    const selectedTypes: string[] = Array.isArray(target.eventTypeFilters) ? target.eventTypeFilters : [];
    for (const t of selectedTypes) {
      if (t) {
        parts.push(`eventTypeFilters=${encodeURIComponent(t)}`);
      }
    }

    if (target.filterEventUpdates) {
      parts.push('filterEventUpdates=true');
    }
    if (target.excludeTriggeredBefore) {
      parts.push('excludeTriggeredBefore=true');
    }
    if (target.includeMetadata) {
      parts.push('includeMetadata=true');
    }

    try {
      const response = await getRequest(this.instanaOptions, `/api/events?${parts.join('&')}`);
      const events: any[] = response?.data || [];

      if (!events.length) {
        return this.emptyDataFrame(target.refId);
      }

      return this.toDataFrame(events, target.refId);
    } catch (error) {
      console.error('Error fetching Instana events:', error);
      return this.emptyDataFrame(target.refId);
    }
  }

  /**
   * Converts the raw events array into a single Grafana DataFrame.
   *
   * Columns produced (matching the API response fields):
   *   Start (time) | End (time) | Event ID | Type | State | Severity
   *   | Entity Name | Entity Label | Entity Type | Problem | Detail | Fix Suggestion
   *
   * Table panel  → one row per event, all columns visible
   * Time series  → Start column drives the X axis, Severity drives the Y axis
   */
  private toDataFrame(events: any[], refId: string) {
    // Pre-populate typed column arrays
    const starts: number[]      = [];
    const ends: Array<number | null> = [];
    const eventIds: string[]    = [];
    const types: string[]       = [];
    const states: string[]      = [];
    const severities: number[]  = [];
    const entityNames: string[] = [];
    const entityLabels: string[]= [];
    const entityTypes: string[] = [];
    const problems: string[]    = [];
    const details: string[]     = [];
    const fixes: string[]       = [];

    for (const event of events) {
      starts.push(event.start ?? 0);
      ends.push(event.end ?? null);
      eventIds.push(event.eventId ?? '');
      types.push(event.type ?? '');
      states.push(event.state ?? '');
      severities.push(event.severity ?? 0);
      entityNames.push(event.entityName ?? '');
      entityLabels.push(event.entityLabel ?? '');
      entityTypes.push(event.entityType ?? '');
      problems.push(event.problem ?? '');
      details.push(event.detail ?? '');
      fixes.push(event.fixSuggestion ?? '');
    }

    return createDataFrame({
      refId,
      name: 'Instana Events',
      fields: [
        { name: 'Start',          type: FieldType.time,   values: starts },
        { name: 'End',            type: FieldType.time,   values: ends },
        { name: 'Event ID',       type: FieldType.string, values: eventIds },
        { name: 'Type',           type: FieldType.string, values: types },
        { name: 'State',          type: FieldType.string, values: states },
        { name: 'Severity',       type: FieldType.number, values: severities },
        { name: 'Entity Name',    type: FieldType.string, values: entityNames },
        { name: 'Entity Label',   type: FieldType.string, values: entityLabels },
        { name: 'Entity Type',    type: FieldType.string, values: entityTypes },
        { name: 'Problem',        type: FieldType.string, values: problems },
        { name: 'Detail',         type: FieldType.string, values: details },
        { name: 'Fix Suggestion', type: FieldType.string, values: fixes },
      ],
    });
  }

  /** Returns an empty DataFrame (no rows) when there are no events or on error. */
  private emptyDataFrame(refId: string) {
    return createDataFrame({
      refId,
      name: 'Instana Events',
      fields: [
        { name: 'Start',          type: FieldType.time,   values: [] },
        { name: 'End',            type: FieldType.time,   values: [] },
        { name: 'Event ID',       type: FieldType.string, values: [] },
        { name: 'Type',           type: FieldType.string, values: [] },
        { name: 'State',          type: FieldType.string, values: [] },
        { name: 'Severity',       type: FieldType.number, values: [] },
        { name: 'Entity Name',    type: FieldType.string, values: [] },
        { name: 'Entity Label',   type: FieldType.string, values: [] },
        { name: 'Entity Type',    type: FieldType.string, values: [] },
        { name: 'Problem',        type: FieldType.string, values: [] },
        { name: 'Detail',         type: FieldType.string, values: [] },
        { name: 'Fix Suggestion', type: FieldType.string, values: [] },
      ],
    });
  }
}
