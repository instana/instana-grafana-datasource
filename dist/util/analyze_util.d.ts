import TagFilter from "../types/tag_filter";
export declare function createTagFilter(filter: TagFilter, useEntity?: boolean): {
    name: string;
    operator: string;
    value: string;
};
export declare function readItemMetrics(target: any, response: any, getLabel: any): any;
