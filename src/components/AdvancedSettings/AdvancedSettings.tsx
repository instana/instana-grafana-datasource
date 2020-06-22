import { Switch, FormField } from '@grafana/ui';
import React, { ChangeEvent, FormEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { AggregateQuery } from './AggregateQuery';

const legendFormatPlaceholders = [
  '$label (on host $host)',
  '$label (on host $host)',
  '$label ($application) - $key',
  '$label ($website) - $key',
  '$label ($application) - $key',
  '',
  '',
  '',
];

const legendFormatTooltips = [
  <div>
    Default: $label (on host $host)
    <ul>
      <li>• $label - entity label</li>
      <li>• $host - corresponding host</li>
      <li>• $pid - corresponding PID</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $type - entity type</li>
      <li>• $service - service label</li>
      <li>• $name - label alternative</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div>
    Default: $label (on host $host)
    <ul>
      <li>• $label - entity label</li>
      <li>• $host - corresponding host</li>
      <li>• $pid - corresponding PID</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $type - entity type</li>
      <li>• $service - service label</li>
      <li>• $name - label alternative</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div>
    Default: $label ($application) - $key
    <ul>
      <li>• $label - entity label</li>
      <li>• $application - application label</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $key - metric key with aggregation and rollup</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div>
    Default: $label ($website) - $key
    <ul>
      <li>• $label - entity label</li>
      <li>• $website - application label</li>
      <li>• $type - entity type</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $key - metric key with aggregation and rollup</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div>
    Default: $label ($application) - $key
    <ul>
      <li>• $label - entity label</li>
      <li>• $application - application label</li>
      <li>• $service - service label</li>
      <li>• $endpoint - endpoint label</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $key - metric key with aggregation and rollup</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  '',
  '',
  '',
];

interface AdvancedSettingsState {
  showAdditionalSettings: boolean;
  legendFormatPlaceholder: string;
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;
}

export default class AdvancedSettings extends React.Component<Props, AdvancedSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showAdditionalSettings: false,
      legendFormatPlaceholder: this.setLegendFormatPlaceholder(),
    };
  }

  onLegendFormatChange = (eventItem: FormEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.labelFormat = eventItem.currentTarget.value;
    onChange(query);
  };

  onTimeShiftChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    query.timeShift = eventItem.currentTarget.value;
    this.props.onRunQuery();
  };

  setLegendFormatPlaceholder(): string {
    const { query } = this.props;
    return legendFormatPlaceholders[query.metricCategory.key];
  }

  setLegendFormatTooltip() {
    const { query } = this.props;
    return legendFormatTooltips[query.metricCategory.key];
  }

  render() {
    const { query, onRunQuery, onChange } = this.props;

    return (
      <div>
        <Switch
          labelClass={'width-14'}
          tooltipPlacement={'top'}
          label={'Show advanced settings'}
          tooltip={'Show all additional settings'}
          checked={this.state.showAdditionalSettings}
          onChange={() => this.setState({ showAdditionalSettings: !this.state.showAdditionalSettings })}
        />

        <div hidden={!this.state.showAdditionalSettings}>
          <div hidden={query.metricCategory.key === 7}>
            <FormField
              labelWidth={14}
              inputWidth={30}
              label={'Legend format'}
              value={query.labelFormat}
              placeholder={this.setLegendFormatPlaceholder()}
              onChange={(event) => this.onLegendFormatChange(event)}
              onBlur={() => onRunQuery()}
              tooltip={this.setLegendFormatTooltip()}
            />
          </div>

          <FormField
            labelWidth={14}
            inputWidth={30}
            placeholder={'1h'}
            label={'Time shift'}
            value={query.timeShift}
            onChange={(event) => this.onTimeShiftChange(event)}
            tooltip={
              'Specify the amount of hours that shall be used. The time shift function always go back in time, not forward. Accepts values such as 1s, 1m, 1h, 1d, 1w.'
            }
          />

          <div hidden={query.metricCategory.key !== 0 && query.metricCategory.key !== 1}>
            <AggregateQuery query={query} onRunQuery={onRunQuery} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}
