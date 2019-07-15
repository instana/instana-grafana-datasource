import TagFilter from "../types/tag_filter";
import Granularity from "../types/granularity";
export declare function createTagFilter(filter: TagFilter): {
    name: string;
    operator: string;
    value: string;
};
export declare function getChartGranularity(windowSize: number, maximumNumberOfUsefulDataPoints: number): Granularity;
export declare function getPossibleGranularities(windowSize: number): Granularity[];
export declare function readItemMetrics(target: any, response: any, getLabel: any): any;
