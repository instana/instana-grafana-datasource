import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import { QueryType } from './QueryType';

interface InfrastructureBuiltInState {}

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

let isUnmounting = false;

export class Infrastructure extends React.Component<Props, InfrastructureBuiltInState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { query, onChange, datasource } = this.props;
    isUnmounting = false;

    if (query.entityQuery && query.entityType && query.entityType.key) {
      datasource.dataSourceInfrastructure
        .getMetricsCatalog(query.entityType, query.metricCategory.key)
        .then((results) => {
          if (!isUnmounting) {
            this.props.updateMetrics(results);
          }
        });
    } else {
      query.metric = {
        key: null,
        label: '-',
      };
    }

    onChange(query);
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  render() {
    const {
      query,
      onRunQuery,
      onChange,
      updateMetrics,
      loadEntityTypes,
      datasource,
      queryTypes,
      updateQueryTypes
    } = this.props;

    return (
      <QueryType
        query={query}
        onChange={onChange}
        queryTypes={queryTypes}
        onRunQuery={onRunQuery}
        datasource={datasource}
        updateMetrics={updateMetrics}
        loadEntityTypes={loadEntityTypes}
        updateQueryTypes={updateQueryTypes}
      />
    );
  }
}
