import React, { ChangeEvent } from 'react';

import {
  ALL_APPLICATIONS,
  ALL_ENDPOINTS,
  ALL_SERVICES
} from '../../GlobalVariables';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { Label, Input, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';

interface ApplicationServiceEndpointMetricsState {
  applications: SelectableValue[];
  services: SelectableValue[];
  endpoints: SelectableValue[];
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
        this.setState({
          applications: applications,
        });

        if (!_.find(this.state.applications, { key: null })) {
          let apps = this.state.applications;
          apps.unshift({ key: null, label: ALL_APPLICATIONS });
          this.setState({
            applications: apps,
          });
        }

        // replace removed application
        if (query.entity && query.entity.key && !_.find(this.state.applications, (app) => app.key === query.entity.key)) {
          query.entity = this.state.applications[0];
        } else if ((!query.entity || !query.entity.key) && applications) {
          query.entity = this.state.applications[0];
        }

        onChange(query);
      }
    });
  }

  loadServices() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchServices(query).then((services) => {
      if (!isUnmounting) {
        this.setState({
          services: services,
        });

        if (!_.find(this.state.services, { key: null })) {
          let s = this.state.services;
          s.unshift({ key: null, label: ALL_SERVICES });
          this.setState({
            services: s,
          });
        }

        if (query.service && query.service.key) {
          if (!_.find(this.state.services, (app) => app.key === query.service.key)) {
            query.service = this.state.services[0];
          }
        } else {
          query.service = this.state.services[0];
        }

        onChange(query);
      }
    });
  }

  loadEndpoints() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchEndpoints(query).then((endpoints) => {
      if (!isUnmounting) {
        this.setState({
          endpoints: endpoints,
        });

        if (!_.find(this.state.endpoints, { key: null })) {
          let e = this.state.endpoints;
          e.unshift({ key: null, label: ALL_ENDPOINTS });
          this.setState({
            endpoints: e,
          });
        }

        if (query.endpoint && query.endpoint.key) {
          if (!_.find(this.state.endpoints, (app) => app.key === query.endpoint.key)) {
            query.endpoint = { key: null, label: '-- No Endpoint Filter --' };
          }
        } else {
          query.endpoint = { key: null, label: '-- No Endpoint Filter --' };
        }

        onChange(query);
      }
    });
  }

  onApplicationChange = (application: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = application;
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

  onGroupByTagSecondLevelKeyChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange, onRunQuery } = this.props;
    query.groupbyTagSecondLevelKey = eventItem.currentTarget.value;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <Label width={14} tooltip={'Select your application.'}>
          Application
        </Label>
        <Select width={20} isSearchable={true} value={query.entity} options={this.state.applications} onChange={this.onApplicationChange} />

        <Label width={7} tooltip={'Select your service.'}>
          Service
        </Label>
        <Select width={20} isSearchable={false} value={query.service} options={this.state.services} onChange={this.onServiceChange} />

        <Label width={8} tooltip={'Select your endpoint.'}>
          Endpoints
        </Label>
        <Select width={20} isSearchable={true} value={query.endpoint} options={this.state.endpoints} onChange={this.onEndpointChange} />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input type={'text'} value={query.groupbyTagSecondLevelKey} onBlur={this.onGroupByTagSecondLevelKeyChange} />
        </div>
      </div>
    );
  }
}
