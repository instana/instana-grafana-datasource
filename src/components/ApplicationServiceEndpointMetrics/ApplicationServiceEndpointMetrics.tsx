import { ALL_APPLICATIONS, ALL_ENDPOINTS, ALL_SERVICES } from '../../GlobalVariables';
import { InlineFormLabel, Input, Select } from '@grafana/ui';
import React, { ChangeEvent } from 'react';

import ApplicationBoundaryScope from './ApplicationBoundaryScope';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';

interface ApplicationServiceEndpointMetricsState {
  applications: SelectableValue[];
  services: SelectableValue[];
  endpoints: SelectableValue[];
  value: SelectableValue;
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue[]): void;

  datasource: DataSource;
}

let isUnmounting = false;

export class ApplicationServiceEndpointMetrics extends React.Component<Props, ApplicationServiceEndpointMetricsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      applications: [],
      services: [],
      endpoints: [],
      value: {
        value: 2,
        imgUrl: '../../resources/dest.png',
      },
    };
  }

  componentDidMount() {
    isUnmounting = false;
    this.loadApplications();
    this.loadServices();
    this.loadEndpoints();

    const { datasource } = this.props;
    this.props.updateMetrics(datasource.dataSourceApplication.getApplicationMetricsCatalog());
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  loadApplications() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchApplications().then((applications) => {
      if (!isUnmounting) {
        if (!_.find(applications, { key: null })) {
          applications.unshift({ key: null, label: ALL_APPLICATIONS });
        }
        this.setState({
          applications: applications,
        });

        // replace removed application and preselect entity
        // Don't replace if it's a variable
        const entityKey = query.entity?.key || query.entity?.value;
        if (entityKey) {
          // Check if it's a variable - if so, preserve it
          if (this.isVariable(entityKey)) {
            // It's a variable - preserve it and trigger query
            this.props.onRunQuery();
            return;
          }
          // Not a variable - check if it exists in the list
          if (!_.find(applications, (app) => app.key === entityKey)) {
            query.entity = applications[0];
            onChange(query);
          }
        } else if (applications) {
          // No entity selected - set to default
          query.entity = applications[0];
          onChange(query);
        }
      }
    });
  }

  loadServices() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchServices(query).then((services) => {
      if (!isUnmounting) {
        if (!_.find(services, { key: null })) {
          services.unshift({ key: null, label: ALL_SERVICES });
        }
        this.setState({
          services: services,
        });

        // replace removed service and preselect service
        // Don't replace if it's a variable
        const serviceKey = query.service?.key || query.service?.value;
        if (serviceKey) {
          // Check if it's a variable - if so, preserve it
          if (this.isVariable(serviceKey)) {
            // It's a variable - preserve it and trigger query
            this.props.onRunQuery();
            return;
          }
          // Not a variable - check if it exists in the list
          if (!_.find(services, (svc) => svc.key === serviceKey)) {
            query.service = services[0];
            onChange(query);
          }
        } else {
          // No service selected - set to default
          query.service = services[0];
          onChange(query);
        }
      }
    });
  }

  loadEndpoints() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchEndpoints(query).then((endpoints) => {
      if (!isUnmounting) {
        if (!_.find(endpoints, { key: null })) {
          endpoints.unshift({ key: null, label: ALL_ENDPOINTS });
        }
        this.setState({
          endpoints: endpoints,
        });

        // replace removed endpoint and preselect endpoint
        // Don't replace if it's a variable
        const endpointKey = query.endpoint?.key || query.endpoint?.value;
        if (endpointKey) {
          // Check if it's a variable - if so, preserve it
          if (this.isVariable(endpointKey)) {
            // It's a variable - preserve it and trigger query
            this.props.onRunQuery();
            return;
          }
          // Not a variable - check if it exists in the list
          if (!_.find(endpoints, (ep) => ep.key === endpointKey)) {
            query.endpoint = { key: null, label: ALL_ENDPOINTS };
            onChange(query);
          }
        } else {
          // No endpoint selected - set to default
          query.endpoint = { key: null, label: ALL_ENDPOINTS };
          onChange(query);
        }
      }
    });
  }

  onApplicationChange = (application: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof application === 'string') {
      query.entity = { key: application, label: application };
    } else {
      query.entity = application;
      if (application.boundaryScope !== '') {
        //set the default boundary scope that is configured for this application
        query.applicationBoundaryScope = application.boundaryScope;
      } else {
        if (query.applicationBoundaryScope !== 'ALL' && query.applicationBoundaryScope !== 'INBOUND') {
          //if no default is set, set it to INBOUND
          query.applicationBoundaryScope = 'INBOUND';
        }
      }
    }

    onChange(query);

    // Only load dependent data if not a variable
    if (!this.isVariable(query.entity?.key)) {
      this.loadServices();
      this.loadEndpoints();
    }

    onRunQuery();
  };

  onServiceChange = (service: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof service === 'string') {
      query.service = { key: service, label: service };
    } else {
      query.service = service;
    }

    onChange(query);

    // Only load endpoints if not a variable
    if (!this.isVariable(query.service?.key)) {
      this.loadEndpoints();
    }

    onRunQuery();
  };

  onEndpointChange = (endpoint: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof endpoint === 'string') {
      query.endpoint = { key: endpoint, label: endpoint };
    } else {
      query.endpoint = endpoint;
    }

    onChange(query);
    onRunQuery();
  };

  private isVariable(value: string | undefined | null): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    return value.includes('$');
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  };

  onApplicationBoundaryScopeChange = (scope: string) => {
    const { query, onChange, onRunQuery } = this.props;
    query.applicationBoundaryScope = scope;
    onChange(query);
    this.loadServices();
    this.loadEndpoints();
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    // Format entity value for Select component with allowCustomValue
    let entityValue = query.entity;
    if (query.entity && query.entity.key) {
      entityValue = {
        ...query.entity,
        value: query.entity.key,
        label: query.entity.label || query.entity.key,
      };
    }

    // Format service value for Select component with allowCustomValue
    let serviceValue = query.service;
    if (query.service && query.service.key) {
      serviceValue = {
        ...query.service,
        value: query.service.key,
        label: query.service.label || query.service.key,
      };
    }

    // Format endpoint value for Select component with allowCustomValue
    let endpointValue = query.endpoint;
    if (query.endpoint && query.endpoint.key) {
      endpointValue = {
        ...query.endpoint,
        value: query.endpoint.key,
        label: query.endpoint.label || query.endpoint.key,
      };
    }

    return (
      <div className={'gf-form'}>
        <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Select your application.'}>
          Application
        </InlineFormLabel>
        <ApplicationBoundaryScope
          value={query.applicationBoundaryScope}
          disabled={!query.entity?.key}
          onChange={this.onApplicationBoundaryScopeChange}
        />
        <Select
          menuPlacement={'bottom'}
          width={0}
          isSearchable={true}
          value={entityValue}
          options={this.state.applications}
          onChange={this.onApplicationChange}
          allowCustomValue={true}
          placeholder={'Please specify'}
        />

        <InlineFormLabel
          className={'query-keyword'}
          width={6}
          tooltip={'Select your service or type variable like $service'}
        >
          Service
        </InlineFormLabel>
        <Select
          menuPlacement={'bottom'}
          width={0}
          isSearchable={true}
          value={serviceValue}
          options={this.state.services}
          onChange={this.onServiceChange}
          allowCustomValue={true}
          placeholder={'Please specify'}
        />

        <InlineFormLabel
          className={'query-keyword'}
          width={6}
          tooltip={'Select your endpoint or type variable like $endpoint'}
        >
          Endpoint
        </InlineFormLabel>
        <Select
          menuPlacement={'bottom'}
          width={0}
          isSearchable={true}
          value={endpointValue}
          options={this.state.endpoints}
          onChange={this.onEndpointChange}
          allowCustomValue={true}
          placeholder={'Please specify'}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
