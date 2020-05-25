import { DataQuery, SelectableValue } from '@grafana/data';
import TimeFilter from './time_filter';

export interface InstanaQuery extends DataQuery {
  queryText?: string;
  constant: number;
  metricCategory: SelectableValue;
  legendFormat: string;
  timeShift: string;
  aggregateGraphs: boolean;
  aggregationFunction: SelectableValue;
  hideOriginalGraphs: boolean;
  sloReport: SelectableValue;
  sloValue: string;
  sloSpecific: SelectableValue;
  metric: SelectableValue;
  aggregation: string;
  entityQuery: string;
  entityType: SelectableValue;
  showAllMetrics: boolean;
  timeInterval: SelectableValue;
  freeTextMetrics: string;
  allMetrics: string;
  labelFormat: string;
  timeShiftIsValid: string;
  pluginId: string;
  stableHash: string;
  displayMaxMetricValue: boolean;
  timeFilter: TimeFilter;
}
