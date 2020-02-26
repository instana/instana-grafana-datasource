import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';
export default class InstanaApplicationDataSource extends AbstractDatasource {
    applicationsCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    ALL_APPLICATIONS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getApplications(timeFilter: TimeFilter): Promise<Selectable[]>;
    paginateApplications(results: any, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number): any;
    getApplicationTags(): Selectable[];
    getApplicationMetricsCatalog(): Selectable[];
    fetchAnalyzeMetricsForApplication(target: any, timeFilter: TimeFilter): any;
    fetchApplicationMetrics(target: any, timeFilter: TimeFilter): any;
    buildAnalyzeApplicationLabel(target: any, item: any, key: any, index: any): string;
    buildApplicationMetricLabel(target: any, item: any, key: any, index: any): string;
}
