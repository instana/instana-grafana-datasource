import Selectable from "./types/selectable";
import operators from "./lists/operators";
import beaconTypes from "./lists/beacon_types";
import aggregation_functions from "./lists/aggregation_function";
import TimeFilter from "./types/time_filter";

export class QueryVariables {
  //static uniqueOperators: Array<Selectable> = operators;
  static uniqueBeaconTypes: Array<Selectable> = beaconTypes;
  //static aggregationFunctions = aggregation_functions;
  static uniqueEntityTypes: Array<Selectable>; // subset of allEntityTypes filtered by DF
  static allCustomMetrics: Array<Selectable>; // internal reference only to speed up filtering // TODO needed ?
  static availableMetrics: Array<Selectable>; // subset of allCustomMetrics for display only
  static uniqueEntities: Array<Selectable>;
  static uniqueTags: Array<Selectable>;
  static allWebsiteMetrics: Array<Selectable>;
  static analyzeLabel: string;

  static snapshots: Array<string>;
  static entitySelectionText: string;
  static metricSelectionText: string;
  static previousMetricCategory: string;
  static timeFilter: TimeFilter;
  static customFilters = [];
}
