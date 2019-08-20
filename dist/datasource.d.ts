import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    application: InstanaApplicationDataSource;
    website: InstanaWebsiteDataSource;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    convertTimeShiftToMillis(timeShift: string): number;
    parseTimeShift(timeShift: string): number;
    applyTimeShiftOnTimeFilter(timeFilter: TimeFilter, timeShift: number): TimeFilter;
    readTime(options: any): TimeFilter;
    getInfrastructureMetrics(target: any, rollUp: any, timeFilter: TimeFilter): any;
    getWebsiteMetrics(target: any, timeFilter: TimeFilter): any;
    getApplicationMetrics(target: any, timeFilter: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    getVersion(): number;
    testDatasource(): any;
}
