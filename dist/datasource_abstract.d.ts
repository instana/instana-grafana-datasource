import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';
export default class AbstractDatasource {
    backendSrv: any;
    templateSrv: any;
    $q: any;
    id: number;
    name: string;
    pluginVersion: string;
    url: string;
    apiToken: string;
    simpleCache: Cache<Array<Selectable>>;
    PAGINATION_LIMIT: number;
    CACHE_MAX_AGE: number;
    SEPARATOR: string;
    BUILT_IN_METRICS: string;
    CUSTOM_METRICS: string;
    ANALYZE_APPLICATION_METRICS: string;
    ANALYZE_WEBSITE_METRICS: string;
    APPLICATION_SERVICE_ENDPOINT_METRICS: string;
    SLO_INFORMATION: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    currentTime: () => number;
    getWindowSize(timeFilter: TimeFilter): number;
    getTimeKey(timeFilter: TimeFilter): string;
    private msToMin(time);
    hoursToMs(hours: any): number;
    doRequest(url: string, swallowError?: boolean, maxRetries?: number): any;
    postRequest(url: string, data: Object, swallowError?: boolean, maxRetries?: number): any;
    private execute(request, swallowError, maxRetries);
    sortByTimestamp(datapoints: any): any;
}
