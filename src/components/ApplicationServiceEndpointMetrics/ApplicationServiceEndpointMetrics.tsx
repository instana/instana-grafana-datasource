import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { DataSource } from '../../datasources/DataSource';
import { FormLabel, Input, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import { ANALYZE_APPLICATION_METRICS, ANALYZE_WEBSITE_METRICS } from '../../GlobalVariables';

interface ApplicationServiceEndpointMetricsState {
  applications: SelectableValue[];
  services: SelectableValue[];
  endpoints: SelectableValue[];
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  updateMetrics(metrics: SelectableValue<string>[]): void;

  datasource: DataSource;
}

export class ApplicationServiceEndpointMetrics extends React.Component<Props, ApplicationServiceEndpointMetricsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      applications: [],
      services: [],
      endpoints: []
    };
  }

  componentDidMount() {
    this.loadApplications();
    this.loadServices();
    this.loadEndpoints();
  }

  loadApplications() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchApplications().then(applications => {
      this.setState({
        applications: applications
      });

      if (query.entity && query.entity.key)  {
        if (!_.find(this.state.applications, app => app.key === query.entity.key)) {
          query.entity = { key: null, label: '-- No Application Filter --'};
        }
      } else {
        query.entity = { key: null, label: '-- No Application Filter --'};
      }

      onChange(query);
    });
  }

  loadServices() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchServices(query).then(services => {
      this.setState({
        services: services
      });

      if (query.service && query.service.key)  {
        if (!_.find(this.state.services, app => app.key === query.service.key)) {
          query.service = { key: null, label: '-- No Service Filter --'};
        }
      } else {
        query.service = { key: null, label: '-- No Service Filter --'};
      }

      onChange(query);
    });
  }

  loadEndpoints() {
    const { query, onChange, datasource } = this.props;
    datasource.fetchEndpoints(query).then(endpoints => {
      this.setState({
        endpoints: endpoints
      });

      if (query.endpoint && query.endpoint.key)  {
        if (!_.find(this.state.endpoints, app => app.key === query.endpoint.key)) {
          query.endpoint = { key: null, label: '-- No Endpoint Filter --'};
        }
      } else {
        query.endpoint = { key: null, label: '-- No Endpoint Filter --'};
      }

      onChange(query);
    });
  }

  setWebsitePlaceholder(nrOfTotalResults: number) {
    const { query, onChange } = this.props;
    query.entity = {
      key: null,
      label: 'Please select (' + nrOfTotalResults + ')'
    };

    onChange(query);
  }

  onWebsiteChange = (website: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = website;
    onChange(query);
    onRunQuery();
  };

  onBeaconTypeChange = (type: SelectableValue) => {
    const { query, onChange } = this.props;
    query.entityType = type;
    onChange(query);
  };

  onGroupChange = (group: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.group = group;

    if (query.group && (query.metricCategory.key === ANALYZE_WEBSITE_METRICS || query.metricCategory.key === ANALYZE_APPLICATION_METRICS)) {
      query.showGroupBySecondLevel = query.group.type === 'KEY_VALUE_PAIR';
    }
    if (!query.showGroupBySecondLevel) {
      query.groupbyTagSecondLevelKey = '';
    }

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
        <FormLabel width={14} tooltip={'Select your application.'}>Application</FormLabel>
        <Select
          width={20}
          isSearchable={true}
          value={query.entity}
          options={this.state.applications}
          onChange={this.onWebsiteChange}
        />

        <FormLabel width={7} tooltip={'Select your service.'}>Service</FormLabel>
        <Select
          width={20}
          isSearchable={false}
          value={query.service}
          options={this.state.services}
          onChange={this.onBeaconTypeChange}
        />

        <FormLabel width={8} tooltip={'Select your endpoint.'}>Endpoints</FormLabel>
        <Select
          width={20}
          isSearchable={true}
          value={query.endpoint}
          options={this.state.endpoints}
          onChange={this.onGroupChange}
        />

        <div style={!query.showGroupBySecondLevel ? { display: 'none' } : {}}>
          <Input
            type={'text'}
            value={query.groupbyTagSecondLevelKey}
            onBlur={this.onGroupByTagSecondLevelKeyChange}
          />
        </div>
      </div>
    );
  }

}
