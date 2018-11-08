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
    catalogPromise: Object;
    fromFilter: number;
    toFilter: number;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CACHE_MAX_AGE: number;
    rollupDurationThresholds: {
        availableFor: number;
        rollup: number;
        label: string;
    }[];
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    storeInCache: (id: any, query: any, data: any) => void;
    getSnapshotCache: () => Object;
    wasLastFetchedFromApi: () => boolean;
    setLastFetchedFromApi: (value: any) => void;
    request(method: any, url: any, requestId?: any): any;
    getCatalog: () => Object;
    query(options: any): any;
    fetchTypesForTarget(target: any): any;
    fetchSnapshotsForTarget(target: any, from: any, to: any): any;
    modifyLocalCacheCopyFor(target: any): boolean;
    localCacheCopyAvailable(target: any, query: any): boolean;
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
