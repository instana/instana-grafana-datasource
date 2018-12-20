/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export interface Selectable {
    key: string;
    label: string;
    type: string;
}
export interface TagFilter {
    tag: Selectable;
    operator: Selectable;
    stringValue: string;
    numberValue: number;
    booleanValue: boolean;
    isValid: boolean;
}
export declare class InstanaQueryCtrl extends QueryCtrl {
    private templateSrv;
    private backendSrv;
    private $q;
    static templateUrl: string;
    uniqueAggregators: {
        key: string;
        label: string;
        type: string;
    }[];
    uniqueOperators: {
        key: string;
        label: string;
        type: string;
    }[];
    uniqueEntityTypes: Array<Object>;
    allCustomMetrics: Array<Object>;
    availableMetrics: Array<Object>;
    snapshots: Array<string>;
    entitySelectionText: string;
    metricSelectionText: string;
    previousMetricCategory: string;
    uniqueEntities: Array<Object>;
    uniqueTags: Array<Object>;
    EMPTY_DROPDOWN_TEXT: string;
    OPERATOR_STRING: string;
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    BUILT_IN_METRICS: string;
    CUSTOM_METRICS: string;
    APPLICATION_METRICS: string;
    WEBSITE_METRICS: string;
    defaults: {};
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any, backendSrv: any, $q: any);
    isInfrastructure(): boolean;
    isEntity(): boolean;
    onEntityChanges(refresh: any): any;
    onFilterChange(refresh: any): any;
    onMetricCategorySelect(): void;
    filterForEntityType(refresh: any): void;
    filterEntityTypes(): any;
    findMatchingEntityTypes(entityType: any): boolean;
    onEntityTypeSelect(refresh: any): any;
    onMetricsFilter(refresh: any): void;
    onEntitySelect(): void;
    addFilter(): void;
    removeFilter(index: any): void;
    onTagFilterChange(index: any): void;
    onGroupChange(): void;
    checkMetricAndRefresh(refresh: any): void;
    selectionReset(): void;
    resetEntityTypeSelection(): void;
    resetEntitySelection(): void;
    resetMetricSelection(): void;
    adjustEntitySelectionPlaceholder(): void;
    adjustMetricSelectionPlaceholder(): void;
    onMetricSelect(): void;
    onLabelChange(): void;
}
