import AbstractDatasource from './datasource_abstract';
export interface WebsitesCache {
    time: number;
    age: number;
    websites: Array<Object>;
}
export interface MetricsCatalogCache {
    age: number;
    metrics: Array<Object>;
}
export interface TagsCache {
    age: number;
    tags: Array<Object>;
}
export default class InstanaWebsiteDataSource extends AbstractDatasource {
    websitesCache: WebsitesCache;
    websiteTagsCache: TagsCache;
    websiteCatalogCache: MetricsCatalogCache;
    MAX_NUMBER_OF_RESULTS: number;
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getWebsites(timeFilter: any): Object[];
    noCacheCopyAvailable(timeFilter: any, now: any): boolean;
    getWebsiteTags(): Object[];
    getWebsiteMetricsCatalog(): Object[];
    fetchMetricsForEntity(target: any, timeFilter: any): any;
    createTagFilter(filter: any): {
        name: any;
        operator: any;
        value: any;
    };
}
