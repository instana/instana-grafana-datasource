import React, { ChangeEvent } from "react";
import { InstanaQuery } from "../types/instana_query";
import { FormLabel, Input, Select } from "@grafana/ui";
import { SelectableValue } from "@grafana/data";
import SloSpecifics from '../lists/slo_specifics';

interface SloInformationState {
  sloReports: SelectableValue<string>[];
}

interface Props {
  query: InstanaQuery;

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;
}

export class SloInformation extends React.Component<Props, SloInformationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sloReports: this.getOptions()
    }
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

  getOptions(): SelectableValue<string>[] {
    console.log("getOptions");
    return [
      {
        label: 'Slo 1',
        value: 'Value 1'
      },
      {
        label: 'Slo 2',
        value: 'Value 2'
      }
    ];
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select your configured SLO.'}>Configured SLO</FormLabel>
        <Select
          width={30}
          isSearchable={false}
          value={query.sloReport}
          onChange={this.onSloChange}
          options={this.state.sloReports}
        />

        <FormLabel tooltip={'Type in your desired SLO value. E.g, 0.9 for 90% SLO.'}>Slo Value</FormLabel>

        <Input
          value={query.sloValue}
          placeholder={'0.99'}
          onChange={this.onSloValueChange}
        />

        <FormLabel tooltip={'TODO'}>Specifics</FormLabel>
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
