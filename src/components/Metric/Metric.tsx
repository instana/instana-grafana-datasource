import React from 'react';

import { BUILT_IN_METRICS, CUSTOM_METRICS, ANALYZE_APPLICATION_METRICS } from '../../GlobalVariables';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import max_metrics from '../../lists/max_metrics';
import FormSelect from '../FormField/FormSelect';
import FormSwitch from '../FormField/FormSwitch';
import { SelectableValue } from '@grafana/data';
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
    const { query, datasource, onChange } = this.props;

    if (!query.timeInterval || !query.timeInterval.key) {
      query.timeInterval = datasource.getDefaultTimeInterval(query);
    }

    onChange(query);
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

    query.allMetrics = [];
    query.showAllMetrics = false;

    onChange(query);
    onRunQuery();
  };

  canShowMaxMetricValue() {
    const { query } = this.props;
    return (
      query.entityType &&
      query.entityType.key === 'host' &&
      query.metric &&
      _.find(max_metrics, (m) => m.key === query.metric.key)
    );
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
    if (event && event.currentTarget) {
      query.displayMaxMetricValue = event.currentTarget.checked;
      onChange(query);
      onRunQuery();
    }
  };

  onShowAllMetricsChange = (event?: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    if (event && event.currentTarget) {
      query.showAllMetrics = event.currentTarget.checked;
      if (query.showAllMetrics) {
        query.metric = { key: null, label: `Displaying ${this.props.availableMetrics.length} metrics` };
        query.allMetrics = this.props.availableMetrics;
      }
      onChange(query);
      onRunQuery();
    }
  };

  canShowAggregation() {
    const { query } = this.props;
    return query.metricCategory.key >= ANALYZE_APPLICATION_METRICS;
  }

  canSelectAggregation() {
    const { query } = this.props;
    return query.metric && query.metric.aggregations && query.metric.aggregations.length > 1;
  }

  render() {
    const { query, datasource } = this.props;

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          disabled={query.useFreeTextMetrics}
          inputWidth={0}
          label={'Metric'}
          tooltip={'Select the metric you wish to plot.'}
          value={query.metric}
          noOptionsMessage={'No metrics found'}
          options={this.props.availableMetrics}
          onChange={this.onMetricChange}
        />

        {query.metricCategory.key === BUILT_IN_METRICS && (
          <FormSwitch
            queryKeyword
            disabled={!this.canShowMaxMetricValue()}
            labelWidth={9}
            label={'Show max value'}
            tooltip={
              "Displays the maximal value of current metric. Supported for 'Type=Host' with cpu.used, " +
              'memory.used and openFiles.used only.'
            }
            value={query.displayMaxMetricValue}
            onChange={this.onShowMaxValueChange}
          />
        )}

        {query.metricCategory.key === CUSTOM_METRICS && (
          <FormSwitch
            queryKeyword
            disabled={!query.canShowAllMetrics}
            labelWidth={9}
            label={'Show all metrics'}
            tooltip={
              'You have the option to show all metrics in the graph once the amount of possible, selectable ' +
              'metrics is between 1 and 5.'
            }
            value={query.showAllMetrics}
            onChange={this.onShowAllMetricsChange}
          />
        )}

        {this.canShowAggregation() && (
          <FormSelect
            queryKeyword
            disabled={!this.canSelectAggregation()}
            labelWidth={6}
            inputWidth={12}
            label={'Aggregation'}
            tooltip={'Select a metric aggregation.'}
            value={query.aggregation}
            options={query.metric.aggregations}
            onChange={this.onAggregationChange}
          />
        )}

        <FormSelect
          queryKeyword
          disabled={datasource.availableTimeIntervals.length <= 1}
          labelWidth={6}
          inputWidth={12}
          label={'Rollup'}
          tooltip={'Select the rollup value.'}
          value={query.timeInterval}
          options={datasource.availableTimeIntervals}
          onChange={this.onTimeIntervalChange}
        />
      </div>
    );
  }
}
