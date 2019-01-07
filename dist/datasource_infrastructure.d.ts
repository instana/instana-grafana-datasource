import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Rollup from './types/rollup';
import Cache from './cache';
export default class InstanaInfrastructureDataSource extends AbstractDatasource {
    rollupDurationThresholds: Array<Rollup>;
    snapshotCache: Cache<Promise<Array<Selectable>>>;
    catalogCache: Cache<Promise<Array<Selectable>>>;
    lastFetchedFromAPI: boolean;
    MAX_NUMBER_OF_METRICS_FOR_CHARTS: number;
    CUSTOM_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getEntityTypes(metricCategory: string): Selectable[];
    getMetricsCatalog(plugin: Selectable, metricCategory: string): Promise<Selectable[]>;
    fetchTypesForTarget(target: any, timeFilter: TimeFilter): any;
    fetchSnapshotsForTarget(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    reduceSnapshot(snapshotResponse: any): any;
    buildQuery(target: any): string;
    buildSnapshotCacheKey(query: string, timeFilter: TimeFilter): string;
    buildLabel(snapshotResponse: any, host: any, target: any): string;
    getHostSuffix(host: string): string;
    fetchMetricsForSnapshots(target: any, snapshots: any, timeFilter: TimeFilter): any;
    readTimeSeries(values: any, pluginId: string, timeFilter: TimeFilter): any;
    correctMeanToSum(values: any, timeFilter: TimeFilter): any;
    fetchMetricsForSnapshot(snapshotId: string, metric: string, timeFilter: TimeFilter): any;
    getDefaultMetricRollupDuration(timeFilter: TimeFilter, minRollup?: number): Rollup;
}
