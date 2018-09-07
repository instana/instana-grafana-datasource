export default class InstanaDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    url: string;
    apiToken: string;
    newApplicationModelEnabled: boolean;
    currentTime: () => number;
    snapshotCache: Object;
    catalogPromise: Object;
    lastFetchedFromAPI: boolean;
    CUSTOM_METRIC_TYPES: string[];
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
    correctForSingleStat(values: any, fromInMs: any, toInMs: any): any;
    fetchSnapshotsForTarget(target: any, from: any, to: any): any;
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
