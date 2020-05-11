import React, { ChangeEvent, PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import { AdvancedSettings } from './AdvancedSettings';
import { FormLabel, Select } from "@grafana/ui";
import MetricCategories from '../lists/metric_categories';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = { constant: 6.5, metricCategory: MetricCategories[0] };
    this.query = Object.assign({}, defaultQuery, props.query);
  }

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

  onCategoryChange = (newCategory: SelectableValue<string>) => {
    this.query.metricCategory = newCategory;
    this.onRunQuery();
  };

  onRunQuery = () => {
    const { query } = this;
    this.props.onChange(query);
    this.props.onRunQuery();
  }

  render() {
    return (
      <div>
        <div className={'gf-form'}>
          <FormLabel width={14} tooltip={'Select a metric category.'}>Category</FormLabel>
          <Select
            width={30}
            isSearchable={false}
            options={MetricCategories}
            onChange={this.onCategoryChange}
            value={this.query.metricCategory}
          />
        </div>

        <br/>


        <br/>

        <AdvancedSettings query={this.query} onChange={this.props.onChange} onRunQuery={this.onRunQuery}/>
      </div>
    );
  }
}
