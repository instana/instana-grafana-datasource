import React, { ChangeEvent } from "react";
import { InstanaQuery } from "../../types/instana_query";
import { FormLabel, Input, Select } from '@grafana/ui';
import { SelectableValue } from "@grafana/data";
import SloSpecifics from '../../lists/slo_specifics';
import { DataSource } from "../../datasources/DataSource";

interface SloInformationState {
  sloReports: SelectableValue<string>[];
}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  datasource: DataSource;
}

export class SloInformation extends React.Component<Props, SloInformationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sloReports: []
    }

    this.loadSloReports();
  }

  onSloChange = (slo: SelectableValue<string>) => {
    const { query, onRunQuery } = this.props;
    query.sloReport = slo;
    onRunQuery();
  }

  onSloValueChange = (sloValue: ChangeEvent<HTMLInputElement>) => {
    const { query, onRunQuery } = this.props;
    query.sloValue = sloValue.currentTarget.value;
    onRunQuery();
  }

  onSloSpecificChange = (sloSpecific: SelectableValue<string>) => {
    const { query, onRunQuery } = this.props;
    query.sloSpecific = sloSpecific;
    onRunQuery();
  }

  shouldComponentUpdate(nextProps: Readonly<Props>,
                        nextState: Readonly<SloInformationState>,
                        nextContext: any): boolean {
    return nextProps.query.metricCategory.key === 7;
  }

  loadSloReports() {
    const { query } = this.props;
    this.props.datasource.getSloReports().then(sloReports => {
      this.setState({sloReports: sloReports});

      if (!query.sloReport && sloReports.length >= 1) {
        query.sloReport = sloReports[0];
      }
    })
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'SLI configuration used to compute error budget and SLI values.'}>Configured SLI</FormLabel>
        <Select
          width={30}
          isSearchable={false}
          value={query.sloReport}
          onChange={this.onSloChange}
          options={this.state.sloReports}
        />

        <FormLabel tooltip={'Type in your desired SLO threshold from 0 to 0.9999'}>SLO</FormLabel>

        <Input
          value={query.sloValue}
          placeholder={'0.99'}
          onChange={this.onSloValueChange}
        />

        <FormLabel>Value type</FormLabel>
        <Select
          width={30}
          isSearchable={false}
          options={SloSpecifics}
          value={query.sloSpecific}
          onChange={this.onSloSpecificChange}
        />
      </div>
    );
  }

}
