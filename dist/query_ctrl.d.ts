/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export interface TagFilter {
    id: number;
    name: string;
    operator: string;
    stringValue: string;
    numberValue: number;
    booleanValue: boolean;
}
export declare class InstanaQueryCtrl extends QueryCtrl {
    private templateSrv;
    private backendSrv;
    private $q;
    static templateUrl: string;
    uniqueEntityTypes: Array<Object>;
    allCustomMetrics: Array<Object>;
    availableMetrics: Array<Object>;
    snapshots: Array<string>;
    entitySelectionText: string;
    metricSelectionText: string;
    previousMetricCategory: string;
    uniqueEntities: Array<Object>;
    uniqueTags: Array<Object>;
    uniqueOperators: Array<Object>;
    EMPTY_DROPDOWN_TEXT: string;
    BUILT_IN_METRICS: string;
    CUSTOM_METRICS: string;
    defaults: {};
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any, backendSrv: any, $q: any);
    onFilterChange(refresh: any): any;
    onMetricCategorySelect(): void;
    filterForEntityType(refresh: any): void;
    filterEntityTypes(): any;
    findMatchingEntityTypes(entityType: any): boolean;
    onEntityTypeSelect(refresh: any): any;
    onMetricsFilter(refresh: any): void;
    onEntitySelect(refresh: any): void;
    addFilter(): void;
    removeFilter(index: any): void;
    onTagFilterChange(refresh: any, index: any): void;
    checkMetricAndRefresh(refresh: any): void;
    selectionReset(): void;
    resetEntityTypeSelection(): void;
    resetWebsiteSelection(): void;
    resetMetricSelection(): void;
    adjustEntitySelectionPlaceholder(): void;
    adjustMetricSelectionPlaceholder(): void;
    onMetricSelect(): void;
    onLabelChange(): void;
}
