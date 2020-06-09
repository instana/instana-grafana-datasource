import { DataQuery, SelectableValue } from '@grafana/data';
import TimeFilter from './time_filter';
import TagFilter from './tag_filter';

export interface InstanaQuery extends DataQuery {
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
  service: SelectableValue;
  endpoint: SelectableValue;
  aggregation: SelectableValue;
  callToEntity: SelectableValue
  entityQuery: string;
  entityType: SelectableValue;
  showAllMetrics: boolean;
  canShowAllMetrics: boolean;
  groupbyTagSecondLevelKey: string;
  showWarningCantShowAllResults: boolean;
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
  showGroupBySecondLevel: boolean;
  applicationCallToEntity: SelectableValue;
}
