/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
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
    checkMetricAndRefresh(refresh: any): void;
    selectionReset(): void;
    resetEntityTypeSelection(): void;
    resetMetricSelection(): void;
    adjustEntitySelectionPlaceholder(): void;
    adjustMetricSelectionPlaceholder(): void;
    onMetricSelect(): void;
    onLabelChange(): void;
}
