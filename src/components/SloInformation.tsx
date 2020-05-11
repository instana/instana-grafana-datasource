import React from "react";
import { InstanaQuery } from "../types/instana_query";
import { FormLabel, Select } from "@grafana/ui";
import MetricCategories from "../lists/metric_categories";
import { SelectableValue } from "@grafana/data";

interface SloInformationState { }

interface Props {
  hidden: boolean;
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class SloInformation extends React.Component<Props, SloInformationState> {
  constructor(props: any) {
    super(props);
  }

  onSloChange = (slo: SelectableValue<string>) => {
    const { query, onRunQuery } = this.props;
    query.sloReport = slo;
    onRunQuery();
  }

  render() {
    const { query, hidden } = this.props;

    return (
      <div hidden={hidden} className={'gf-form-inline'}>
        <FormLabel width={14} tooltip={'Select your configured SLO.'}>Configured SLO</FormLabel>
        <Select
          width={30}
          isSearchable={false}
          options={MetricCategories}
          onChange={this.onSloChange}
          value={query.sloReport}
        />
      </div>
    );
  }

}
