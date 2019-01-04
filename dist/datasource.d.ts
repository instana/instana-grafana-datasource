import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    application: InstanaApplicationDataSource;
    website: InstanaWebsiteDataSource;
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
    getApplicationMetrics(target: any, timeFilter: any): any;
    private readItemMetrics(target, response);
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
}
