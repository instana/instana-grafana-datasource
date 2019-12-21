import InstanaServiceDataSource from "./datasource_service";
import AbstractDatasource from "./datasource_abstract";
import Selectable from "./types/selectable";
import Cache from './cache';
import TimeFilter from "./types/time_filter";
export default class InstanaEndpointDataSource extends AbstractDatasource {
    endpointsCache: Cache<Promise<Array<Selectable>>>;
    serviceDataSource: InstanaServiceDataSource;
    maximumNumberOfUsefulDataPoints: number;
    NO_ENDPOINT_FILTER: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getEndpointsOfService(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    paginateEndpoints(results: any, applicationId: any, serviceId: any, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number): any;
    fetchEndpointMetrics(target: any, timeFilter: TimeFilter): any;
    buildEndpointMetricLabel(target: any, item: any, key: any, index: any): string;
}
