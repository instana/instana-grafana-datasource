export interface Group {
  groupbyTag: string;
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

export interface BeaconGroupBody {
  group: Group;
  timeFrame: TimeFrame;
  type: string;
  metrics: Array<Metric>;
  tagFilters?: Array<TagFilter>;
  order?: Order;
}

export default BeaconGroupBody;
