import React, { PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import { AdvancedSettings } from './AdvancedSettings';
import { FormLabel, Select } from "@grafana/ui";
import MetricCategories from '../lists/metric_categories';
import { SloInformation } from "./SloInformation";

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = { constant: 6.5, metricCategory: MetricCategories[0] };
    this.query = Object.assign({}, defaultQuery, props.query);
  }

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
    const { query, onRunQuery, onCategoryChange } = this;

    return (
      <div>
        <div className={'gf-form'}>
          <FormLabel width={14} tooltip={'Select a metric category.'}>Category</FormLabel>
          <Select
            width={30}
            isSearchable={false}
            options={MetricCategories}
            onChange={onCategoryChange}
            value={query.metricCategory}
          />
        </div>

        {query.metricCategory.key === 7 &&
          <SloInformation query={query} onRunQuery={onRunQuery} onChange={this.props.onChange} datasource={this.props.datasource} />
        }

        <AdvancedSettings
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
