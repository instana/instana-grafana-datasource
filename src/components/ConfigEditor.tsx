import React, { ChangeEvent, PureComponent } from 'react';
import { DataSourcePluginOptionsEditorProps, DataSourceSettings, SelectableValue } from '@grafana/data';
import { InstanaOptions } from '../types/instana_options';
import { FormField, Switch } from '@grafana/ui';
import getVersion from "../util/instana_version";

interface Props extends DataSourcePluginOptionsEditorProps<InstanaOptions> {
}

interface State {
  canQueryOfflineSnapshots: boolean;
}

export class ConfigEditor extends PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.detectFeatures();
    this.state = { canQueryOfflineSnapshots: true };
  }

  onInstanaOptionsChange = (
    eventItem: ChangeEvent<HTMLInputElement> | SelectableValue<string>,
    key: keyof InstanaOptions
  ) => {
    const { options, onOptionsChange } = this.props;
    const jsonData = {
      ...options.jsonData,
      [key]: eventItem.currentTarget.value,
    };

    onOptionsChange({ ...options, jsonData });
  };

  onSwitchChange = (eventItem: SelectableValue<HTMLInputElement> | any, key: keyof InstanaOptions) => {
    const { options, onOptionsChange } = this.props;
    let value = false;

    if (eventItem && eventItem.currentTarget) {
      value = !options.jsonData[key];
    }

    const jsonData = {
      ...options.jsonData,
      [key]: value,
    };

    onOptionsChange({ ...options, jsonData });
  };

  /**
   * Checks whether the provided tenant-unit is able to provide certain features such as querying offline snapshots.
   */
  detectFeatures = (settings?: DataSourceSettings<InstanaOptions, {}>) => {
    if (!settings) {
      settings = this.props.options;
    }

    if (!settings.id) {
      return;
    }

    getVersion(settings.jsonData).then(version => {
      version ? this.setState({ canQueryOfflineSnapshots: version >= 156 }) : this.setState({ canQueryOfflineSnapshots: false });
    });
  }

  render() {
    const { options } = this.props;
    const { jsonData } = options

    return (
      <div>
        <h4>Instana configuration</h4>
        <FormField
          label="URL"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.url}
          onChange={event => this.onInstanaOptionsChange(event, 'url')}
          onBlur={(e) => this.detectFeatures(options)}
          tooltip={'Enter the URL of your Instana installation. E.g. https://tools-acme.instana.io'}
        />

        <FormField
          label="API token"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.apiToken}
          onChange={event => this.onInstanaOptionsChange(event, 'apiToken')}
          onBlur={(e) => this.detectFeatures(options)}
          tooltip={
            'Enter the API token to access the data. You can create API tokens following the instructions at https://docs.instana.io/quick_start/api/#api-tokens'
          }
        />

        <Switch
          label={'Use proxy'}
          labelClass={'width-14'}
          checked={jsonData.useProxy}
          onChange={event => this.onSwitchChange(event, 'useProxy')}
          tooltipPlacement={'top'}
          tooltip={
            'Use Grafana server as proxy, this adds the Instana API token on the server. Supported with Grafana 5.3+ and Instana datasource 2.0.0+'
          }
        />

        <div style={!this.state.canQueryOfflineSnapshots ? { opacity: "0.4", pointerEvents: "none" } : {}}>
          <Switch
            label={'Enable offline snapshots'}
            labelClass={'width-14'}
            checked={jsonData.showOffline}
            onChange={event => this.onSwitchChange(event, 'showOffline')}
            tooltipPlacement={'top'}
            tooltip={
              'Enables querying offline snapshots for given timeranges. Supported with Instana 1.156+ and Instana datasource 2.3.0+'
            }
          />
        </div>

        <Switch
          label={'Enable SLO dashboards'}
          labelClass={'width-14'}
          checked={jsonData.allowSlo}
          onChange={event => this.onSwitchChange(event, 'allowSlo')}
          tooltipPlacement={'top'}
          tooltip={'Adds a new category that allows retrieval of SLO information (feature flag required).'}
        />

        <br/>
        <b>Maximum query intervals in hours</b>
        <p>
          This settings are optional values to control the load of data queries, by defining the maximum allowed query
          intervals against the Instana API.
        </p>

        <FormField
          label="Infrastructure metrics"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.queryinterval_limit_infra}
          placeholder={'optional: interval limit in hours'}
          onChange={event => this.onInstanaOptionsChange(event, 'queryinterval_limit_infra')}
          tooltip={'Limit for max. query interval in hours for Category: Infrastructure built-in/custom metrics'}
        />

        <FormField
          label="Application metrics"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.queryinterval_limit_app_metrics}
          placeholder={'optional: interval limit in hours'}
          onChange={event => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_metrics')}
          tooltip={'Limit for max. query interval in hours for Category: Application/Service/Endpoint metrics'}
        />

        <FormField
          label="Analyze application calls"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.queryinterval_limit_app_calls}
          placeholder={'optional: interval limit in hours'}
          onChange={event => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_calls')}
          tooltip={'Limit for max. query interval in hours for Category: Analyze application calls'}
        />

        <FormField
          label="Analyze website"
          labelWidth={14}
          inputWidth={30}
          value={jsonData.queryinterval_limit_website_metrics}
          placeholder={'optional: interval limit in hours'}
          onChange={event => this.onInstanaOptionsChange(event, 'queryinterval_limit_website_metrics')}
          tooltip={'Limit for max. query interval in hours for Category: Analyze websites'}
        />
      </div>
    );
  }
}
