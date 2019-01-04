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
    CACHE_MAX_AGE: number;
    SEPARATOR: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    currentTime: () => number;
    getWindowSize(timeFilter: TimeFilter): number;
    getTimeKey(timeFilter: TimeFilter): string;
    private msToMin(time);
    doRequest(url: string, maxRetries?: number): any;
    postRequest(url: string, data: Object, maxRetries?: number): any;
    private execute(request, maxRetries);
}
