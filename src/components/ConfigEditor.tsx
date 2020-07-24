import { DataSourcePluginOptionsEditorProps, DataSourceSettings, SelectableValue } from '@grafana/data';
import { Legend, Field, Input, Checkbox } from '@grafana/ui';
import React, { ChangeEvent, PureComponent } from 'react';
import { InstanaOptions } from '../types/instana_options';
import getVersion from '../util/instana_version';
import proxyCheck from '../util/proxy_check';

interface Props extends DataSourcePluginOptionsEditorProps<InstanaOptions> {
}

interface State {
  canQueryOfflineSnapshots: boolean;
  canUseProxy: boolean;
}

export class ConfigEditor extends PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.detectFeatures();
    this.state = { canQueryOfflineSnapshots: true, canUseProxy: true };

    // check possibility every time
    this.setState({ canUseProxy: proxyCheck() });

    const { options } = this.props;
    const { jsonData } = options;

    if (jsonData.useProxy === undefined) {
      jsonData.useProxy = proxyCheck();
    }
  }

  onInstanaOptionsChange = (eventItem: ChangeEvent<HTMLInputElement> | SelectableValue, key: keyof InstanaOptions) => {
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

    getVersion(settings.jsonData).then((version: any) => {
      version ? this.setState({ canQueryOfflineSnapshots: version >= 156 }) : this.setState({ canQueryOfflineSnapshots: false });
    });
  };

  render() {
    const { options } = this.props;
    const { jsonData } = options;

    return (
      <div>
        <Legend>Instana configuration</Legend>

        <Field className={'width-30'} horizontal label="URL" description="URL of Instana installation">
          <Input
            width={40}
            value={jsonData.url}
            placeholder={'https://tools-acme.instana.io'}
            onBlur={() => this.detectFeatures(options)}
            onChange={(event) => this.onInstanaOptionsChange(event, 'url')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="API Token" description="To access Instana API">
          <Input
            width={40}
            value={jsonData.apiToken}
            onBlur={() => this.detectFeatures(options)}
            onChange={(event) => this.onInstanaOptionsChange(event, 'apiToken')}
          />
        </Field>

        <Checkbox
          label={'Use Proxy'}
          value={jsonData.useProxy}
          onChange={(event) => this.onSwitchChange(event, 'useProxy')}
          description={'Use Grafana server as proxy. Needs Grafana 5.3+ and Instana datasource 2.0.0+'}
        />

        <Checkbox
          label={'Enable offline snapshots'}
          value={jsonData.showOffline}
          onChange={(event) => this.onSwitchChange(event, 'showOffline')}
          description={'Enables querying offline snapshots. Needs Instana 1.156+ and Instana datasource 2.3.0+'}
        />

        <Checkbox
          label={'Enable SLO dashboards'}
          value={jsonData.allowSlo}
          onChange={(event) => this.onSwitchChange(event, 'allowSlo')}
          description={'Adds a new category that allows retrieval of SLO information (feature flag required).'}
        />

        <br/>
        <br/>
        <b>Maximum query intervals in hours</b>
        <p className={'width-30'}>
          This settings are optional values to control the load of data queries, by defining the maximum allowed query
          intervals against the Instana
          API.
        </p>

        <Field className={'width-30'} horizontal label="Infrastructure metrics">
          <Input
            width={40}
            value={jsonData.queryinterval_limit_infra}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_infra')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Application metrics">
          <Input
            width={40}
            value={jsonData.queryinterval_limit_app_metrics}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_metrics')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Analyze application calls">
          <Input
            width={40}
            value={jsonData.queryinterval_limit_app_calls}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_calls')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Analyze website">
          <Input
            width={40}
            value={jsonData.queryinterval_limit_website_metrics}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_website_metrics')}
          />
        </Field>
      </div>
    );
  }
}
