import { DataSourceJsonData } from '@grafana/data';

/**
 * These are options configured for each DataSource instance
 */
export interface InstanaOptions extends DataSourceJsonData {
  url: string;
  apiToken: string;
  useProxy: boolean;
  showOffline: boolean;
  allowInfraExplore: boolean;
  queryinterval_limit_infra?: number;
  queryinterval_limit_app_metrics?: number;
  queryinterval_limit_app_calls?: number;
  queryinterval_limit_website_metrics?: number;
}
