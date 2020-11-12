import React, { ChangeEvent } from 'react';

import {  ALL_WEBSITES, ANALYZE_WEBSITE_METRICS } from '../../GlobalVariables';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import beacon_types from '../../lists/beacon_types';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import { Input } from '@grafana/ui';
import _ from 'lodash';

interface WebsiteMetricsState {
  websites: SelectableValue[];
}

interface Props {
  query: InstanaQuery;
  groups: SelectableValue[];
  datasource: DataSource;

  updateGroups(groups: SelectableValue[]): void;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
  filterMetricsOnType(type: string): any;
}

let isUnmounting = false;

export class WebsiteMetrics extends React.Component<Props, WebsiteMetricsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      websites: [],
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;
    datasource.fetchWebsites().then((websites) => {
      if (!isUnmounting) {
        if (!_.find(websites, { key: null })) {
          websites.unshift({ key: null, label: ALL_WEBSITES });
        }

        this.setState({
          websites: websites,
        });

        if ((!query.entity || !query.entity.key) && websites) {
          query.entity = websites[0];
        } else if (query.entity && !_.find(websites, ['key', query.entity.key])) {
          query.entity = websites[0];
        }

        onChange(query);
      }
    });

    datasource.dataSourceWebsite.getWebsiteTags().then((websiteTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(websiteTags, 'key'));

        // select a meaningful default group
        if (!query.group || !query.group.key) {
          query.group = _.find(websiteTags, ['key', 'beacon.page.name']);
          onChange(query);
        }
      }
    });

    if (!query.entityType || !query.entityType.key) {
      query.entityType = beacon_types[0];
      onChange(query);
    }

    datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then((websiteMetrics: any) => {
      if (!isUnmounting) {
        this.props.updateMetrics(_.filter(websiteMetrics, (m) => m.beaconTypes.includes(query.entityType.key)));
      }
    });
  }

  componentWillUnmount() {
    isUnmounting = true;
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

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  render() {
    const { query, groups } = this.props;

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'Website'}
          tooltip={'Select your website.'}
          noOptionsMessage={'No websites found'}
          value={query.entity}
          options={this.state.websites}
          onChange={this.onWebsiteChange}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          label={'Type'}
          tooltip={'Select a beacon type.'}
          value={query.entityType}
          options={beacon_types}
          onChange={this.onBeaconTypeChange}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          label={'Group by'}
          tooltip={'Group by tag.'}
          value={query.group}
          options={groups}
          onChange={this.onGroupChange}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input css={''} value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
