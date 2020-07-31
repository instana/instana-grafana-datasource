import React, { ChangeEvent } from 'react';

import {
  SLO_INFORMATION
} from '../../GlobalVariables';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import SloSpecifics from '../../lists/slo_specifics';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import FormInput from '../FormField/FormInput';

interface SloInformationState {
  sloReports: SelectableValue[];
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;

  datasource: DataSource;
}

let isUnmounting = false;

export class SloInformation extends React.Component<Props, SloInformationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sloReports: [],
    };
  }

  componentDidMount() {
    isUnmounting = false;
    this.loadSloReports();
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onSloChange = (slo: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.sloReport = slo;
    onRunQuery();
  };

  onSloValueChange = (sloValue: ChangeEvent<HTMLInputElement>) => {
    const { query, onRunQuery } = this.props;
    query.sloValue = sloValue.currentTarget.value;
    onRunQuery();
  };

  onSloSpecificChange = (sloSpecific: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.sloSpecific = sloSpecific;
    onRunQuery();
  };

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<SloInformationState>, nextContext: any): boolean {
    return nextProps.query.metricCategory.key === SLO_INFORMATION;
  }

  loadSloReports() {
    const { query } = this.props;
    this.props.datasource.getSloReports().then((sloReports) => {
      if (!isUnmounting) {
        this.setState({ sloReports: sloReports });

        if (!query.sloReport && sloReports.length >= 1) {
          query.sloReport = sloReports[0];
        }
      }
    });
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'Configured SLI'}
          tooltip={'SLI configuration used to compute error budget and SLI values.'}
          value={query.sloReport}
          options={this.state.sloReports}
          onChange={this.onSloChange}
        />

        <FormInput
          queryKeyword
          labelWidth={6}
          inputWidth={0}
          label={'SLO'}
          tooltip={'Type in your desired SLO threshold from 0 to 0.9999'}
          value={query.sloValue}
          placeholder={'0.99'}
          onChange={this.onSloValueChange}
        />

        <FormSelect
          queryKeyword
          labelWidth={6}
          inputWidth={0}
          label={'Value type'}
          tooltip={<div>Select your specific SLO information:
            <ul>
              <li>'SLI' requires Gauge visualization</li>
              <li>'Remaining Error Budget' requires Singlestat visualization</li>
              <li>'Timeseries' requires Bars draw mode on Graph visualization</li>
            </ul></div>}
          value={query.sloSpecific}
          options={SloSpecifics}
          onChange={this.onSloSpecificChange}
        />
      </div>
    );
  }
}
