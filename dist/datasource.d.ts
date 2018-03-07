export default class InstanaDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    url: string;
    apiToken: string;
    currentTime: () => number;
    snapshotCache: Object;
    cacheSnapshotData: Object;
    lastFetchedFromAPI: boolean;
    dashboardMode: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CACHE_MAX_AGE: number;
    rollupDurationThresholds: {
        availableFor: number;
        rollup: number;
        label: string;
    }[];
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    dispatchToLocalCache: (id: any) => (query: any, data: any) => void;
    initializeCache: (id: any) => void;
    registerCacheSnapshotDataCallback: (id: any, callback: any) => void;
    setDashboardMode: () => void;
    inDashboardMode: () => boolean;
    cacheSnapshotDataCallback: (id: any) => any;
    getSnapshotCache: () => Object;
    wasLastFetchedFromApi: () => boolean;
    setLastFetchedFromApi: (value: any) => void;
    request(method: any, url: any, requestId?: any): any;
    query(options: any): any;
    fetchSnapshotsForTarget(target: any, from: any, to: any): any;
    globalCacheCopyAvailable(target: any, query: any): boolean;
    localCacheCopyAvailable(target: any, query: any): boolean;
    buildQuery(target: any): string;
    getHostSuffix(contexts: any, snapshotId: any): string;
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
