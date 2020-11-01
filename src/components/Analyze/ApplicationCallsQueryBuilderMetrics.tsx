import React, { ChangeEvent } from 'react';

import { ANALYZE_APPLICATION_METRICS } from '../../GlobalVariables';
import { Input, Select, InlineFormLabel } from '@grafana/ui';
import FormTextArea from 'components/FormField/FormTextArea';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormWrapper from '../FormField/FormWrapper';
import { SelectableValue } from '@grafana/data';
import Entity from '../Entity/Entity';
import _ from 'lodash';
import '../plugin.css';

interface State {}

interface Props {
  query: InstanaQuery;

  groups: SelectableValue[];

  updateGroups(groups: SelectableValue[]): void;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue[]): void;

  datasource: DataSource;
}

let isUnmounting = false;

export class ApplicationCallsQueryBuilderMetrics extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;

    datasource.dataSourceApplication.getApplicationTags().then((applicationTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(applicationTags, 'key'));

        // select a meaningful default group
        if (!query.group || !query.group.key) {
          query.group = _.find(applicationTags, ['key', 'endpoint.name']);
          onChange(query);
        }
      }
    });

    this.props.updateMetrics(datasource.dataSourceApplication.getApplicationMetricsCatalog());
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onGroupChange = (group: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.group = group;

    if (query.group && query.metricCategory.key === ANALYZE_APPLICATION_METRICS) {
      query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
    }

    if (!query.showGroupBySecondLevel) {
      query.groupbyTagSecondLevelKey = '';
    }

    onChange(query);
    onRunQuery();
  };

  onCallToEntityChange = (callToEntity: string) => {
    const { query, onChange, onRunQuery } = this.props;
    query.callToEntity = callToEntity;
    onChange(query);
    onRunQuery();
  };

  onFilterChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    console.log(eventItem);
    query.tagFilterExpression = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  }

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  render() {
    const { query, groups } = this.props;

    return (
      <div>
        <div className={'gf-form'}>
          <FormTextArea
            queryKeyword
            inputWidth={0}
            label={'Filter'}
            tooltip={'Filter.'}
            value={query.tagFilterExpression}
            onChange={this.onFilterChange}
          />
        </div>

        <div className={'gf-form'}>
          <FormWrapper stretch={true}>
            <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Group by tag.'}>
              Group by
            </InlineFormLabel>
            <Entity value={query.callToEntity} onChange={this.onCallToEntityChange} />
            <Select
              menuPlacement={'bottom'}
              width={0}
              isSearchable={true}
              options={groups}
              value={query.group}
              onChange={this.onGroupChange}
            />
          </FormWrapper>

          <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
            <Input
              css={''}
              type={'text'}
              value={query.groupbyTagSecondLevelKey}
              onChange={this.onGroupByTagSecondLevelKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
