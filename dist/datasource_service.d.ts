import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';
export default class InstanaServiceDataSource extends AbstractDatasource {
    servicesCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    NO_SERVICE_FILTER: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getServicesOfApplication(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    paginateServices(results: any, applicationId: any, windowSize: number, to: number, page: number, pageSize: number, pageLimit: number): any;
    fetchServiceMetrics(target: any, timeFilter: TimeFilter): any;
    buildServiceMetricLabel(target: any, item: any, key: any, index: any): string;
}
