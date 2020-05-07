import { Switch } from "@grafana/ui";
import React from "react";
import { SelectableValue } from "@grafana/data";

interface AdvancedSettingsState {
  showAdditionalSettings: boolean;
}

interface Props {
  metricCategory: SelectableValue;
}

export class AdvancedSettings extends React.Component<Props, AdvancedSettingsState> {
  constructor(props: any) {
    super(props);
    this.state = { showAdditionalSettings: false}
  }

  render() {
    return (
      <Switch
        checked={this.state.showAdditionalSettings}
        onChange={e => this.setState({showAdditionalSettings: !this.state.showAdditionalSettings})}
        label={'' + this.props.metricCategory.label}
        labelClass={'width-14'}
        tooltipPlacement={'top'}
        tooltip={'Show all additional settings'}
       />
    );
  }
}
