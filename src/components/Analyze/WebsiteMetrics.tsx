import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { DataSource } from '../../datasources/DataSource';
import { FormLabel, Input, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import beacon_types from '../../lists/beacon_types';
import _ from 'lodash';
import { ANALYZE_WEBSITE_METRICS } from '../../GlobalVariables';

interface WebsiteMetricsState {
  websites: SelectableValue[];
}

interface Props {
  query: InstanaQuery;

  groups: SelectableValue[];

  updateGroups(groups: SelectableValue[]): void;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue<string>[]): void;

  filterMetricsOnType(type: string): any;

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
    };

    onChange(query);
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    datasource.fetchWebsites().then(websites => {
      this.setState({
        websites: websites
      });

      if (!query.entity || !query.entity.key) {
        this.setWebsitePlaceholder(websites.length);
      }
    });

    datasource.dataSourceWebsite.getWebsiteTags().then((websiteTags: any) => {
      this.props.updateGroups(_.sortBy(websiteTags, 'key'));

      // select a meaningful default group
      if (!query.group || !query.group.key) {
        query.group = _.find(websiteTags, [ 'key', 'beacon.page.name' ]);
        onChange(query);
      }
    });

    if (!query.entityType || !query.entityType.key) {
      query.entityType = beacon_types[0];
      onChange(query);
    }

    datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then((websiteMetrics: any) => {
      this.props.updateMetrics(_.filter(websiteMetrics, m => m.beaconTypes.includes(query.entityType.key)));
    });
  }

  onWebsiteChange = (website: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = website;
    onChange(query);
    onRunQuery();
  };

  onBeaconTypeChange = (type: SelectableValue) => {
    const { query, onChange, filterMetricsOnType } = this.props;
    query.entityType = type;
    onChange(query);
    filterMetricsOnType(query.entityType.key);
  };

  onGroupChange = (group: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.group = group;

    if (query.group && query.metricCategory.key === ANALYZE_WEBSITE_METRICS) {
      query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
    }
    if (!query.showGroupBySecondLevel) {
      query.groupbyTagSecondLevelKey = '';
    }

    onChange(query);
    onRunQuery();
  };

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { query, groups } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select your website.'}>Website</FormLabel>
        <Select
          width={20}
          isSearchable={true}
          value={query.entity}
          options={this.state.websites}
          onChange={this.onWebsiteChange}
        />

        <FormLabel width={6} tooltip={'Select a beacon type.'}>Type</FormLabel>
        <Select
          width={20}
          isSearchable={false}
          value={query.entityType}
          options={beacon_types}
          onChange={this.onBeaconTypeChange}
        />

        <FormLabel width={7} tooltip={'Group by tag.'}>Group by</FormLabel>
        <Select
          width={20}
          isSearchable={true}
          value={query.group}
          options={groups}
          onChange={this.onGroupChange}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input
            type={'text'}
            value={query.groupbyTagSecondLevelKey}
            onBlur={this.onGroupByTagSecondLevelKeyChange}
          />
        </div>
      </div>
    );
  }

}