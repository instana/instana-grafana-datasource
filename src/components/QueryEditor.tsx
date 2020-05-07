import React, { ChangeEvent, PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import { AdvancedSettings } from './AdvancedSettings';
import { FormLabel, Select } from "@grafana/ui";
import MetricCategories from '../lists/metric_categories';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  metricCatgory: SelectableValue;
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = { constant: 6.5 };
    this.query = Object.assign({}, defaultQuery, props.query);
    this.state = {
      metricCatgory: MetricCategories[0]
    }
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
    this.setState({
      metricCatgory: newCategory
    })
  };

  render() {
    return (
      <div>
        <div className={'gf-form'}>
          <FormLabel width={14} tooltip={'Select a metric category.'}>Category</FormLabel>
          <Select
            width={30}
            isSearchable={true}
            options={MetricCategories}
            onChange={this.onCategoryChange}
            value={this.state.metricCatgory}
          />
        </div>

        <br />



        <br />

          <AdvancedSettings  metricCategory={this.state.metricCatgory} />
      </div>
    );
  }
}
