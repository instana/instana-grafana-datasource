import React, { ChangeEvent } from 'react';

import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { SLO_INFORMATION } from '../../GlobalVariables';
import SloSpecifics from '../../lists/slo_specifics';
import FormSelect from '../FormField/FormSelect';
import { SelectableValue } from '@grafana/data';
import FormInput from '../FormField/FormInput';
import _ from 'lodash';

const MAX_VAL = 0.9999;

interface SloInformationState {
  sloReports: SelectableValue[];
  isValidSlo: boolean;
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
      isValidSlo: true,
    };
  }

  componentDidMount() {
    isUnmounting = false;
    this.loadSloReports();
    this.isValid(this.props.query.sloValue);
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onSloChange = (slo: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.sloReport = slo;
    onChange({ ...query });
    onRunQuery();
  };

  onSloValueChange = (sloValue: ChangeEvent<HTMLInputElement>) => {
    const { query } = this.props;
    query.sloValue = sloValue.currentTarget.value;

    if (this.isValid(query.sloValue)) {
      // onRunQuery with 500ms delay after last debounce
      this.debouncedRunQuery();
    }
  };

  onSloSpecificChange = (sloSpecific: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.sloSpecific = sloSpecific;
    onChange({ ...query });
    onRunQuery();
  };

  isValid(val: string): boolean {
    const valid = !val || (+val >= 0 && +val <= MAX_VAL);
    this.setState({
      isValidSlo: valid,
    });
    return valid;
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<SloInformationState>,
    nextContext: any
  ): boolean {
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
          noOptionsMessage={'No configured SLI found'}
          value={query.sloReport}
          options={this.state.sloReports}
          onChange={this.onSloChange}
        />

        <FormInput
          queryKeyword
          labelWidth={7}
          inputWidth={0}
          label={'SLO'}
          tooltip={'Type in your desired SLO threshold from 0 to ' + MAX_VAL}
          value={query.sloValue}
          invalid={!this.state.isValidSlo}
          placeholder={'0.99'}
          onChange={this.onSloValueChange}
        />

        <FormSelect
          queryKeyword
          labelWidth={7}
          inputWidth={0}
          label={'Value type'}
          tooltip={
            <div>
              Select your specific SLO information:
              <ul>
                <li>&apos;SLI&apos; requires Gauge visualization</li>
                <li>&apos;Remaining Error Budget&apos; requires Singlestat visualization</li>
                <li>&apos;Timeseries&apos; requires Bars draw mode on Graph visualization</li>
              </ul>
            </div>
          }
          value={query.sloSpecific}
          options={SloSpecifics}
          onChange={this.onSloSpecificChange}
        />
      </div>
    );
  }
}
