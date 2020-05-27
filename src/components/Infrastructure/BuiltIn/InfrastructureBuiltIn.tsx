import React from "react";
import { InstanaQuery } from "../../../types/instana_query";
import { DataSource } from "../../../datasources/DataSource";
import { QueryType } from '../QueryType';
import { SelectableValue } from '@grafana/data';

interface InfrastructureBuiltInState { }

interface Props {
  onRunQuery(): void;
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue<string>[]): void;
}

export class InfrastructureBuiltIn extends React.Component<Props, InfrastructureBuiltInState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { query, onRunQuery, onChange, updateMetrics, datasource} = this.props;

    return (
      <div>
        <QueryType
          query={query}
          onChange={onChange}
          onRunQuery={onRunQuery}
          datasource={datasource}
          updateMetrics={updateMetrics}
        />
      </div>
    );
  }

}
