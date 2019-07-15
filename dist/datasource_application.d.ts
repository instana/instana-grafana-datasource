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
    getApplicastionTags(): Selectable[];
    getApplicationMetricsCatalog(): Selectable[];
    fetchMetricsForApplication(target: any, timeFilter: TimeFilter): any;
    buildApplicationLabel(target: any, item: any, key: any, index: any): string;
}
