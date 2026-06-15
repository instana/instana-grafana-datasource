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

    const savedEntityType = query.entityType?.key ? query.entityType : query.entity?.key ? query.entity : undefined;

    if (savedEntityType && savedEntityType.key) {
      if (!query.entityType || !query.entityType.key) {
        query.entityType = savedEntityType;
      }

      if (!query.entity || !query.entity.key) {
        query.entity = savedEntityType;
      }

      // Only fetch metrics if entity type is not a variable
      const isVariable = typeof savedEntityType.key === 'string' && savedEntityType.key.startsWith('$');

      if (!isVariable) {
        datasource.dataSourceInfrastructure
          .getMetricsCatalog(savedEntityType, query.metricCategory.key)
          .then((results) => {
            if (!isUnmounting) {
              this.props.updateMetrics(results);
            }
          });
      }
    } else {
      // Only reset metric if it's not already set (e.g., from saved dashboard with variable)
      const hasMetricValue = query.metric && query.metric.key;
      if (!hasMetricValue) {
        query.metric = {
          key: null,
          label: '-',
        };
      }
    }

    onChange(query);
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  render() {
    const { query, onRunQuery, onChange, updateMetrics, datasource, queryTypes, updateQueryTypes } = this.props;

    return (
      <QueryType
        query={query}
        onChange={onChange}
        queryTypes={queryTypes}
        onRunQuery={onRunQuery}
        datasource={datasource}
        updateMetrics={updateMetrics}
        updateQueryTypes={updateQueryTypes}
      />
    );
  }
}
