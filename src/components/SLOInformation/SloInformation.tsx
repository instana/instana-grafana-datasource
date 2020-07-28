import React, { ChangeEvent } from 'react';

import { InlineFormLabel, Input, Select } from '@grafana/ui';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import SloSpecifics from '../../lists/slo_specifics';
import { SelectableValue } from '@grafana/data';

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
    return nextProps.query.metricCategory.key === 7;
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
      <div className={'gf-form-inline'}>
        <InlineFormLabel className={'query-keyword'} width={14} tooltip={'SLI configuration used to compute error budget and SLI values.'}>Configured SLI</InlineFormLabel>
        <Select width={30} isSearchable={false} value={query.sloReport} onChange={this.onSloChange} options={this.state.sloReports} />

        <InlineFormLabel className={'query-keyword'} width={4} tooltip={'Type in your desired SLO threshold from 0 to 0.9999'}>SLO</InlineFormLabel>
        <Input width={30} value={query.sloValue} placeholder={'0.99'} onChange={this.onSloValueChange} />

        <InlineFormLabel className={'query-keyword'} width={6}>Value type</InlineFormLabel>
        <Select width={30} isSearchable={false} options={SloSpecifics} value={query.sloSpecific} onChange={this.onSloSpecificChange} />
      </div>
    );
  }
}
