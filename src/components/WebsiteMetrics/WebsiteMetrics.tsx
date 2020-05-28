import React from "react";
import { InstanaQuery } from "../../types/instana_query";
import { DataSource } from "../../datasources/DataSource";

interface WebsiteMetricsState {

}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  datasource: DataSource;
}

export class WebsiteMetrics extends React.Component<Props, WebsiteMetricsState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    // const { query, onRunQuery, onChange, datasource } = this.props;

    return (
      <div>
        Website Metrics here
      </div>
    );
  }

}
