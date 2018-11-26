export interface SnapshotCache {
    age: number;
    time: number;
    snapshots: Array<Object>;
}
export interface EntityTypesCache {
    age: number;
    entityTypes: Array<Object>;
}
export interface MetricCatalogCache {
    age: number;
    metrics: Array<Object>;
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
    snapshotCache: Object;
    catalogCache: Object;
    fromFilter: number;
    toFilter: number;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CACHE_MAX_AGE: number;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    storeInCache: (query: any, data: any) => void;
    wasLastFetchedFromApi: () => boolean;
    setLastFetchedFromApi: (value: any) => void;
    request(method: any, url: any, requestId?: any): any;
    getEntityTypes(): Object[];
    getMetricsCatalog(plugin: any, metricCategory: any): any;
    query(options: any): any;
    fetchTypesForTarget(target: any): any;
    fetchSnapshotsForTarget(target: any, from: any, to: any): any;
    reduceSnapshot(snapshotResponse: any): any;
    localCacheCopyAvailable(query: any): boolean;
    buildQuery(target: any): string;
    buildLabel(snapshotResponse: any, host: any, target: any): any;
    getHostSuffix(host: any): string;
    fetchMetricsForSnapshot(snapshotId: any, metric: any, from: any, to: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    getDefaultMetricRollupDuration(from: any, to: any, minRollup?: number): {
        availableFor: number;
        rollup: number;
        label: string;
    };
}
