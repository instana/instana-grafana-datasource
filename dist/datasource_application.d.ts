import AbstractDatasource from './datasource_abstract';
import Cache from './cache';
export interface MetricsCatalogCache {
    age: number;
    metrics: Array<Object>;
}
export interface TagsCache {
    age: number;
    tags: Array<Object>;
}
export default class InstanaApplicationDataSource extends AbstractDatasource {
    applicationsCache: Cache;
    applicationTagsCache: TagsCache;
    applicationCatalogCache: MetricsCatalogCache;
    maximumNumberOfUsefulDataPoints: number;
    sensibleGranularities: number[];
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getApplications(timeFilter: any): any;
    getApplicastionTags(): Object[];
    getApplicationMetricsCatalog(): Object[];
    fetchMetricsForApplication(target: any, timeFilter: any): any;
    getChartGranularity(windowSize: any): number;
    createTagFilter(filter: any): {
        name: any;
        operator: any;
        value: any;
    };
}
