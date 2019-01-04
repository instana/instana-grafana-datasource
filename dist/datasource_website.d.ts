import AbstractDatasource from './datasource_abstract';
import Cache from './cache';
export default class InstanaWebsiteDataSource extends AbstractDatasource {
    websitesCache: Cache;
    maximumNumberOfUsefulDataPoints: number;
    sensibleGranularities: number[];
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getWebsites(timeFilter: any): any;
    getWebsiteTags(): any;
    getWebsiteMetricsCatalog(): any;
    fetchMetricsForEntity(target: any, timeFilter: any): any;
    getChartGranularity(windowSize: any): number;
    createTagFilter(filter: any): {
        name: any;
        operator: any;
        value: any;
    };
}
