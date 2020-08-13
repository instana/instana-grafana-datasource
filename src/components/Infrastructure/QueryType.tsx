import React, { ChangeEvent } from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { PLEASE_SPECIFY } from '../../GlobalVariables';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import FormInput from '../FormField/FormInput';
import _ from 'lodash';

interface QueryTypeState {}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  queryTypes: SelectableValue[];
  onRunQuery(): void;
  loadEntityTypes(filterResult?: boolean): void;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
  updateQueryTypes(types: SelectableValue[]): void;
}

export class QueryType extends React.Component<Props, QueryTypeState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { query, loadEntityTypes } = this.props;
    if (query.entityQuery) {
      loadEntityTypes();
    }
  }

  onQueryChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange, updateQueryTypes } = this.props;
    if (eventItem.currentTarget && eventItem.currentTarget.value) {
      query.entityQuery = eventItem.currentTarget.value;
    } else {
      updateQueryTypes([]);
      query.entityQuery = '';
      query.entityType = { key: null, label: '-' };
    }

    onChange(query);

    // loadEntityTypes with 500ms delay after last debounce
    this.debouncedEntityTypes();
  };

  onTypeChange = (eventItem: SelectableValue) => {
    const { query, datasource, onChange } = this.props;
    query.entityType = eventItem;
    onChange(query);

    datasource.dataSourceInfrastructure
      .getMetricsCatalog(query.entityType, query.metricCategory.key)
      .then((results) => {
        this.props.updateMetrics(results);
      });
  };

  debouncedEntityTypes = _.debounce(this.props.loadEntityTypes, 500);

  render() {
    const { query, queryTypes } = this.props;

    return (
      <div className={'gf-form'}>
        <FormInput
          queryKeyword
          inputWidth={0}
          label={'Query'}
          tooltip={
            <div>
              Specify a query for the entities you wish to plot. Use the dynamic focus syntax:
              <a href="https://docs.instana.io/core_concepts/dynamic_focus/#syntax">
                https://docs.instana.io/core_concepts/dynamic_focus/#syntax
              </a>
            </div>
          }
          value={query.entityQuery}
          placeholder={PLEASE_SPECIFY}
          onChange={this.onQueryChange}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          label={'Type'}
          tooltip={'Select an entity type for a list of available metrics.'}
          noOptionsMessage={'No types found with query'}
          value={query.entityType}
          options={queryTypes}
          onChange={this.onTypeChange}
        />
      </div>
    );
  }
}
