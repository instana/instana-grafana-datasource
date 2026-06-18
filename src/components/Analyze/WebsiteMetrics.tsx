import { ALL_WEBSITES, ANALYZE_WEBSITE_METRICS, PLEASE_SPECIFY } from '../../GlobalVariables';
import React, { ChangeEvent } from 'react';

import { DataSource } from '../../datasources/DataSource';
import FormSelect from '../FormField/FormSelect';
import { Input } from '@grafana/ui';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import beacon_types from '../../lists/beacon_types_website';

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

    // Check if entity.key OR entity.label is a variable (contains $) before fetching
    const entityValue = query.entity?.key || query.entity?.label;
    const isVariable = entityValue && typeof entityValue === 'string' && entityValue.includes('$');

    // Check if entityType is a variable
    const entityTypeValue = query.entityType?.key || query.entityType?.label;
    const isEntityTypeVariable =
      entityTypeValue && typeof entityTypeValue === 'string' && entityTypeValue.includes('$');

    // Check if group is a variable
    const groupValue = query.group?.key || query.group?.label;
    const isGroupVariable = groupValue && typeof groupValue === 'string' && groupValue.includes('$');

    datasource.fetchWebsites().then((websites) => {
      if (!isUnmounting) {
        if (!_.find(websites, { key: null })) {
          websites.unshift({ key: null, label: ALL_WEBSITES });
        }

        // If current entity is a variable, add it to the options list so Select can display it
        if (isVariable && query.entity) {
          const variableOption = {
            key: entityValue,
            label: entityValue,
            value: entityValue,
          };
          // Add variable at the beginning (after ALL_WEBSITES if present)
          if (!_.find(websites, ['key', entityValue])) {
            websites.splice(1, 0, variableOption);
          }
        }

        this.setState({
          websites: websites,
        });

        // Only update entity if it's not already set or if it's not a variable
        let shouldUpdate = false;

        if (!query.entity || (!query.entity.key && !query.entity.label)) {
          // No entity set, use first website
          query.entity = websites[0];
          shouldUpdate = true;
        } else if (!isVariable && !_.find(websites, ['key', entityValue])) {
          // Entity is set but not a variable and not found in list, reset to first
          query.entity = websites[0];
          shouldUpdate = true;
        } else {
          // If entity is a variable but only has label, ensure it also has key
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

    datasource.dataSourceWebsite.getWebsiteTags().then((websiteTags: any) => {
      if (!isUnmounting) {
        this.props.updateGroups(_.sortBy(websiteTags, 'key'));

        // select a meaningful default group - but don't overwrite if already set or if it's a variable
        if (!query.group || !query.group.key) {
          query.group = _.find(websiteTags, ['key', 'beacon.page.name']);
          onChange(query);
        } else if (isGroupVariable && query.group && !query.group.key && query.group.label) {
          // If group is a variable but only has label, ensure it also has key
          query.group.key = query.group.label;
          onChange(query);
        }
      }
    });

    // Handle entityType initialization - preserve variables
    if (!query.entityType || (!query.entityType.key && !query.entityType.label)) {
      // No entityType set at all, use default
      query.entityType = beacon_types[0];
      onChange(query);
    } else if (isEntityTypeVariable) {
      // If entityType is a variable but only has label, ensure it also has key
      if (query.entityType && !query.entityType.key && query.entityType.label) {
        query.entityType.key = query.entityType.label;
        onChange(query);
      }
    }

    datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then((websiteMetrics: any) => {
      if (!isUnmounting) {
        // store all available metrics first and filter by type afterwards
        this.props.updateMetrics(websiteMetrics);
        // Only filter if entityType is not a variable
        if (!isEntityTypeVariable) {
          this.props.filterMetricsOnType(query.entityType.key);
        }

        // Ensure aggregation is set correctly for the current metric
        if (query.metric && query.metric.key && !isVariable) {
          const selectedMetric = websiteMetrics.find((m: any) => m.key === query.metric.key);
          if (selectedMetric && selectedMetric.aggregations && selectedMetric.aggregations.length > 0) {
            // Check if current aggregation is supported
            const currentAggKey = query.aggregation?.key;
            const isAggSupported = selectedMetric.aggregations.some((agg: any) => (agg.key || agg) === currentAggKey);

            // If current aggregation is not supported, use the first supported one
            if (!isAggSupported) {
              query.aggregation = selectedMetric.aggregations[0];
              onChange(query);
            }
          }
        }
      }
    });
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onWebsiteChange = (website: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof website === 'string') {
      query.entity = { key: website, label: website };
    } else {
      query.entity = website;
    }

    onChange(query);
    onRunQuery();
  };

  onBeaconTypeChange = (type: SelectableValue | string) => {
    const { query, onChange, filterMetricsOnType, datasource } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof type === 'string') {
      query.entityType = { key: type, label: type };
    } else {
      query.entityType = type;
    }

    onChange(query);

    // Only filter metrics if type is not a variable
    const isVariable = typeof type === 'string' || (query.entityType?.key && query.entityType.key.includes('$'));
    if (!isVariable) {
      filterMetricsOnType(query.entityType.key);

      // After filtering, validate that the current metric's aggregation is still valid
      if (query.metric && query.metric.key) {
        datasource.dataSourceWebsite.getWebsiteMetricsCatalog().then((websiteMetrics: any) => {
          const selectedMetric = websiteMetrics.find((m: any) => m.key === query.metric.key);
          if (selectedMetric && selectedMetric.aggregations && selectedMetric.aggregations.length > 0) {
            // Check if current aggregation is supported
            const currentAggKey = query.aggregation?.key;
            const isAggSupported = selectedMetric.aggregations.some((agg: any) => (agg.key || agg) === currentAggKey);

            // If current aggregation is not supported, use the first supported one
            if (!isAggSupported) {
              query.aggregation = selectedMetric.aggregations[0];
              onChange(query);
            }
          }
        });
      }
    }
  };

  onGroupChange = (group: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof group === 'string') {
      query.group = { key: group, label: group };
    } else {
      query.group = group;
    }

    if (query.group && query.metricCategory.key === ANALYZE_WEBSITE_METRICS) {
      // Only check type if group is not a variable
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

    // Ensure value is properly formatted for Select component with allowCustomValue
    let websiteValue = query.entity;
    if (query.entity && query.entity.key) {
      // For variables or custom values, ensure both 'value' and 'label' properties exist
      websiteValue = {
        ...query.entity,
        value: query.entity.key,
        label: query.entity.label || query.entity.key,
      };
    }

    // Format entityType value for Select component with allowCustomValue
    let entityTypeValue = query.entityType;
    if (query.entityType && query.entityType.key) {
      entityTypeValue = {
        ...query.entityType,
        value: query.entityType.key,
        label: query.entityType.label || query.entityType.key,
      };
    }

    // Format group value for Select component with allowCustomValue
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
          labelWidth={8}
          label={'Website'}
          tooltip={'Select your website or type variable like $website'}
          noOptionsMessage={'No websites found'}
          value={websiteValue}
          options={this.state.websites}
          onChange={this.onWebsiteChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <FormSelect
          queryKeyword
          inputWidth={0}
          labelWidth={8}
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
          inputWidth={0}
          labelWidth={8}
          label={'Group by'}
          tooltip={'Group by tag or type variable like $groupBy'}
          value={groupValue}
          options={groups}
          onChange={this.onGroupChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <div className={'gf-form-inline'} style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <div className={'gf-form'}>
            <label className={'gf-form-label width-8'}>Key</label>
            <Input
              className={'gf-form-input'}
              value={query.groupbyTagSecondLevelKey}
              onChange={this.onGroupByTagSecondLevelKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
