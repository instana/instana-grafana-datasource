import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    website: InstanaWebsiteDataSource;
    CUSTOM_METRICS: string;
    WEBSITE_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    readTime(options: any): {
        from: number;
        to: number;
        windowSize: number;
    };
    getInfrastructureMetrics(target: any, timeFilter: any): any;
    getWebsiteMetrics(target: any, timeFilter: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
}
