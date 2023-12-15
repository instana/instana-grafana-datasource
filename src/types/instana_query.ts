import { DataQuery, SelectableValue } from '@grafana/data';

import TagFilter from './tag_filter';
import TimeFilter from './time_filter';

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
  slo2Specific: SelectableValue;
  metric: SelectableValue;
  entity: SelectableValue;
  service: SelectableValue;
  endpoint: SelectableValue;
  aggregation: SelectableValue;
  callToEntity: string;
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
  group: SelectableValue;
  stableHash: string;
  customFilters: string[];
  displayMaxMetricValue: boolean;
  timeFilter: TimeFilter;
  useFreeTextMetrics: boolean;
  showGroupBySecondLevel: boolean;
  applicationCallToEntity: string;
  applicationBoundaryScope: string;
  showAdvancedSettings: boolean;
  tagFilterExpression: string;
}
