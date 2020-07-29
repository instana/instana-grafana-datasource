import React, { ChangeEvent, FormEvent } from 'react';

import {
  BUILT_IN_METRICS,
  CUSTOM_METRICS,
  SLO_INFORMATION
} from '../../GlobalVariables';
import { FreeTextMetrics } from '../Infrastructure/Custom/FreeTextMetrics';
import { InstanaQuery } from '../../types/instana_query';
import { AggregateQuery } from './AggregateQuery';
import FormSwitch from '../FormField/FormSwitch';
import FormInput from '../FormField/FormInput';

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

  deboundedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onLegendFormatChange = (eventItem: FormEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.labelFormat = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.deboundedRunQuery();
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
        <div className={'gf-form'}>
          <FormSwitch
            label={'Show advanced settings'}
            tooltip={'Show all additional settings'}
            value={this.state.showAdditionalSettings}
            onChange={() => this.setState({ showAdditionalSettings: !this.state.showAdditionalSettings })}
          />
        </div>

        <div hidden={!this.state.showAdditionalSettings}>
          <div className={'gf-form'} hidden={query.metricCategory.key === SLO_INFORMATION}>
            <FormInput
              queryKeyword
              inputWidth={0}
              label={'Legend format'}
              tooltip={this.setLegendFormatTooltip()}
              value={query.labelFormat}
              placeholder={this.setLegendFormatPlaceholder()}
              onChange={(event) => this.onLegendFormatChange(event)}
            />
          </div>

          <div className={'gf-form'}>
            <FormInput
              queryKeyword
              inputWidth={0}
              label={'Time shift'}
              tooltip={'Specify the amount of hours that shall be used. The time shift function always go back in time, not forward. Accepts values such as 1s, 1m, 1h, 1d, 1w.'}
              value={query.timeShift}
              placeholder={'1h'}
              onChange={(event) => this.onTimeShiftChange(event)}
            />
          </div>

          <div hiddden={query.metricCategory.key === CUSTOM_METRICS}>
            <FreeTextMetrics  query={query} onRunQuery={onRunQuery} onChange={onChange} />
          </div>

          <div hidden={query.metricCategory.key !== BUILT_IN_METRICS && query.metricCategory.key !== CUSTOM_METRICS}>
            <AggregateQuery query={query} onRunQuery={onRunQuery} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}
