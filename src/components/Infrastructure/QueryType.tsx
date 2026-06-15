import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import { PLEASE_SPECIFY } from '../../GlobalVariables';

interface QueryTypeState {
  availableEntities: SelectableValue[];
  loadingEntities: boolean;
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  queryTypes: SelectableValue[];
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
  updateQueryTypes(types: SelectableValue[]): void;
}

export class QueryType extends React.Component<Props, QueryTypeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      availableEntities: [],
      loadingEntities: false,
    };
  }

  componentDidMount() {
    const { query, datasource } = this.props;

    const savedEntityType = query.entityType?.key ? query.entityType : query.entity?.key ? query.entity : undefined;

    if (savedEntityType && savedEntityType.key && (!query.entityType || !query.entityType.key)) {
      query.entityType = savedEntityType;
    }

    if (savedEntityType && savedEntityType.key && (!query.entity || !query.entity.key)) {
      query.entity = savedEntityType;
    }

    // Load all entity types on mount
    datasource.getEntityTypes().then((entityTypes: SelectableValue[]) => {
      this.props.updateQueryTypes(entityTypes);
    });

    // Load available entities if entityType is already set (e.g., from saved panel)
    if (query.entityType && query.entityType.key) {
      this.loadAvailableEntities();
    }
  }

  onTypeChange = (eventItem: SelectableValue | string) => {
    const { query, datasource, onChange } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof eventItem === 'string') {
      query.entityType = { key: eventItem, label: eventItem };
    } else {
      // When user types a custom value in Select, Grafana creates { value: "...", label: "..." }
      // We need to normalize this to use 'key' property for consistency
      if (eventItem.value && !eventItem.key) {
        query.entityType = {
          key: eventItem.value,
          label: eventItem.label || eventItem.value,
        };
      } else {
        query.entityType = eventItem;
      }
    }

    query.entity = query.entityType;

    // Reset selected entity when entity type changes
    query.selectedEntity = { key: null, label: PLEASE_SPECIFY };

    onChange(query);

    // Load available entities for the new entity type
    this.loadAvailableEntities();

    // Only fetch metrics if it's not a variable
    if (query.entityType.key && !query.entityType.key.includes('$')) {
      datasource.dataSourceInfrastructure
        .getMetricsCatalog(query.entityType, query.metricCategory.key)
        .then((results) => {
          this.props.updateMetrics(results);
        });
    }
  };

  onEntityChange = (eventItem: SelectableValue | string | null) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle null/undefined (clear selection)
    if (!eventItem || eventItem === null) {
      query.selectedEntity = { key: null, label: PLEASE_SPECIFY };
      onChange(query);
      onRunQuery();
      return;
    }

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof eventItem === 'string') {
      query.selectedEntity = { key: eventItem, label: eventItem };
    } else {
      // When user types a custom value in Select, Grafana creates { value: "...", label: "..." }
      // We need to normalize this to use 'key' property for consistency
      if (eventItem && eventItem.value && !eventItem.key) {
        query.selectedEntity = {
          key: eventItem.value,
          label: eventItem.label || eventItem.value,
        };
      } else {
        query.selectedEntity = eventItem;
      }
    }

    onChange(query);
    onRunQuery();
  };

  loadAvailableEntities = () => {
    const { query, datasource } = this.props;

    // Only load entities if we have entityType
    if (!query.entityType || !query.entityType.key) {
      this.setState({ availableEntities: [], loadingEntities: false });
      return;
    }

    this.setState({ loadingEntities: true });

    // Resolve variables in entityType if present
    let resolvedEntityType = query.entityType.key;
    if (typeof resolvedEntityType === 'string' && resolvedEntityType.startsWith('$')) {
      // Use templateSrv to resolve the variable
      resolvedEntityType = datasource.templateSrv.replace(resolvedEntityType);

      // If variable couldn't be resolved (returns the same value), don't fetch
      if (resolvedEntityType === query.entityType.key || !resolvedEntityType) {
        this.setState({ availableEntities: [], loadingEntities: false });
        return;
      }
    }

    datasource.dataSourceInfrastructure
      .getInfrastructureEntities(resolvedEntityType)
      .then((entities) => {
        this.setState({
          availableEntities: entities,
          loadingEntities: false,
        });
      })
      .catch((error) => {
        console.error('Error loading entities:', error);
        this.setState({
          availableEntities: [],
          loadingEntities: false,
        });
      });
  };

  render() {
    const { query, queryTypes } = this.props;
    const { availableEntities, loadingEntities } = this.state;

    let entityTypeValue = query.entityType;
    if (query.entityType && query.entityType.key) {
      entityTypeValue = {
        ...query.entityType,
        value: query.entityType.key,
        label: query.entityType.label || query.entityType.key,
      };
    }

    let selectedEntityValue = query.selectedEntity;
    if (query.selectedEntity && query.selectedEntity.key) {
      selectedEntityValue = {
        ...query.selectedEntity,
        value: query.selectedEntity.key,
        label: query.selectedEntity.label || query.selectedEntity.key,
      };
    }

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'Type'}
          tooltip={'Select an entity type or type variable like $entity_type'}
          noOptionsMessage={'No types available'}
          value={entityTypeValue}
          options={queryTypes}
          onChange={this.onTypeChange}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
        />

        <FormSelect
          queryKeyword
          labelWidth={12}
          label={'Entity Name'}
          tooltip={
            'Optional: Select a specific entity to filter results or type variable like $entity. Leave empty to show all entities of the selected type.'
          }
          noOptionsMessage={loadingEntities ? 'Loading entities...' : 'No entities found'}
          value={selectedEntityValue}
          options={availableEntities}
          onChange={this.onEntityChange}
          allowCustomValue={true}
          isClearable={true}
          placeholder={PLEASE_SPECIFY}
        />
      </div>
    );
  }
}
