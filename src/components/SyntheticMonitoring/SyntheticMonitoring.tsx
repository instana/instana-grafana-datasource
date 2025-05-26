import React from 'react';
import { DataSource } from '../../datasources/DataSource';
import { SelectableValue } from '@grafana/data';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  onChange(value: InstanaQuery): void;
  onRunQuery(): void;
  updateMetrics(metrics: SelectableValue[]): void;
}

interface State {
  tests: SelectableValue[];
}
const testTypeOptions: SelectableValue[] = [
  { label: 'Select your test type', value: '' },
  { label: 'Metric', value: 'metric' },
  { label: 'Results', value: 'results' },
];

let isUnmounting = false;

export class SyntheticMonitoring extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tests: [],
    };
  }

  componentDidMount() {
    isUnmounting = false;
    this.fetchSyntheticTests();
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  fetchSyntheticTests = async () => {
    const { datasource, query, onChange } = this.props;

    try {
      const tests = await datasource.dataSourceSyntheticMonitoring.getSyntheticMonitoringtests();

      if (!isUnmounting) {
        const testOptions: SelectableValue[] = [
          { label: 'Please specify', value: '' },
          ...tests.map((test: any) => ({
            label: test.key,
            value: test.label,
          })),
        ];

        this.setState({ tests: testOptions });

        if (!query.entity || !query.entity.value) {
          query.entity = testOptions[0];
          onChange(query);
        }

        if (!query.testType || !query.testType.value) {
          query.testType = testTypeOptions[0];
          onChange(query);
        }
      }
    } catch (error) {
      console.error('Error fetching synthetic tests', error);
    }

    datasource.dataSourceSyntheticMonitoring
      .getSyntheticMonitoringMetricsCatalog()
      .then((SyntheticMonitoringMetrics: any) => {
        if (!isUnmounting) {
          this.props.updateMetrics(SyntheticMonitoringMetrics);
        }
      });
  };

  onTestChange = (test: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.entity = test;
    onChange(query);
    onRunQuery();
  };

  onTestTypeChange = async (testType: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.testType = testType;
    onChange(query);
    onRunQuery();
  };

  onMetricChange = (metric: SelectableValue) => {
    const { query, onChange, onRunQuery } = this.props;
    query.metric = metric;
    onChange(query);
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div>
        <div className="gf-form">
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Synthetic Test'}
            tooltip={'Select your test'}
            noOptionsMessage={'No synthetic tests found'}
            value={query.entity}
            options={this.state.tests}
            onChange={this.onTestChange}
          />
          <FormSelect
            queryKeyword
            inputWidth={0}
            label={'Type'}
            tooltip={'Select your test type'}
            noOptionsMessage={'No synthetic test type found'}
            value={query.testType}
            options={testTypeOptions}
            onChange={this.onTestTypeChange}
          />
        </div>
      </div>
    );
  }
}
