import { InstanaOptions } from './types/instana_options';
import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasources/DataSource';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { MyQuery } from './types';

export const plugin = new DataSourcePlugin<DataSource, MyQuery, InstanaOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
