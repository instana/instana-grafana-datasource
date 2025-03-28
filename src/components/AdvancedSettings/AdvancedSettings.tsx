import React, { ChangeEvent, FormEvent } from 'react';

import { BUILT_IN_METRICS, CUSTOM_METRICS, INFRASTRUCTURE_ANALYZE, SLO_INFORMATION } from '../../GlobalVariables';
import { FreeTextMetrics } from '../Infrastructure/Custom/FreeTextMetrics';
import { InstanaQuery } from '../../types/instana_query';
import { AggregateQuery } from './AggregateQuery';
import FormSwitch from '../FormField/FormSwitch';
import FormInput from '../FormField/FormInput';
import _ from 'lodash';

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
  <div key="builtIn">
    Default: $label (on host $host)
    <ul>
      <li>• $label - entity label</li>
      <li>• $host - corresponding host MAC address</li>
      <li>• $pid - corresponding PID</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $type - entity type</li>
      <li>• $name - label alternative</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div key="custom">
    Default: $label (on host $host)
    <ul>
      <li>• $label - entity label</li>
      <li>• $host - corresponding host MAC address</li>
      <li>• $pid - corresponding PID</li>
      <li>• $timeShift - corresponding timeShift</li>
      <li>• $metric - displayed metric</li>
      <li>• $type - entity type</li>
      <li>• $name - label alternative</li>
      <li>• $index - index in the list</li>
    </ul>
  </div>,
  <div key="application">
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
  <div key="website">
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
  <div key="endpoint">
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
  legendFormatPlaceholder: string;
}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  loadEntityTypes(filterResult?: boolean): void;
}

export default class AdvancedSettings extends React.Component<Props, AdvancedSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      legendFormatPlaceholder: this.setLegendFormatPlaceholder(),
    };
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onLegendFormatChange = (eventItem: FormEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.labelFormat = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  onTimeShiftChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.timeShift = eventItem.currentTarget.value;

    if (query.timeShift) {
      query.timeShiftIsValid = query.timeShift.match(/\d+[m,s,h,d,w]{1}/) ? true : false;
    } else {
      query.timeShiftIsValid = true;
    }

    onChange(query);

    if (query.timeShiftIsValid) {
      // onRunQuery with 500ms delay after last debounce
      this.debouncedRunQuery();
    }
  };

  setLegendFormatPlaceholder(): string {
    const { query } = this.props;
    return legendFormatPlaceholders[query.metricCategory.key];
  }

  setLegendFormatTooltip() {
    const { query } = this.props;
    return legendFormatTooltips[query.metricCategory.key];
  }

  onShowAdvancedSettingsChange = (event: React.SyntheticEvent<HTMLInputElement> | undefined) => {
    if (event && event.currentTarget) {
      const { query, onChange } = this.props;
      query.showAdvancedSettings = event.currentTarget.checked;
      onChange(query);
    }
  };

  render() {
    const { query, onRunQuery, onChange, loadEntityTypes } = this.props;
    const category = query.metricCategory.key;

    return (
      <div>
        <div className={'gf-form'}>
          <FormSwitch
            label={'Show advanced settings'}
            tooltip={'Show all additional settings'}
            value={query.showAdvancedSettings}
            onChange={(e) => this.onShowAdvancedSettingsChange(e)}
          />
        </div>

        <div hidden={!query.showAdvancedSettings}>
          <div className={'gf-form'} hidden={category === SLO_INFORMATION || category === INFRASTRUCTURE_ANALYZE}>
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
              tooltip={
                'Specify the amount of hours that shall be used. The time shift function always go back in time, ' +
                'not forward. Accepts values such as 1s, 1m, 1h, 1d, 1w.'
              }
              value={query.timeShift}
              invalid={!query.timeShiftIsValid}
              placeholder={'1h'}
              onChange={(event) => this.onTimeShiftChange(event)}
            />
          </div>

          <div hidden={category !== CUSTOM_METRICS}>
            <FreeTextMetrics
              query={query}
              onRunQuery={onRunQuery}
              onChange={onChange}
              loadEntityTypes={loadEntityTypes}
            />
          </div>

          <div hidden={category !== BUILT_IN_METRICS && category !== CUSTOM_METRICS}>
            <AggregateQuery query={query} onRunQuery={onRunQuery} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}
