import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { FormField, FormLabel, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../../datasources/DataSource';
import _ from 'lodash';

interface QueryTypeState {
  types: SelectableValue[] | any;
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue[]): void;

  datasource: DataSource;
}

let snapshots: any;
let isUnmounting = false;

export class QueryType extends React.Component<Props, QueryTypeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      types: [],
    };
  }

  componentDidMount() {
    const { query } = this.props;
    isUnmounting = false;
    if (query.entityQuery) {
      this.loadEntityTypes();
    }
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onQueryChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    if (eventItem.currentTarget.value) {
      query.entityQuery = eventItem.currentTarget.value;
    } else {
      this.setState({
        types: [],
      });

      query.entityQuery = '';
      query.entityType = { key: null, label: '-' };
    }

    onChange(query);
  };

  onTypeChange = (eventItem: SelectableValue) => {
    const { query, datasource, onChange } = this.props;
    query.entityType = eventItem;
    onChange(query);

    datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then((results) => {
      this.props.updateMetrics(results);
    });
  };

  loadEntityTypes() {
    const { query, datasource, onRunQuery } = this.props;

    if (query.entityQuery) {
      datasource.fetchTypesForTarget(query).then((response: any) => {
        if (!isUnmounting) {
          snapshots = response.data;
          this.filterForEntityType();
          onRunQuery();
        }
      });
    } else {
      this.setState({ types: [] });
    }
  }

  filterForEntityType(findMatchingEntityTypes = true) {
    const { query, datasource, onChange } = this.props;
    datasource.getEntityTypes().then((entityTypes) => {
      let filteredEntityTypes = this.filterEntityTypes(entityTypes, findMatchingEntityTypes);
      this.setState({
        types: filteredEntityTypes,
      });

      if (!query.entityType || !query.entityType.key || !_.find(this.state.types, (m) => m.key === query.entityType.key)) {
        query.entityType = { key: null, label: 'Please select (' + filteredEntityTypes.length + ')' };
      }

      onChange(query);
    });
  }

  filterEntityTypes(entityTypes: SelectableValue[], findMatchingEntityTypes: boolean) {
    if (findMatchingEntityTypes) {
      return _.sortBy(
        _.filter(entityTypes, (entityType) => this.findMatchingEntityTypes(entityType)),
        'label'
      );
    }

    return _.sortBy(entityTypes, 'label');
  }

  findMatchingEntityTypes(entityType: SelectableValue) {
    const { query } = this.props;
    // workaround as long the api does not support returning plugins with custom metrics only
    if (
      query.metricCategory.key === 0 ||
      entityType.key === 'statsd' ||
      entityType.key === 'prometheus' ||
      entityType.key === 'jvmRuntimePlatform' ||
      entityType.key === 'dropwizardApplicationContainer'
    ) {
      return snapshots.find((type: any) => type === entityType.key) && entityType.label != null;
    }

    return false;
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormField
          label="Query"
          labelWidth={14}
          inputWidth={30}
          value={query.entityQuery}
          placeholder={'Please specify'}
          onChange={this.onQueryChange}
          onBlur={() => this.loadEntityTypes()}
          tooltip={
            'Specify a query for the entities you wish to plot. Use the dynamic focus syntax: https://docs.instana.io/core_concepts/dynamic_focus/#syntax'
          }
        />

        <FormLabel tooltip={'Select an entity type for a list of available metrics.'}>Type</FormLabel>
        <Select width={13} isSearchable={true} value={query.entityType} options={this.state.types} onChange={this.onTypeChange} />
      </div>
    );
  }
}