import React from 'react';
import { DataSource } from '../../datasources/DataSource';
import { SelectableValue } from '@grafana/data';
import { InstanaQuery } from '../../types/instana_query';
import { InlineFormLabel, MultiSelect } from '@grafana/ui';
import FormSwitch from '../FormField/FormSwitch';
import { INSTANA_EVENT_TYPES } from '../../datasources/DataSource_Events';

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  onRunQuery(): void;
}

export class InstanaEvents extends React.Component<Props> {

  private get eventTypeOptions(): Array<SelectableValue<string>> {
    return INSTANA_EVENT_TYPES.map((t) => ({ label: t.label, value: t.key as string }));
  }

  private get selectedEventTypes(): Array<SelectableValue<string>> {
    const filters: string[] = this.props.query.eventTypeFilters ?? [];
    return filters.map((key) => {
      const match = INSTANA_EVENT_TYPES.find((t) => t.key === key);
      return { label: match ? match.label : key, value: key };
    });
  }

  onEventTypeChange = (selected: Array<SelectableValue<string>>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.eventTypeFilters = selected.map((s) => s.value as string);
    onChange(query);
    onRunQuery();
  };

  onFilterEventUpdatesChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.filterEventUpdates = e.currentTarget.checked;
    onChange(query);
    onRunQuery();
  };

  onExcludeTriggeredBeforeChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.excludeTriggeredBefore = e.currentTarget.checked;
    onChange(query);
    onRunQuery();
  };

  onIncludeMetadataChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.includeMetadata = e.currentTarget.checked;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div>
        <div className="gf-form">
          <InlineFormLabel
            className="query-keyword"
            width={14}
            tooltip={
              'Optionally filter by event type. Allowed values: INCIDENT, ISSUE, CHANGE. ' +
              'Leave empty to retrieve all event types.'
            }
          >
            Event Type Filter
          </InlineFormLabel>
          <MultiSelect
            menuPlacement="bottom"
            placeholder="All event types"
            options={this.eventTypeOptions}
            value={this.selectedEventTypes}
            onChange={this.onEventTypeChange}
            closeMenuOnSelect={false}
          />
        </div>

        <div className="gf-form">
          <FormSwitch
            queryKeyword
            label={'Filter Event Updates'}
            tooltip={'Only return events with state changes within the selected timeframe.'}
            value={query.filterEventUpdates ?? false}
            onChange={this.onFilterEventUpdatesChange}
          />
          <FormSwitch
            queryKeyword
            label={'Exclude Triggered Before'}
            tooltip={
              'Exclude events whose start time falls before the selected timeframe, ' +
              'including events with state changes within it.'
            }
            value={query.excludeTriggeredBefore ?? false}
            onChange={this.onExcludeTriggeredBeforeChange}
          />
          <FormSwitch
            queryKeyword
            label={'Include Metadata'}
            tooltip={'Include additional event metadata in the response.'}
            value={query.includeMetadata ?? false}
            onChange={this.onIncludeMetadataChange}
          />
        </div>
      </div>
    );
  }
}
