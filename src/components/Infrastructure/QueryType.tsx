import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { FormField, FormLabel, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../../datasources/DataSource';
import _ from 'lodash';

interface QueryTypeState {
  types: SelectableValue<string>[] | any;
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue<string>[]): void;

  datasource: DataSource;
}

let snapshots: any;

export class QueryType extends React.Component<Props, QueryTypeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      types: []
    };
  }

  componentDidMount() {
    const { query } = this.props;
    if (query.entityQuery) {
      this.loadEntityTypes();
    }
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

  onTypeChange = (eventItem: SelectableValue<string>) => {
    const { query, datasource, onChange } = this.props;
    query.entityType = eventItem;
    onChange(query);

    datasource.dataSourceInfrastructure.getMetricsCatalog(query.entityType, query.metricCategory.key).then(results => {
      this.props.updateMetrics(results);
    });
  };

  loadEntityTypes() {
    const { query, datasource, onRunQuery, onChange } = this.props;

    if (query.entityQuery) {
      datasource.fetchTypesForTarget(query).then(
        (response: any) => {
          snapshots = response.data;
          datasource.getEntityTypes().then(entityTypes => {
            let filteredEntityTypes = this.filterEntityTypes(entityTypes);
            this.setState({
              types: filteredEntityTypes,
            });

            if (!query.entityType || !query.entityType.key || !_.find(this.state.types, m => m.key === query.entityType.key)) {
              query.entityType = { key: null, label: 'Please select (' + filteredEntityTypes.length + ')' };
            }
            onChange(query);
          });

          onRunQuery();
        }
      );
    } else {
      this.setState({ types: [] });
    }
  }

  filterEntityTypes(entityTypes: SelectableValue<string>[]) {
    return _.sortBy(
      _.filter(
        entityTypes,
        entityType => this.findMatchingEntityTypes(entityType)),
      'label');
  }

  findMatchingEntityTypes(entityType: SelectableValue<string>) {
    const { query } = this.props;
    // workaround as long the api does not support returning plugins with custom metrics only
    if (query.metricCategory.key === 0 ||
      entityType.key === 'statsd' ||
      entityType.key === 'prometheus' ||
      entityType.key === 'jvmRuntimePlatform' ||
      entityType.key === 'dropwizardApplicationContainer') {
      return snapshots.find((type: any) => type === entityType.key) && entityType.label != null;
    }

    return snapshots;
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
          onBlur={event => this.loadEntityTypes()}
          tooltip={'Specify a query for the entities you wish to plot. Use the dynamic focus syntax: https://docs.instana.io/core_concepts/dynamic_focus/#syntax'}
        />

        <FormLabel tooltip={'Select an entity type for a list of available metrics.'}>Type</FormLabel>
        <Select
          width={13}
          isSearchable={true}
          value={query.entityType}
          options={this.state.types}
          onChange={this.onTypeChange}
        />
      </div>
    );
  }

}
