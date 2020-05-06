import React, { ChangeEvent, PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { MyQuery } from '../types';

type Props = QueryEditorProps<DataSource, MyQuery, InstanaOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };

  onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, constant: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  render() {
    return (
      <div>
        <div className={'test'}>Some Text</div>
      </div>
    );
  }
}
