import React from "react";
import { InstanaQuery } from "../types/instana_query";
import { FormLabel, Select } from "@grafana/ui";
import { SelectableValue } from "@grafana/data";

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
          options={this.state.sloReports}
          onChange={this.onSloChange}
          value={query.sloReport}
        />
      </div>
    );
  }

}
