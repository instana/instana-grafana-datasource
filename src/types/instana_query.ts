import { DataQuery } from '@grafana/data';

export interface InstanaQuery extends DataQuery {
  queryText?: string;
  constant: number;
}
