import AbstractDatasource from './datasource_abstract';
export interface EntityTypesCache {
    age: number;
    entityTypes: Array<Object>;
}
export interface MetricsCatalogCache {
    age: number;
    metrics: Array<Object>;
}
export default class InstanaInfrastructureDataSource extends AbstractDatasource {
    rollupDurationThresholds: {
        availableFor: number;
        rollup: number;
        label: string;
    }[];
    entityTypesCache: EntityTypesCache;
    snapshotCache: Object;
    catalogCache: Object;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CACHE_MAX_AGE: number;
    CUSTOM_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    storeInCache: (query: any, data: any) => void;
    wasLastFetchedFromApi: () => boolean;
    setLastFetchedFromApi: (value: any) => void;
    getEntityTypes(metricCategory: any): Object[];
    getMetricsCatalog(plugin: any, metricCategory: any): any;
    fetchTypesForTarget(target: any, timeFilter: any): any;
    fetchSnapshotsForTarget(target: any, timeFilter: any): any;
    reduceSnapshot(snapshotResponse: any): any;
    localCacheCopyAvailable(query: any, timeFilter: any): boolean;
    buildQuery(target: any): string;
    buildLabel(snapshotResponse: any, host: any, target: any): any;
    getHostSuffix(host: any): string;
    fetchMetricsForSnapshots(target: any, snapshots: any, timeFilter: any): any;
    fetchMetricsForSnapshot(snapshotId: any, metric: any, timeFilter: any): any;
    getDefaultMetricRollupDuration(timeFilter: any, minRollup?: number): {
        availableFor: number;
        rollup: number;
        label: string;
    };
}
