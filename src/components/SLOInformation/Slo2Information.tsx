import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import FormSelect from '../FormField/FormSelect';
import { InstanaQuery } from '../../types/instana_query';
import { PLEASE_SPECIFY, SLO2_INFORMATION } from '../../GlobalVariables';
import { SelectableValue } from '@grafana/data';
import Slo2Specifics from '../../lists/slo2_specifics';
import _ from 'lodash';

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
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onSlo2Change = (slo: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof slo === 'string') {
      query.slo2Report = { key: slo, label: slo };
    } else {
      query.slo2Report = slo;
    }

    onChange(query);
    onRunQuery();
  };

  onSloSpecificChange = (slo2Specific: SelectableValue) => {
    const { query, onRunQuery, onChange } = this.props;
    query.slo2Specific = slo2Specific;
    onChange({ ...query });
    onRunQuery();
  };

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<Slo2InformationState>,
    nextContext: any
  ): boolean {
    return nextProps.query.metricCategory.key === SLO2_INFORMATION;
  }

  loadSloReports() {
    const { query } = this.props;

    // Check if slo2Report is a variable
    const slo2ReportValue = query.slo2Report?.key || query.slo2Report?.label;
    const isSlo2ReportVariable =
      slo2ReportValue && typeof slo2ReportValue === 'string' && slo2ReportValue.includes('$');

    this.props.datasource.getSloReports().then((sloReports) => {
      if (!isUnmounting) {
        this.setState({ sloReports: sloReports });

        // CRITICAL FIX: If slo2Report is a variable, trigger query execution
        if (isSlo2ReportVariable && query.slo2Report) {
          console.log('[Slo2Information] SLO2 Report is a variable, triggering query execution');
          this.props.onRunQuery();
        }
      }
    });
  }

  render() {
    const { query } = this.props;

    // Format slo2Report value for Select component with allowCustomValue
    let slo2ReportValue = query.slo2Report;
    if (query.slo2Report && query.slo2Report.key) {
      slo2ReportValue = {
        ...query.slo2Report,
        value: query.slo2Report.key,
        label: query.slo2Report.label || query.slo2Report.key,
      };
    }

    return (
      <div className={'gf-form'}>
        <FormSelect
          queryKeyword
          inputWidth={0}
          label={'SLO Configuration name'}
          tooltip={'SLI configuration used to compute SLI Report or type variable like $slo2Report'}
          noOptionsMessage={'No configured SLO found'}
          value={slo2ReportValue}
          options={this.state.sloReports}
          onChange={this.onSlo2Change}
          allowCustomValue={true}
          placeholder={PLEASE_SPECIFY}
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
                <li>&apos;Service Level Target&apos; requires Gauge visualization</li>
                <li>&apos;Total Error Budget&apos; requires Singlestat visualization</li>
                <li>&apos;Remaining Error Budget&apos; requires Singlestat visualization</li>
                <li>&apos;Spended Error Budget&apos; requires Singlestat visualization</li>
                <li>&apos;Violation&apos; requires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Chart&apos; requires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Accumulation Chart&apos; requires Bars draw mode on Graph visualization</li>
                <li>&apos;Error Budget Chart&apos; requires Bars draw mode on Graph visualization</li>
              </ul>
            </div>
          }
          value={query.slo2Specific}
          options={Slo2Specifics}
          onChange={this.onSloSpecificChange}
          placeholder={PLEASE_SPECIFY}
        />
      </div>
    );
  }
}
