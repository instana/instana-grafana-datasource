import React from 'react';
import { DataSource } from '../../datasources/DataSource';
import { SelectableValue } from '@grafana/data';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
import { PLEASE_SPECIFY } from 'GlobalVariables';

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
  { label: PLEASE_SPECIFY, value: '' },
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
        const placeholderOption: SelectableValue = { label: PLEASE_SPECIFY, value: '' };

        const testOptions: SelectableValue[] = [
          placeholderOption,
          ...tests.map((test: any) => ({
            label: test.key,
            value: test.label,
            test,
          })),
        ];

        this.setState({ tests: testOptions });

        // Set to placeholder if entity is not already set
        if (!query.entity || !query.entity.value) {
          query.entity = placeholderOption;
          query.testId = '';
          onChange(query);
        }

        // Set to placeholder if testType is not already set
        if (!query.testType || !query.testType.value) {
          query.testType = { label: PLEASE_SPECIFY, value: '' };
          onChange(query);
        }
      }
    } catch (error) {
      console.error('Error fetching synthetic tests', error);
    }

    // Fetch metrics catalog
    datasource.dataSourceSyntheticMonitoring
      .getSyntheticMonitoringMetricsCatalog()
      .then((SyntheticMonitoringMetrics: any) => {
        if (!isUnmounting) {
          this.props.updateMetrics(SyntheticMonitoringMetrics);
        }
      });
  };

  onTestChange = (test: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof test === 'string') {
      // When a variable is used, try to find the matching test from available tests
      const matchingTest = this.state.tests.find((t: any) => t.value === test || t.label === test);

      if (matchingTest && matchingTest.test) {
        // Found matching test, use its testId
        query.entity = { value: test, label: test };
        query.testId = matchingTest.test.testId;
      } else {
        // Variable value doesn't match any test, store as-is (will be interpolated later)
        query.entity = { value: test, label: test };
        query.testId = test; // Use the variable value as testId
      }
    } else {
      query.entity = test;
      if (test.test) {
        query.testId = test.test.testId;
      } else {
        query.testId = '';
      }
    }

    onChange(query);
    onRunQuery();
  };

  onTestTypeChange = async (testType: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    const prevTestTypeValue = query.testType?.value;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof testType === 'string') {
      query.testType = { value: testType, label: testType };
    } else {
      query.testType = testType;
    }

    // If switching between 'metric' <-> 'results', then reset the test
    const newTestTypeValue = typeof testType === 'string' ? testType : testType.value;
    const isSwitchingTypes =
      (prevTestTypeValue === 'metric' && newTestTypeValue === 'results') ||
      (prevTestTypeValue === 'results' && newTestTypeValue === 'metric');

    if (isSwitchingTypes) {
      query.entity = { label: PLEASE_SPECIFY, value: '' };
      query.testId = '';
    }

    onChange(query);
    onRunQuery();
  };

  onMetricChange = (metric: SelectableValue | string) => {
    const { query, onChange, onRunQuery } = this.props;

    // Handle both string (variable) and SelectableValue (dropdown selection)
    if (typeof metric === 'string') {
      query.metric = { key: metric, value: metric, label: metric };
    } else {
      query.metric = metric;
    }

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
            allowCustomValue={true}
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
            allowCustomValue={true}
          />
        </div>
      </div>
    );
  }
}
