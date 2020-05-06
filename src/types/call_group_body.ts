export interface Group {
  groupbyTag: string;
  groupbyTagSecondLevelKey?: string;
}

export interface TimeFrame {
  to: number;
  windowSize: number;
}

export interface TagFilter {
  name: string;
  operator: string;
  value: string;
}

export interface Metric {
  metric: string;
  aggregation: string;
  granularity?: number;
}

export interface Order {
  by: string;
  direction: string;
}

export interface Pagination {
  ingestionTime: number;
  offset: number;
  retrievalSize: number;
}

export interface CallGroupBody {
  group: Group;
  timeFrame: TimeFrame;
  metrics: Metric[];
  tagFilters?: TagFilter[];
  order?: Order;
  pagination?: Pagination;
}

export default CallGroupBody;
