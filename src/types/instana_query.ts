import { DataQuery, SelectableValue } from '@grafana/data';
import TimeFilter from './time_filter';

export interface InstanaQuery extends DataQuery {
  queryText?: string;
  constant: number;
  metricCategory: SelectableValue;
  timeShift: string;
  aggregateGraphs: boolean;
  aggregationFunction: SelectableValue;
  hideOriginalGraphs: boolean;
  sloReport: SelectableValue;
  sloValue: string;
  sloSpecific: SelectableValue;
  metric: SelectableValue;
  aggregation: SelectableValue;
  entityQuery: string;
  entityType: SelectableValue;
  showAllMetrics: boolean;
  canShowAllMetrics: boolean;
  timeInterval: SelectableValue;
  freeTextMetrics: string;
  allMetrics: SelectableValue[];
  labelFormat: string;
  timeShiftIsValid: boolean;
  pluginId: string;
  stableHash: string;
  customFilters: string[];
  displayMaxMetricValue: boolean;
  timeFilter: TimeFilter;
  useFreeTextMetrics: boolean;
  filter: string;
}
