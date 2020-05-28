import { DataQuery, SelectableValue } from '@grafana/data';
import TimeFilter from './time_filter';
import TagFilter from './tag_filter';

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
  filters: TagFilter[];
  sloSpecific: SelectableValue;
  metric: SelectableValue;
  entity: SelectableValue;
  aggregation: SelectableValue;
  entityQuery: string;
  entityType: SelectableValue;
  showAllMetrics: boolean;
  canShowAllMetrics: boolean;
  groupbyTagSecondLevelKey: string;
  timeInterval: SelectableValue;
  freeTextMetrics: string;
  allMetrics: SelectableValue[];
  labelFormat: string;
  timeShiftIsValid: boolean;
  pluginId: string;
  group: SelectableValue;
  stableHash: string;
  customFilters: string[];
  displayMaxMetricValue: boolean;
  timeFilter: TimeFilter;
  useFreeTextMetrics: boolean;
  filter: string;
}
