import { DataQuery, SelectableValue } from '@grafana/data';

export interface InstanaQuery extends DataQuery {
  queryText?: string;
  constant: number;
  metricCategory: SelectableValue;
  legendFormat: string;
  timeShift: string;

  aggregateGraphs: boolean;
  aggregationFunction: SelectableValue;
  hideOriginalGraphs: boolean;
}
