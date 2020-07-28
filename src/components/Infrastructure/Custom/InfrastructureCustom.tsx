import React from 'react';

import { DataSource } from '../../../datasources/DataSource';
import { InstanaQuery } from '../../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import { QueryType } from '../QueryType';

interface InfrastructureCustomState {}

interface Props {
  onRunQuery(): void;
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
}

let isUnmounting = false;

export class InfrastructureCustom extends React.Component<Props, InfrastructureCustomState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { query, onChange, datasource } = this.props;
    isUnmounting = false;

    if (query.entityQuery && query.entityType && query.entityType.key) {
      datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then((results) => {
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
    const { query, onRunQuery, onChange, updateMetrics, datasource } = this.props;

    return (
      <QueryType query={query} onChange={onChange} onRunQuery={onRunQuery} datasource={datasource} updateMetrics={updateMetrics} />
    );
  }
}
