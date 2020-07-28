import React, { ChangeEvent } from 'react';

import {
  ALL_APPLICATIONS,
  ANALYZE_APPLICATION_METRICS
} from '../../GlobalVariables';
import { Input, Select, LegacyForms, InlineFormLabel } from '@grafana/ui';
import call_to_entities from '../../lists/apply_call_to_entities';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';

const { Switch } = LegacyForms;

interface ApplicationCallsMetricsState {
  applications: SelectableValue[];
}

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

export class ApplicationCallsMetrics extends React.Component<Props, ApplicationCallsMetricsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      applications: [],
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;
    datasource.fetchApplications().then((applications) => {
      if (!isUnmounting) {
        if (!_.find(applications, { key: null })) {
          applications.unshift({ key: null, label: ALL_APPLICATIONS });
        }

        this.setState({
          applications: applications,
        });

        if (!query.entity || (!query.entity.key && !query.entity.label)) {
          query.entity = applications[0];
        }

        onChange(query);
      }
    });

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

  onApplicationChange = (application: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = application;
    onChange(query);
    onRunQuery();
  };

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

  onApplicationCallToEntityChange = (applicationCallToEntity: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.applicationCallToEntity = applicationCallToEntity;
    onChange(query);
    onRunQuery();
  };

  onCallToEntityChange = (callToEntity: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.callToEntity = callToEntity;
    onChange(query);
    onRunQuery();
  };

  deboundedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.deboundedRunQuery();
  };

  render() {
    const { query, groups } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Select your application.'}>
          Application
        </InlineFormLabel>
        <Select
          width={8}
          isSearchable={true}
          options={call_to_entities}
          defaultValue={call_to_entities[0]}
          value={query.applicationCallToEntity}
          onChange={this.onApplicationCallToEntityChange}
        />
        <Select width={20} isSearchable={true} value={query.entity} options={this.state.applications} onChange={this.onApplicationChange} />

        <InlineFormLabel className={'query-keyword'} width={7} tooltip={'Group by tag.'}>
          Group by
        </InlineFormLabel>
        <Select
          width={8}
          isSearchable={true}
          value={query.callToEntity}
          options={call_to_entities}
          defaultValue={call_to_entities[0]}
          onChange={this.onCallToEntityChange}
        />
        <Select width={20} options={groups} value={query.group} isSearchable={true} onChange={this.onGroupChange} />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input type={'text'} value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
