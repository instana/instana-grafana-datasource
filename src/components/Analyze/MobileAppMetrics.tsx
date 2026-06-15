import { ALL_MOBILE_APPS, ANALYZE_MOBILE_APP_METRICS, PLEASE_SPECIFY } from '../../GlobalVariables';
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

    const entityValue = query.entity?.key || query.entity?.label;
    const isVariable = entityValue && typeof entityValue === 'string' && entityValue.includes('$');

    const entityTypeValue = query.entityType?.key || query.entityType?.label;
    const isEntityTypeVariable =
      entityTypeValue && typeof entityTypeValue === 'string' && entityTypeValue.includes('$');

    const groupValue = query.group?.key || query.group?.label;
    const isGroupVariable = groupValue && typeof groupValue === 'string' && groupValue.includes('$');

    datasource.fetchMobileapp().then((mobileapps) => {
      if (!isUnmounting) {
        if (!_.find(mobileapps, { key: null })) {
          mobileapps.unshift({ key: null, label: ALL_MOBILE_APPS });
        }

        if (isVariable && query.entity) {
          const variableOption = {
            key: entityValue,
            label: entityValue,
            value: entityValue,
          };
          if (!_.find(mobileapps, ['key', entityValue])) {
            mobileapps.splice(1, 0, variableOption);
          }
        }

        this.setState({
          mobileapps: mobileapps,
        });

        let shouldUpdate = false;

        if (!query.entity || (!query.entity.key && !query.entity.label)) {
          query.entity = mobileapps[0];
          shouldUpdate = true;
        } else if (!isVariable && !_.find(mobileapps, ['key', entityValue])) {
          query.entity = mobileapps[0];
          shouldUpdate = true;
        } else {
          if (isVariable && query.entity && !query.entity.key && query.entity.label) {
            query.entity.key = query.entity.label;
            shouldUpdate = true;
          }
        }

        if (shouldUpdate) {
          onChange(query);
        }

        if (isVariable && query.entity) {
          this.props.onRunQuery();
        }
      }
    });

    datasource.dataSourceMobileapp.getMobileappTags().then((mobileappTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(mobileappTags, 'key'));

        const hasGroupValue = query.group && (query.group.key || query.group.value || query.group.label);

        if (!hasGroupValue) {
          query.group = _.find(mobileappTags, ['key', 'beacon.page.name']);
          onChange(query);
        } else if (isGroupVariable) {
          const groupValue = query.group.key || query.group.value || query.group.label;
          if (!query.group.key) {
            query.group.key = groupValue;
          }
          if (!query.group.value) {
            query.group.value = groupValue;
          }
          if (!query.group.label) {
            query.group.label = groupValue;
          }
          onChange(query);
        } else if (query.group && !query.group.key && (query.group.value || query.group.label)) {
          query.group.key = query.group.value || query.group.label;
          onChange(query);
        }
      }
    });

    if (!query.entityType || (!query.entityType.key && !query.entityType.label)) {
      query.entityType = beacon_types[0];
      onChange(query);
    } else if (isEntityTypeVariable) {
      if (query.entityType && !query.entityType.key && query.entityType.label) {
        query.entityType.key = query.entityType.label;
        onChange(query);
      }
    }

    datasource.dataSourceMobileapp.getMobileappMetricsCatalog().then((mobileappMetrics: any) => {
      if (!isUnmounting) {
        // store all available metrics first and filter by type afterwards
        this.props.updateMetrics(mobileappMetrics);
        if (!isEntityTypeVariable) {
          this.props.filterMetricsOnType(query.entityType.key);
        }
      }
    });
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onMobileappChange = (mobileapp: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    if (typeof mobileapp === 'string') {
      query.entity = { key: mobileapp, label: mobileapp };
    } else {
      query.entity = mobileapp;
    }

    onChange(query);
    onRunQuery();
  };

  onBeaconTypeChange = (type: SelectableValue | string) => {
    const { query, onChange, filterMetricsOnType } = this.props;

    if (typeof type === 'string') {
      query.entityType = { key: type, label: type };
    } else {
      query.entityType = type;
    }

    onChange(query);

    const isVariable = typeof type === 'string' || (query.entityType?.key && query.entityType.key.includes('$'));
    if (!isVariable) {
      filterMetricsOnType(query.entityType.key);
    }
  };

  onGroupChange = (group: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    if (typeof group === 'string') {
      query.group = { key: group, label: group };
    } else {
      query.group = group;
    }

    if (query.group && query.metricCategory.key === ANALYZE_MOBILE_APP_METRICS) {
      const isVariable = typeof group === 'string' || (query.group?.key && query.group.key.includes('$'));
      if (!isVariable) {
        query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
      }
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

    let mobileAppValue = query.entity;
    if (query.entity && query.entity.key) {
      mobileAppValue = {
        ...query.entity,
        value: query.entity.key,
        label: query.entity.label || query.entity.key,
      };
    }

    let entityTypeValue = query.entityType;
    if (query.entityType && query.entityType.key) {
      entityTypeValue = {
        ...query.entityType,
        value: query.entityType.key,
        label: query.entityType.label || query.entityType.key,
      };
    }

    let groupValue = query.group;
    if (query.group && query.group.key) {
      groupValue = {
        ...query.group,
        value: query.group.key,
        label: query.group.label || query.group.key,
      };
    }

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'Mobile-app'}
          tooltip={'Select your mobile app or type variable like $mobileApp'}
          noOptionsMessage={'No mobile apps found'}
          value={mobileAppValue}
          options={this.state.mobileapps}
          onChange={this.onMobileappChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          label={'Type'}
          tooltip={'Select a beacon type or type variable like $beaconType'}
          value={entityTypeValue}
          options={beacon_types}
          onChange={this.onBeaconTypeChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          label={'Group by'}
          tooltip={'Group by tag or type variable like $groupBy'}
          value={groupValue}
          options={groups}
          onChange={this.onGroupChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
