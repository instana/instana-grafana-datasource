import AbstractDatasource from './datasource_abstract';
import TimeFilter from './types/time_filter';
import Selectable from './types/selectable';
import Cache from './cache';
export default class InstanaWebsiteDataSource extends AbstractDatasource {
    websitesCache: Cache<Promise<Array<Selectable>>>;
    maximumNumberOfUsefulDataPoints: number;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    getWebsites(timeFilter: TimeFilter): Promise<Selectable[]>;
    getWebsiteTags(): Selectable[];
    getWebsiteMetricsCatalog(): Selectable[];
    fetchAnalyzeMetricsForWebsite(target: any, timeFilter: TimeFilter): any;
    buildAnalyzeWebsiteLabel(target: any, item: any, key: any, index: any): string;
}
