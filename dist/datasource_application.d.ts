import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import Cache from './cache';
export default class InstanaApplicationDataSource extends AbstractDatasource {
    applicationsCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    sensibleGranularities: number[];
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getApplications(timeFilter: TimeFilter): Promise<Selectable[]>;
    getApplicastionTags(): Selectable[];
    getApplicationMetricsCatalog(): Selectable[];
    fetchMetricsForApplication(target: any, timeFilter: TimeFilter): any;
    getChartGranularity(windowSize: any): number;
    createTagFilter(filter: TagFilter): {
        name: string;
        operator: string;
        value: string;
    };
}
