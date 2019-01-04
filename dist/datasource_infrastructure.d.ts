import AbstractDatasource from './datasource_abstract';
import Cache from './cache';
export default class InstanaInfrastructureDataSource extends AbstractDatasource {
    rollupDurationThresholds: {
        availableFor: number;
        rollup: number;
        label: string;
    }[];
    snapshotCache: Cache;
    catalogCache: Cache;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CUSTOM_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getEntityTypes(metricCategory: any): any;
    getMetricsCatalog(plugin: any, metricCategory: any): any;
    fetchTypesForTarget(target: any, timeFilter: any): any;
    fetchSnapshotsForTarget(target: any, timeFilter: any): any;
    reduceSnapshot(snapshotResponse: any): any;
    buildQuery(target: any): string;
    buildSnapshotCacheKey(query: any, timeFilter: any): string;
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
