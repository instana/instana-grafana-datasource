import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';
export default class InstanaInfrastructureDataSource extends AbstractDatasource {
    snapshotCache: Cache<Promise<Array<Selectable>>>;
    snapshotInfoCache: Cache<Promise<Array<Selectable>>>;
    catalogCache: Cache<Promise<Array<Selectable>>>;
    showOffline: boolean;
    timeToLiveSnapshotInfoCache: number;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getEntityTypes(): Selectable[];
    getMetricsCatalog(plugin: Selectable, metricCategory: string): Promise<Selectable[]>;
    fetchTypesForTarget(target: any, timeFilter: TimeFilter): any;
    fetchSnapshotsForTarget(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    reduceSnapshot(snapshotResponse: any): any;
    buildQuery(target: any): string;
    buildSnapshotCacheKey(query: string, timeFilter: TimeFilter): string;
    buildLabel(snapshotResponse: any, host: any, target: any, index: any, metric: any): string;
    getHostSuffix(host: string): string;
    fetchMetricsForSnapshots(target: any, snapshots: any, timeFilter: TimeFilter, metric: any): Promise<any>;
    buildMaxMetricTarget(target: any, timeseries: any, maxValue: any, resultLabel: any): {
        'target': string;
        'datapoints': any;
        'refId': any;
        'key': string;
    };
    convertRelativeToAbsolute(datapoints: any, maxValue: any): any;
    convertMetricNameToMaxLabel(metric: any): string;
    getMaxMetricValue(metric: any, snapshot: any): number;
    readTimeSeries(values: any, aggregation: string, pluginId: string, timeFilter: TimeFilter): any;
    correctMeanToSum(values: any, timeFilter: TimeFilter): any;
    fetchMetricsForSnapshot(snapshotId: string, timeFilter: TimeFilter, rollup: number, metric: any): any;
}
