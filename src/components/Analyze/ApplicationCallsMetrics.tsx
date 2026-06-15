import React, { ChangeEvent } from 'react';

import { ALL_APPLICATIONS, ANALYZE_APPLICATION_METRICS } from '../../GlobalVariables';
import call_to_entities from '../../lists/apply_call_to_entities';
import { Input, Select, InlineFormLabel } from '@grafana/ui';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormWrapper from '../FormField/FormWrapper';
import { SelectableValue } from '@grafana/data';
import Entity from '../Entity/Entity';
import _ from 'lodash';
import '../plugin.css';

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

    const entityValue = query.entity?.key || query.entity?.label;
    const isEntityVariable = entityValue && typeof entityValue === 'string' && entityValue.includes('$');

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

        if (!query.callToEntity) {
          query.callToEntity = call_to_entities[0];
        }
        if (!query.applicationCallToEntity) {
          query.applicationCallToEntity = call_to_entities[0];
        }

        onChange(query);

        if (isEntityVariable && query.entity) {
          this.props.onRunQuery();
        }
      }
    });

    datasource.fetchApplicationTags().then((applicationTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(applicationTags, 'key'));

        const groupKey = query.group?.key || query.group?.value || query.group?.label;
        const isGroupVariable = groupKey && typeof groupKey === 'string' && groupKey.includes('$');

        if (!query.group || (!query.group.key && !isGroupVariable)) {
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

  onApplicationChange = (application: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    if (typeof application === 'string') {
      query.entity = { key: application, label: application };
    } else {
      query.entity = application;
    }

    onChange(query);
    onRunQuery();
  };

  onGroupChange = (group: SelectableValue | string) => {
    const { query, onChange, onRunQuery, groups } = this.props;

    const currentGroupKey = query.group?.key || query.group?.value || query.group?.label;
    const isCurrentVariable = currentGroupKey && typeof currentGroupKey === 'string' && currentGroupKey.includes('$');

    if (isCurrentVariable && typeof group === 'object' && group.key && !group.key.includes('$')) {
      return;
    }

    if (typeof group === 'string') {
      const foundTag = _.find(groups, ['key', group]);
      if (foundTag) {
        query.group = foundTag;
      } else {
        query.group = { key: group, label: group };
      }
    } else {
      query.group = group;
    }

    if (query.group && query.metricCategory.key === ANALYZE_APPLICATION_METRICS) {
      query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
    }

    if (!query.showGroupBySecondLevel) {
      query.groupbyTagSecondLevelKey = '';
    }

    onChange(query);
    onRunQuery();
  };

  onApplicationCallToEntityChange = (applicationCallToEntity: string) => {
    const { query, onChange, onRunQuery } = this.props;
    query.applicationCallToEntity = applicationCallToEntity;
    onChange(query);
    onRunQuery();
  };

  onCallToEntityChange = (callToEntity: string) => {
    const { query, onChange, onRunQuery } = this.props;
    query.callToEntity = callToEntity;
    onChange(query);
    onRunQuery();
  };

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  render() {
    const { query, groups } = this.props;

    let entityValue = query.entity;
    if (query.entity && query.entity.key) {
      entityValue = {
        ...query.entity,
        value: query.entity.key,
        label: query.entity.label || query.entity.key,
      };
    }

    let groupValue = query.group;
    if (query.group && query.group.key) {
      groupValue = {
        ...query.group,
        value: query.group.key,
        label: query.group.label || query.group.key,
      };
    }

    return (
      <div className={'gf-form'}>
        <FormWrapper stretch={true}>
          <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Select your application.'}>
            Application
          </InlineFormLabel>
          <Entity value={query.applicationCallToEntity} onChange={this.onApplicationCallToEntityChange} />
          <Select
            menuPlacement={'bottom'}
            width={0}
            isSearchable={true}
            value={entityValue}
            options={this.state.applications}
            onChange={this.onApplicationChange}
            allowCustomValue={true}
            placeholder={'Select or type $application'}
          />
        </FormWrapper>

        <FormWrapper stretch={true}>
          <InlineFormLabel
            className={'query-keyword'}
            width={7}
            tooltip={'Group by tag or type variable like $groupBy'}
          >
            Group by
          </InlineFormLabel>
          <Entity value={query.callToEntity} onChange={this.onCallToEntityChange} />
          <Select
            menuPlacement={'bottom'}
            width={0}
            isSearchable={true}
            options={groups}
            value={groupValue}
            onChange={this.onGroupChange}
            allowCustomValue={true}
            placeholder={'Select or type $groupBy'}
          />
        </FormWrapper>

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input
            type={'text'}
            value={query.groupbyTagSecondLevelKey}
            onChange={this.onGroupByTagSecondLevelKeyChange}
          />
        </div>
      </div>
    );
  }
}
