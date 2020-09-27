import { InstanaOptions } from './types/instana_options';
import {  DataSourcePlugin } from '@grafana/data';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { InstanaQuery } from './types/instana_query';
import { DataSource } from 'datasources/DataSource';


export const plugin = new DataSourcePlugin<DataSource, InstanaQuery, InstanaOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
