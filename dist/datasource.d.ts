import InstanaInfrastructureDataSource from './datasource_infrastructure';
import InstanaApplicationDataSource from './datasource_application';
import InstanaEndpointDataSource from "./datasource_endpoint";
import InstanaServiceDataSource from "./datasource_service";
import InstanaWebsiteDataSource from './datasource_website';
import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
export default class InstanaDatasource extends AbstractDatasource {
    infrastructure: InstanaInfrastructureDataSource;
    application: InstanaApplicationDataSource;
    website: InstanaWebsiteDataSource;
    service: InstanaServiceDataSource;
    endpoint: InstanaEndpointDataSource;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    aggregateTarget(target: any, targetMetaData: any): {
        datapoints: any;
        refId: any;
        target: any;
    };
    aggregateDataOfTimestamp(dataGroupedByTimestamp: any, aggregationLabel: string): any[];
    concatTargetData(target: any): any[];
    applyTimeShiftOnData(data: any, timeshift: any): void;
    buildResult(aggregatedData: any, refId: any, target: any): {
        datapoints: any;
        refId: any;
        target: any;
    };
    getAllDatapointsOfTimestamp(data: any, index: any): any[];
    convertTimeShiftToMillis(timeShift: string): number;
    parseTimeShift(timeShift: string): number;
    applyTimeShiftOnTimeFilter(timeFilter: TimeFilter, timeShift: number): TimeFilter;
    readTime(options: any): TimeFilter;
    getInfrastructureMetrics(target: any, timeFilter: TimeFilter): any;
    getAnalyzeWebsiteMetrics(target: any, timeFilter: TimeFilter): any;
    getAnalyzeApplicationMetrics(target: any, timeFilter: TimeFilter): any;
    getApplicationMetrics(target: any, timeFilter: TimeFilter): any;
    getServiceMetrics(target: any, timeFilter: TimeFilter): any;
    getEndpointMetrics(target: any, timeFilter: TimeFilter): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    getVersion(): number;
    testDatasource(): any;
}
