import AbstractDatasource from "./datasource_abstract";
import Selectable from "./types/selectable";
import Cache from './cache';
import TimeFilter from "./types/time_filter";
export default class InstanaServiceDataSource extends AbstractDatasource {
    servicesCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    ALL_SERVICES: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getServices(target: any, timeFilter: TimeFilter): Promise<Selectable[]>;
    paginateServices(results: any, windowSize: number, to: number, page: number, pageSize: number): any;
    getApplicationsUsingService(target: any, timeFilter: TimeFilter): any;
    fetchServiceMetrics(target: any, timeFilter: TimeFilter): any;
    buildServiceMetricLabel(target: any, item: any, key: any, index: any): string;
}
