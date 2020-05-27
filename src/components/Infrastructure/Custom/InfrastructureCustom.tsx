import React from "react";
import { InstanaQuery } from "../../../types/instana_query";
import { DataSource } from "../../../datasources/DataSource";
import { QueryType } from '../QueryType';
import { SelectableValue } from '@grafana/data';

interface InfrastructureCustomState { }

interface Props {
  onRunQuery(): void;
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue<string>[]): void;
}

export class InfrastructureCustom extends React.Component<Props, InfrastructureCustomState> {
  constructor(props: any) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>,
                        nextState: Readonly<InfrastructureCustomState>,
                        nextContext: any): boolean {
    return nextProps.query.metricCategory.key === 0;
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
