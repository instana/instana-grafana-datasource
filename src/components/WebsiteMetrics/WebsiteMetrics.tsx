import React from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { DataSource } from '../../datasources/DataSource';
import { FormLabel, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

interface WebsiteMetricsState {
  websites: SelectableValue[];
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
    this.state = {
      websites: []
    };
  }

  setWebsitePlaceholder(nrOfTotalResults: number) {
    const { query, onChange } = this.props;
    query.entity = {
      key: null,
      label: 'Please select (' + nrOfTotalResults + ')'
    }

    onChange(query);
  }

  componentDidMount() {
    const { datasource } = this.props;
    datasource.fetchWebsites().then(websites => {
      this.setState({
        websites: websites
      });

      this.setWebsitePlaceholder(websites.length)
    });
  }

  onWebsiteChange = (website: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = website;
    onChange(query);
    onRunQuery();
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select your website.'}>Website</FormLabel>
        <Select
          width={30}
          isSearchable={true}
          value={query.entity}
          onChange={this.onWebsiteChange}
          options={this.state.websites}
        />
      </div>
    );
  }

}
