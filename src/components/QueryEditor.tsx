import React, { PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import { InstanaQuery } from '../types/instana_query';
import AdvancedSettings from './AdvancedSettings/AdvancedSettings';
import { FormLabel, Select } from '@grafana/ui';
import MetricCategories from '../lists/metric_categories';
import { SloInformation } from './SLOInformation/SloInformation';
import { InfrastructureBuiltIn } from './Infrastructure/BuiltIn/InfrastructureBuiltIn';
import _ from 'lodash';
import Metric from './Metric';

type Props = QueryEditorProps<DataSource, InstanaQuery, InstanaOptions>;

interface QueryState {
  availableMetrics: SelectableValue<string>[];
}

export class QueryEditor extends PureComponent<Props, QueryState> {
  query: InstanaQuery;

  constructor(props: Props) {
    super(props);
    const defaultQuery: Partial<InstanaQuery> = {
      constant: 6.5,
      metricCategory: MetricCategories[0]
    };
    this.query = Object.assign({}, defaultQuery, props.query);
    this.state = {
      availableMetrics: []
    }
  }

  onCategoryChange = (newCategory: SelectableValue<string>) => {
    this.query.metricCategory = newCategory;
    this.onRunQuery();
  }

  onRunQuery = () => {
    this.props.onChange(this.query);
    this.props.onRunQuery();
  }

  updateMetrics = (metrics: SelectableValue<string>[]) => {
    this.setState({availableMetrics: _.sortBy(metrics, 'key')});

    if (this.query.metric || this.query.showAllMetrics) {
      const metric = _.find(this.state.availableMetrics, m => m.key === this.query.metric.key);
      metric ? this.query.metric = metrics : this.query.metric = { key: null }
    }

    if (!this.query.metric) {
      this.query.metric = {
        key: null,
        label: "Please select (" + metrics.length + ")"
      }
    }

    this.props.onChange(this.query);
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

        {query.metricCategory.key === 0 &&
        <InfrastructureBuiltIn
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          updateMetrics={this.updateMetrics}
          datasource={this.props.datasource}
        />
        }

        {query.metricCategory.key === 7 &&
        <SloInformation
          query={query}
          onRunQuery={onRunQuery}
          onChange={this.props.onChange}
          datasource={this.props.datasource} />
        }

        {query.metricCategory.key !== 7 &&
        <Metric
          query={query}
          onChange={this.props.onChange}
          onRunQuery={onRunQuery}
          availableMetrics={this.state.availableMetrics}
          datasource={this.props.datasource}
        />
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
