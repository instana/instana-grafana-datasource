import { FormField, Switch } from "@grafana/ui";
import React, { ChangeEvent } from "react";
import { InstanaQuery } from "../types/instana_query";
import { AggregateQuery } from "./AggregateQuery";

const legendFormatPlaceholders = [
  '$label (on host $host)',
  '$label (on host $host)',
  '$label ($application) - $key',
  '$label ($website) - $key',
  '$label ($application) - $key',
  '',
  '',
  '',
]

interface AdvancedSettingsState {
  showAdditionalSettings: boolean;
  legendFormatPlaceholder: string;
}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class AdvancedSettings extends React.Component<Props, AdvancedSettingsState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showAdditionalSettings: false,
      legendFormatPlaceholder: this.setLegendFormatPlaceholder()
    }
  }

  onLegendFormatChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    query.legendFormat = eventItem.currentTarget.value;
    this.props.onRunQuery();
  }

  onTimeShiftChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    query.timeShift = eventItem.currentTarget.value;
    this.props.onRunQuery();
  }

  setLegendFormatPlaceholder(): string {
    const { query } = this.props;
    return legendFormatPlaceholders[query.metricCategory.key];
  }

  render() {
    const { query, onRunQuery, onChange } = this.props;

    return (
      <div>
        <Switch
          labelClass={'width-14'}
          tooltipPlacement={'top'}
          label={'Show advanced settings'}
          tooltip={'Show all additional settings'}
          checked={this.state.showAdditionalSettings}
          onChange={e => this.setState({ showAdditionalSettings: !this.state.showAdditionalSettings })}
        />

        <div hidden={!this.state.showAdditionalSettings}>
          <div hidden={query.metricCategory.key === 7}>
            <FormField
              labelWidth={14}
              inputWidth={30}
              label={'Legend format'}
              value={query.legendFormat}
              placeholder={this.setLegendFormatPlaceholder()}
              onChange={event => this.onLegendFormatChange(event)}
              tooltip={'Enter the URL of your Instana installation. E.g. https://tools-acme.instana.io'}
            />
          </div>

          <FormField
            labelWidth={14}
            inputWidth={30}
            placeholder={'1h'}
            label={'Time shift'}
            value={query.timeShift}
            onChange={event => this.onTimeShiftChange(event)}
            tooltip={'Specify the amount of hours that shall be used. The time shift function always go back in time, not forward. Accepts values such as 1s, 1m, 1h, 1d, 1w.'}
          />

          <div hidden={query.metricCategory.key !== 0 && query.metricCategory.key !== 1}>
            <AggregateQuery query={query} onRunQuery={onRunQuery} onChange={onChange}/>
          </div>

        </div>
      </div>
    );
  }
}
