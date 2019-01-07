import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    website: InstanaWebsiteDataSource;
    CUSTOM_METRICS: string;
    WEBSITE_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    readTime(options: any): TimeFilter;
    getInfrastructureMetrics(target: any, timeFilter: TimeFilter): any;
    getWebsiteMetrics(target: any, timeFilter: TimeFilter): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
}
