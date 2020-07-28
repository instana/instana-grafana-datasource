import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import max_metrics from '../../lists/max_metrics';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import { Switch } from '@grafana/ui';
import _ from 'lodash';

interface MetricState {
  possibleTimeIntervals: SelectableValue[];
  possibleAggregations: SelectableValue[];
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  availableMetrics: SelectableValue[];

  updateMetrics(metrics: SelectableValue[]): void;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;
}

export default class Metric extends React.Component<Props, MetricState> {
  constructor(props: any) {
    super(props);
    this.state = {
      possibleTimeIntervals: [],
      possibleAggregations: [],
    };
  }

  componentDidMount() {
    const { query, datasource } = this.props;

    if (!query.timeInterval || !query.timeInterval.key) {
      query.timeInterval = datasource.getDefaultTimeInterval(query);
    }
  }

  onMetricChange = (metric: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.metric = metric;

    if (query.metric && query.metric.key && !_.includes(query.metric.aggregations, query.aggregation)) {
      query.aggregation = query.metric.aggregations[0];
    }

    if (query.displayMaxMetricValue && !this.canShowMaxMetricValue()) {
      query.displayMaxMetricValue = false;
    }

    onChange(query);
    onRunQuery();
  };

  canShowMaxMetricValue() {
    const { query } = this.props;
    return query.entityType && query.entityType.key === 'host' && query.metric && _.find(max_metrics, (m) => m.key === query.metric.key);
  }

  onTimeIntervalChange = (timeInterval: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.timeInterval = timeInterval;
    onChange(query);
    onRunQuery();
  };

  onAggregationChange = (aggregation: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.aggregation = aggregation;
    onChange(query);
    onRunQuery();
  };

  onShowMaxValueChange = (event?: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    if (event && event.currentTarget && event.currentTarget.value) {
      query.displayMaxMetricValue = !query.displayMaxMetricValue;
      onChange(query);
      onRunQuery();
    }
  };

  onShowAllMetricsChange = (event?: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    if (event && event.currentTarget && event.currentTarget.value) {
      query.showAllMetrics = !query.showAllMetrics;
      onChange(query);
      onRunQuery();
    }
  };

  canShowAggregation() {
    const { query } = this.props;
    return query.metricCategory.key >= 2;
  }

  render() {
    const { query, datasource } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormSelect
          queryKeyword
          label={'Metric'}
          value={query.metric}
          options={this.props.availableMetrics}
          onChange={this.onMetricChange}
          tooltip={'Select the metric you wish to plot.'}
        />

        {query.metricCategory.key === 0 && (
          <div style={!this.canShowMaxMetricValue() ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
            <Switch
              label={'Show max value'}
              labelClass={'width-10'}
              checked={query.displayMaxMetricValue}
              tooltipPlacement={'top'}
              onChange={this.onShowMaxValueChange}
              tooltip={"Displays the maximal value of current metric. Supported for 'Type=Host' with cpu.used, memory.used and openFiles.used only."}
            />
          </div>
        )}

        {query.metricCategory.key === 1 && (
          <div style={!query.canShowAllMetrics ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
            <Switch
              label={'Show all metrics'}
              labelClass={'width-10'}
              checked={query.showAllMetrics}
              tooltipPlacement={'top'}
              onChange={this.onShowAllMetricsChange}
              tooltip={'You have the option to show all metrics in the graph once the amount of possible, selectable metrics is between 1 and 5.'}
            />
          </div>
        )}

        <FormSelect
          queryKeyword
          hidden={this.canShowAggregation()}
          label={'Aggregation'}
          labelWidth={6}
          inputWidth={8}
          value={query.aggregation}
          options={query.metric.aggregations}
          onChange={this.onAggregationChange}
          tooltip={'Select a metric aggregation.'}
        />

        <FormSelect
          queryKeyword
          label={'Rollup'}
          labelWidth={6}
          inputWidth={8}
          value={query.timeInterval}
          options={this.props.onTimeIntervalChange}
          onChange={datasource.onTimeIntervalChange}
          tooltip={'Select the rollup value.'}
        />

      </div>
    );
  }
}
