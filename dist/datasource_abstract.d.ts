export default class AbstractDatasource {
    backendSrv: any;
    templateSrv: any;
    $q: any;
    id: number;
    name: string;
    pluginVersion: string;
    url: string;
    apiToken: string;
    CACHE_MAX_AGE: number;
    SEPARATOR: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    currentTime: () => number;
    getWindowSize(timeFilter: any): any;
    getTimeKey(timeFilter: any): string;
    private reduce(time);
    doRequest(url: any, maxRetries?: number): any;
    postRequest(url: any, data: any, maxRetries?: number): any;
    private execute(request, maxRetries);
}
