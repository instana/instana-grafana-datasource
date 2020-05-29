import React from 'react';
import { InstanaQuery } from '../types/instana_query';
import { FormLabel, Select, Switch } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import _ from 'lodash';
import max_metrics from '../lists/max_metrics';

interface MetricState {
  possibleTimeIntervals: SelectableValue<string>[];
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  availableMetrics: SelectableValue<string>[];

  updateMetrics(metrics: SelectableValue<string>[]): void;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;
}

export default class Metric extends React.Component<Props, MetricState> {
  constructor(props: any) {
    super(props);
    this.state = {
      possibleTimeIntervals: []
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    if (query.entityQuery && query.entityType && query.entityType.key) {
      datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then(results => {
        this.props.updateMetrics(results);
      });
    } else {
      query.metric = {
        key: null,
        label: '-'
      }

      onChange(query);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<MetricState>, snapshot?: any) {
    const { query, datasource } = this.props;
    if (!query.timeInterval || !_.find(datasource.availableTimeIntervals, interval => interval === query.timeInterval)) {
      query.timeInterval = datasource.getDefaultTimeInterval(query);
    }
  }

  onMetricChange = (metric: SelectableValue<string>) => {
    const { query, onRunQuery, onChange } = this.props;
    query.metric = metric;

    if (query.displayMaxMetricValue && !this.canShowMaxMetricValue()) {
      query.displayMaxMetricValue = false;
    }

    onChange(query);
    onRunQuery();
  };

  canShowMaxMetricValue() {
    const { query } = this.props;
    return query.entityType &&
      query.entityType.key === 'host' &&
      query.metric &&
      _.find(max_metrics, m => m.key === query.metric.key);
  }

  onTimeIntervalChange = (timeInterval: SelectableValue<string>) => {
    const { query, onRunQuery, onChange } = this.props;
    query.timeInterval = timeInterval;
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
  }

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
    return query.metricCategory.key >= 2 || this.isPluginThatSupportsAggregation();
  }

  isPluginThatSupportsAggregation() {
    const { query } = this.props;
    return query.pluginId === 'singlestat' || query.pluginId === 'gauge' || query.pluginId === 'table';
  }

  render() {
    const { query, datasource } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select the metric you wish to plot.'}>Metric</FormLabel>
        <div style={query.showAllMetrics ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
          <Select
            width={30}
            isSearchable={false}
            value={query.metric}
            onChange={this.onMetricChange}
            options={this.props.availableMetrics}>
          </Select>
        </div>

        {query.metricCategory.key === 0 &&
        <div style={!this.canShowMaxMetricValue() ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
          <Switch
            label={'Show max value'}
            labelClass={'width-10'}
            checked={query.displayMaxMetricValue}
            tooltipPlacement={'top'}
            onChange={this.onShowMaxValueChange}
            tooltip={
              'Displays the maximal value of current metric. Supported for \'Type=Host\' with cpu.used, memory.used and openFiles.used only.'
            }
          />
        </div>
        }

        {query.metricCategory.key === 1 &&
        <div style={!query.canShowAllMetrics ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
          <Switch
            label={'Show all metrics'}
            labelClass={'width-10'}
            checked={query.showAllMetrics}
            tooltipPlacement={'top'}
            onChange={this.onShowAllMetricsChange}
            tooltip={
              'You have the option to show all metrics in the graph once the amount of possible, selectable metrics is between 1 and 5.'
            }
          />
        </div>
        }

        {query.metricCategory.key > 1 &&
        <FormLabel width={8} tooltip={'Select a metric aggregation.'}>Aggregation</FormLabel>
        }

        {this.canShowAggregation() &&
        <Select
          width={8}
          isSearchable={false}
          value={query.aggregation}
          onChange={this.onMetricChange}
          options={this.props.availableMetrics}
        />
        }

        <FormLabel width={6} tooltip={'Select the rollup value.'}>Rollup</FormLabel>
        <Select
          width={8}
          isSearchable={false}
          value={query.timeInterval}
          onChange={this.onTimeIntervalChange}
          options={datasource.availableTimeIntervals}
        />
      </div>
    );
  }

}