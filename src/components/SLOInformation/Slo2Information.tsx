import React, { ChangeEvent } from 'react';

import { DataSource } from '../../datasources/DataSource';
// import FormInput from '../FormField/FormInput';
import FormSelect from '../FormField/FormSelect';
import { InstanaQuery } from '../../types/instana_query';
import { SLO2_INFORMATION } from '../../GlobalVariables';
import { SelectableValue } from '@grafana/data';
import Slo2Specifics from '../../lists/slo2_specifics';
import _ from 'lodash';

const MAX_VAL = 0.9999;

interface Slo2InformationState {
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

export class Slo2Information extends React.Component<Props, Slo2InformationState> {
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

  onSlo2Change = (slo: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.sloReport = slo;
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
    const { query, onRunQuery } = this.props;
    query.sloSpecific = sloSpecific;
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
    nextState: Readonly<Slo2InformationState>,
    nextContext: any
  ): boolean {
    return nextProps.query.metricCategory.key === SLO2_INFORMATION;
  }

  loadSloReports() {
    const { query } = this.props;
    this.props.datasource.getSlo2Reports().then((sloReports) => {
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
          label={'SLO Configuration name'}
          tooltip={'SLI configuration used to compute error budget and SLI values.'}
          noOptionsMessage={'No configured SLI found'}
          value={query.sloReport}
          options={this.state.sloReports}
          onChange={this.onSlo2Change}
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
                <li>&apos;Status&apos; requires Gauge visualization</li>
                <li>&apos;Remaining Error Budget&apos; requires Singlestat visualization</li>
                <li>&apos;Violation&apos; drequires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Chart&apos; drequires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Accumulation Chart&apos; drequires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Budget Chart&apos; drequires Bars draw mode on Graph visualization</li>
              </ul>
            </div>
          }
          value={query.sloSpecific}
          options={Slo2Specifics}
          onChange={this.onSloSpecificChange}
        />

      </div>
    );
  }
}
