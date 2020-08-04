import React, { ChangeEvent, PureComponent } from 'react';

import { DataSourcePluginOptionsEditorProps, DataSourceSettings, SelectableValue } from '@grafana/data';
import { Legend, Field, Input, Checkbox, Icon, Tooltip } from '@grafana/ui';
import { InstanaOptions } from '../types/instana_options';
import getVersion from '../util/instana_version';
import proxyCheck from '../util/proxy_check';
import _ from 'lodash';

interface Props extends DataSourcePluginOptionsEditorProps<InstanaOptions> {
}

interface State {
  canQueryOfflineSnapshots: boolean;
  canUseProxy: boolean;
}

export class ConfigEditor extends PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = { canQueryOfflineSnapshots: false, canUseProxy: false };

    // check possibility every time
    this.detectFeatures();

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

    if ('url' === key || 'apiToken' === key) {
      this.debouncedDetectFeatures(options);
    }
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

  debouncedDetectFeatures = (settings?: DataSourceSettings<InstanaOptions, {}>) => {
    _.debounce(() => this.detectFeatures(settings), 500);
  }

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

    this.setState({ canUseProxy: proxyCheck() });
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

        <Field className={'width-30'} horizontal required label="URL" description="The URL of your Instana installation.">
          <Input
            css=''
            width={30}
            value={jsonData.url}
            placeholder={'https://tools-acme.instana.io'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'url')}
          />
        </Field>

        <Field className={'width-30'} horizontal required label="API Token" description="The API token to access the data.">
          <Input
            css=''
            width={30}
            value={jsonData.apiToken}
            suffix={<Tooltip content={<p>You can create API tokens following the instructions at <a href="https://docs.instana.io/quick_start/api/#api-tokens">https://docs.instana.io/quick_start/api/#api-tokens</a></p>} theme={'info'}>
                      <Icon name="info-circle"/>
                    </Tooltip>}
            onChange={(event) => this.onInstanaOptionsChange(event, 'apiToken')}
          />
        </Field>

        <Checkbox
          css=''
          label={'Use Proxy'}
          value={jsonData.useProxy}
          onChange={(event) => this.onSwitchChange(event, 'useProxy')}
          description={'Use Grafana server as proxy. Needs Grafana 5.3+ and Instana datasource 2.0.0+'}
        />

        <Checkbox
          css=''
          label={'Enable offline snapshots'}
          value={jsonData.showOffline}
          onChange={(event) => this.onSwitchChange(event, 'showOffline')}
          description={'Enables querying offline snapshots. Needs Instana release 156+ and Instana datasource 2.3.0+'}
        />

        <Checkbox
          css=''
          label={'Enable SLO dashboards'}
          value={jsonData.allowSlo}
          onChange={(event) => this.onSwitchChange(event, 'allowSlo')}
          description={'Adds a new category that allows retrieval of SLO information. Needs Instana release 176+ and a explicit feature flag.'}
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
            css=''
            width={30}
            value={jsonData.queryinterval_limit_infra}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_infra')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Application metrics">
          <Input
            css=''
            width={30}
            value={jsonData.queryinterval_limit_app_metrics}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_metrics')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Analyze application calls">
          <Input
            css=''
            width={30}
            value={jsonData.queryinterval_limit_app_calls}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_app_calls')}
          />
        </Field>

        <Field className={'width-30'} horizontal label="Analyze website">
          <Input
            css=''
            width={30}
            value={jsonData.queryinterval_limit_website_metrics}
            placeholder={'optional: interval limit in hours'}
            onChange={(event) => this.onInstanaOptionsChange(event, 'queryinterval_limit_website_metrics')}
          />
        </Field>
      </div>
    );
  }
}
