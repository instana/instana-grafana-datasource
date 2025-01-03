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
        if (query.entity && query.entity.key && !_.find(applications, (app) => app.key === query.entity.key)) {
          query.entity = applications[0];
        } else if ((!query.entity || !query.entity.key) && applications) {
          query.entity = applications[0];
        }

        onChange(query);
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
        if (query.service && query.service.key) {
          if (!_.find(services, (app) => app.key === query.service.key)) {
            query.service = services[0];
          }
        } else {
          query.service = services[0];
        }

        onChange(query);
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
        if (query.endpoint && query.endpoint.key) {
          if (!_.find(endpoints, (app) => app.key === query.endpoint.key)) {
            query.endpoint = { key: null, label: ALL_ENDPOINTS };
          }
        } else {
          query.endpoint = { key: null, label: ALL_ENDPOINTS };
        }

        onChange(query);
      }
    });
  }

  onApplicationChange = (application: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
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

    onChange(query);
    this.loadServices();
    this.loadEndpoints();
    onRunQuery();
  };

  onServiceChange = (service: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.service = service;
    onChange(query);
    this.loadEndpoints();
    onRunQuery();
  };

  onEndpointChange = (endpoint: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.endpoint = endpoint;
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
          value={query.entity}
          options={this.state.applications}
          onChange={this.onApplicationChange}
        />

        <InlineFormLabel className={'query-keyword'} width={6} tooltip={'Select your service.'}>
          Service
        </InlineFormLabel>
        <Select
          menuPlacement={'bottom'}
          width={0}
          isSearchable={true}
          value={query.service}
          options={this.state.services}
          onChange={this.onServiceChange}
        />

        <InlineFormLabel className={'query-keyword'} width={6} tooltip={'Select your endpoint.'}>
          Endpoint
        </InlineFormLabel>
        <Select
          menuPlacement={'bottom'}
          width={0}
          isSearchable={true}
          value={query.endpoint}
          options={this.state.endpoints}
          onChange={this.onEndpointChange}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input value={query.groupbyTagSecondLevelKey} onChange={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
