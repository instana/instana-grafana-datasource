import { ALL_MOBILE_APPS, ANALYZE_MOBILE_APP_METRICS } from '../../GlobalVariables';
import React, { ChangeEvent } from 'react';

import { DataSource } from '../../datasources/DataSource';
import FormSelect from '../FormField/FormSelect';
import { Input } from '@grafana/ui';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import beacon_types from '../../lists/beacon_types_mobile_app';

interface MobileAppMetricsState {
  mobileapps: SelectableValue[];
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

export class MobileAppMetrics extends React.Component<Props, MobileAppMetricsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mobileapps: [],
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;
    datasource.fetchMobileapp().then((mobileapps) => {
      if (!isUnmounting) {
        if (!_.find(mobileapps, { key: null })) {
          mobileapps.unshift({ key: null, label: ALL_MOBILE_APPS });
        }

        this.setState({
          mobileapps: mobileapps,
        });

        if ((!query.entity || !query.entity.key) && mobileapps) {
          query.entity = mobileapps[0];
        } else if (query.entity && !_.find(mobileapps, ['key', query.entity.key])) {
          query.entity = mobileapps[0];
        }

        onChange(query);
      }
    });

    datasource.dataSourceMobileapp.getMobileappTags().then((mobileappTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(mobileappTags, 'key'));

        // select a meaningful default group
        if (!query.group || !query.group.key) {
          query.group = _.find(mobileappTags, ['key', 'beacon.page.name']);
          onChange(query);
        }
      }
    });

    if (!query.entityType || !query.entityType.key) {
      query.entityType = beacon_types[0];
      onChange(query);
    }

    datasource.dataSourceMobileapp.getMobileappMetricsCatalog().then((mobileappMetrics: any) => {
      if (!isUnmounting) {
        // store all available metrics first and filter by type afterwards
        this.props.updateMetrics(mobileappMetrics);
        this.props.filterMetricsOnType(query.entityType.key);
      }
    });
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onMobileappChange = (mobileapp: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = mobileapp;
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

    if (query.group && query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS) {
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
          label={'Mobile-app'}
          tooltip={'Select your mobile app.'}
          noOptionsMessage={'No mobile apps found'}
          value={query.entity}
          options={this.state.mobileapps}
          onChange={this.onMobileappChange}
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
          <Input value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
