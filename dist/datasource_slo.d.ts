import AbstractDatasource from "./datasource_abstract";
import TimeFilter from "./types/time_filter";
import Selectable from "./types/selectable";
import Cache from './cache';
export default class InstanaSLODataSource extends AbstractDatasource {
    sloCache: Cache<Promise<Array<Selectable>>>;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getConfiguredSLOs(target: any, timeFilter: TimeFilter): any;
    fetchSLOReport(target: any, timeFilter: any): any;
    extractSpecificValueFromSLI(target: any, sliResult: any, sloSpecific: any, timeFilter: TimeFilter): any;
    buildResultArray(result: any): any[][];
    splitAndPopulate(target: any, series: any, timeFilter: TimeFilter): any[];
    createTarget(target: any, datapoints: any, refId: any): {
        'target': any;
        'datapoints': any;
        'refId': any;
    };
}
