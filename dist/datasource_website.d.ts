import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import TagFilter from './types/tag_filter';
import Cache from './cache';
export default class InstanaWebsiteDataSource extends AbstractDatasource {
    websitesCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    sensibleGranularities: number[];
    OPERATOR_NUMBER: string;
    OPERATOR_BOOLEAN: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getWebsites(timeFilter: TimeFilter): Promise<Selectable[]>;
    getWebsiteTags(): Selectable[];
    getWebsiteMetricsCatalog(): Selectable[];
    fetchMetricsForWebsite(target: any, timeFilter: TimeFilter): any;
    getChartGranularity(windowSize: number): number;
    createTagFilter(filter: TagFilter): {
        name: string;
        operator: string;
        value: string;
    };
    readItemMetrics(target: any, response: any): any;
    buildLabel(target: any, item: any, key: any, index: any): string;
}
