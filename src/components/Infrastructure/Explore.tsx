import React, { ChangeEvent } from 'react';

import { PLEASE_SPECIFY } from '../../GlobalVariables';
import call_to_entities from '../../lists/apply_call_to_entities';
import { Input, Select, InlineFormLabel } from '@grafana/ui';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormWrapper from '../FormField/FormWrapper';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import '../plugin.css';

interface AnalyzeState {
  entityTypes: SelectableValue[];
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

export class Explore extends React.Component<Props, AnalyzeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      entityTypes: [],
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;
    datasource.getEntityTypes().then((entityTypes:SelectableValue[]) => {

      if (!isUnmounting) {
        if (!_.find(entityTypes, { key: null })) {
          entityTypes.unshift({ key: null, label: PLEASE_SPECIFY });
        }
        this.setState({
          entityTypes: entityTypes,
        });
        if (!query.entity || (!query.entity.key && !query.entity.label)) {
          query.entity = entityTypes[0];
        }
        if (!query.callToEntity) {
          query.callToEntity = call_to_entities[0];
        }
        if (!query.applicationCallToEntity) {
          query.applicationCallToEntity = call_to_entities[0];
        }
        onChange(query);
      }
    });
  }
  componentWillUnmount() {
    isUnmounting = true;
  }
  onEntityChange = (entityType: SelectableValue) => {
    const { query, datasource,onChange, onRunQuery } = this.props;
    query.entity = entityType;
    onChange(query);
    onRunQuery();
    datasource.fetchMetricsForEntityType(query).then((result: any) => {
      this.props.updateMetrics(result);
    });
  };
  onInfraCallToEntityChange = (applicationCallToEntity: string) => {
    const { query, onChange, onRunQuery } = this.props;
    query.applicationCallToEntity = applicationCallToEntity;
    onChange(query);
    onRunQuery();
  };
  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);
  onCallToEntityChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.callToEntity = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };
  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.group = { 
      key: eventItem.currentTarget.value,
      label: eventItem.currentTarget.value,
      type: 'STRING',
    }
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);
    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form'}>
        <FormWrapper stretch={true}>
          <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Select your Entity Type.'}>
            Entity types
          </InlineFormLabel>
          <Select
            menuPlacement={'bottom'}
            width={0}
            isSearchable={true}
            value={query.entity}
            options={this.state.entityTypes}
            onChange={this.onEntityChange}
          />
        </FormWrapper>
        <FormWrapper stretch={true}>
          <InlineFormLabel className={'query-keyword'} width={7} tooltip={'Enter the Group by tag.'}>
            Group by
          </InlineFormLabel>
          <Input
            type={'text'}
            value={query.groupbyTagSecondLevelKey}
            onChange={this.onGroupByTagSecondLevelKeyChange}
          />
        </FormWrapper>
      </div>
    );
  }
}
