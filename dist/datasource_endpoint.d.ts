import AbstractDatasource from "./datasource_abstract";
import Selectable from "./types/selectable";
import Cache from './cache';
import TimeFilter from "./types/time_filter";
import InstanaServiceDataSource from "./datasource_service";
export default class InstanaEndpointDataSource extends AbstractDatasource {
    endpointsCache: Cache<Promise<Array<Selectable>>>;
    serviceDataSource: InstanaServiceDataSource;
    maximumNumberOfUsefulDataPoints: number;
    ALL_ENDPOINTS: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any, serviceDataSource: InstanaServiceDataSource);
    getEndpoints(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    paginateEndpoints(results: any, windowSize: number, to: number, page: number, pageSize: number): any;
    getApplicationsUsingEndpoint(target: any, timeFilter: TimeFilter): any;
    fetchEndpointMetrics(target: any, timeFilter: TimeFilter): any;
    buildEndpointMetricLabel(target: any, item: any, key: any, index: any): string;
}
