import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
export interface TimeFilter {
    to: number;
    from?: number;
    windowSize?: number;
}
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    website: InstanaWebsiteDataSource;
    timeFilter: TimeFilter;
    CUSTOM_METRICS: string;
    WEBSITE_METRICS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
}
