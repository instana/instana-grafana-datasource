import { InstanaOptions, SecureJsonData } from './types/instana_options';
import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasources/DataSource';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { InstanaQuery } from './types/instana_query';

export const plugin = new DataSourcePlugin<DataSource, InstanaQuery, InstanaOptions, SecureJsonData>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
