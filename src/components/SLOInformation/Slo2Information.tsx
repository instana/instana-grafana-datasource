import React from 'react';

import { DataSource } from '../../datasources/DataSource';
import FormSelect from '../FormField/FormSelect';
import { InstanaQuery } from '../../types/instana_query';
import { SLO2_INFORMATION } from '../../GlobalVariables';
import { SelectableValue } from '@grafana/data';
import Slo2Specifics from '../../lists/slo2_specifics';
import _ from 'lodash';

interface Slo2InformationState {
  slo2Reports: SelectableValue[];
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
      slo2Reports: [],
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

  onSlo2Change = (slo: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.slo2Report = slo;
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
    this.props.datasource.getSlo2Reports().then((slo2Reports) => {
      if (!isUnmounting) {
        this.setState({ slo2Reports: slo2Reports });
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
          tooltip={'SLI configuration used to compute SLI Report.'}
          noOptionsMessage={'No configured SLO found'}
          value={query.slo2Report}
          options={this.state.slo2Reports}
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
        />
      </div>
    );
  }
}
