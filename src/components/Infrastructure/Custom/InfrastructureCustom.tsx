import React from 'react';
import { InstanaQuery } from '../../../types/instana_query';
import { DataSource } from '../../../datasources/DataSource';
import { QueryType } from '../QueryType';
import { SelectableValue } from '@grafana/data';

interface InfrastructureCustomState {}

interface Props {
  onRunQuery(): void;
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
}

export class InfrastructureCustom extends React.Component<Props, InfrastructureCustomState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { query, onChange, datasource } = this.props;

    if (query.entityQuery && query.entityType && query.entityType.key) {
      datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then((results) => {
        this.props.updateMetrics(results);
      });
    } else {
      query.metric = {
        key: null,
        label: '-',
      };
    }

    onChange(query);
  }

  render() {
    const { query, onRunQuery, onChange, updateMetrics, datasource } = this.props;

    return (
      <div>
        <QueryType query={query} onChange={onChange} onRunQuery={onRunQuery} datasource={datasource} updateMetrics={updateMetrics} />
      </div>
    );
  }
}
