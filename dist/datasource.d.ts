export interface EntityTypesCache {
    age: number;
    entityTypes: Array<Object>;
}
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
export default class InstanaDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    rollupDurationThresholds: {
        availableFor: number;
        rollup: number;
        label: string;
    }[];
    id: number;
    name: string;
    url: string;
    apiToken: string;
    currentTime: () => number;
    entityTypesCache: EntityTypesCache;
    websitesCache: WebsitesCache;
    websiteTagsCache: TagsCache;
    websiteCatalogCache: MetricsCatalogCache;
    snapshotCache: Object;
    catalogCache: Object;
    fromFilter: number;
    toFilter: number;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    MAX_NUMBER_OF_RESULTS: number;
    CACHE_MAX_AGE: number;
    CUSTOM_METRICS: string;
    WEBSITE_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    storeInCache: (query: any, data: any) => void;
    wasLastFetchedFromApi: () => boolean;
    setLastFetchedFromApi: (value: any) => void;
    doRequest(url: any, maxRetries?: number): any;
    postRequest(url: any, data: any, maxRetries?: number): any;
    execute(request: any, maxRetries: any): any;
    getEntityTypes(metricCategory: any): Object[];
    getMetricsCatalog(plugin: any, metricCategory: any): any;
    getWebsites(): Object[];
    getWebsiteTags(): Object[];
    getWebsiteMetricsCatalog(): Object[];
    query(options: any): any;
    fetchTypesForTarget(target: any): any;
    fetchSnapshotsForTarget(target: any, from: any, to: any): any;
    reduceSnapshot(snapshotResponse: any): any;
    localCacheCopyAvailable(query: any): boolean;
    buildQuery(target: any): string;
    buildLabel(snapshotResponse: any, host: any, target: any): any;
    getHostSuffix(host: any): string;
    fetchMetricsForSnapshot(snapshotId: any, metric: any, from: any, to: any): any;
    fetchMetricsForEntity(target: any, from: any, to: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    getDefaultMetricRollupDuration(from: any, to: any, minRollup?: number): {
        availableFor: number;
        rollup: number;
        label: string;
    };
}
