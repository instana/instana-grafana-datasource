import TimeFilter from "../types/time_filter";
import Selectable from "../types/selectable";
export declare function getDefaultChartGranularity(windowSize: number): Selectable;
export declare function getPossibleGranularities(windowSize: number, maxValues?: number): Selectable[];
export declare function getDefaultMetricRollupDuration(timeFilter: TimeFilter): Selectable;
export declare function getPossibleRollups(timeFilter: TimeFilter): Selectable[];
export declare function setRollUpValues(target: any, timeFilter: TimeFilter): void;
export declare function setGranularityValues(target: any, timeFilter: TimeFilter): void;
