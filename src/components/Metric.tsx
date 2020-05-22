import React from 'react';
import { InstanaQuery } from '../types/instana_query';
import { FormLabel, Select, Switch } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../datasources/DataSource';
import _ from 'lodash';

interface MetricState {
  possibleTimeIntervals: SelectableValue<string>[];
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  availableMetrics: SelectableValue<string>[];

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

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<MetricState>, snapshot?: any) {
    const { query, datasource } = this.props;
    if (!query.timeInterval || !_.find(datasource.availableTimeIntervals, interval => interval === query.timeInterval)) {
      query.timeInterval = datasource.getDefaultTimeInterval(query);
    }
  }

  onMetricChange = (metric: SelectableValue<string>) => {
    const { query, onRunQuery } = this.props;
    query.metric = metric;
    onRunQuery();
  };

  onTimeIntervalChange = (timeInterval: SelectableValue<string>) => {
    const { query, onRunQuery } = this.props;
    query.timeInterval = timeInterval;
    onRunQuery();
  };

  render() {
    const { query, datasource } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select the metric you wish to plot.'}>Metric</FormLabel>
        <Select
          width={30}
          isSearchable={false}
          value={query.metric}
          onChange={this.onMetricChange}
          options={this.props.availableMetrics}>
        </Select>

        {query.metricCategory.key === 0 &&
          <Switch
          label={'Show max value'}
          labelClass={'width-10'}
          checked={false}
          tooltipPlacement={'top'}
          onChange={event => console.log(event)}
          tooltip={
            'Displays the maximal value of current metric. Supported for \'Type=Host\' with cpu.used, memory.used and openFiles.used only.'
          }
          />
        }

        {query.metricCategory.key > 1 &&
        <FormLabel width={8} tooltip={'Select a metric aggregation.'}>Aggregation</FormLabel>
        }

        {query.metricCategory.key > 1 &&
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
