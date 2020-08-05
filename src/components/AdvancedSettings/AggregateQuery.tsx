import React from 'react';

import AggregationFunctions from '../../lists/aggregation_function';
import { InstanaQuery } from '../../types/instana_query';
import FormSwitch from '../FormField/FormSwitch';
import { SelectableValue } from '@grafana/data';
import { Select } from '@grafana/ui';

interface AggregateQueryState {}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class AggregateQuery extends React.Component<Props, AggregateQueryState> {
  constructor(props: any) {
    super(props);
    this.state = { showAdditionalSettings: false, legendFormat: '' };
    const { query } = this.props;
    if (!query.aggregationFunction) {
      query.aggregationFunction = AggregationFunctions[0];
    }
  }

  onAggregateGraphs = (event: React.SyntheticEvent<HTMLInputElement> | undefined) => {
    const { query, onRunQuery } = this.props;
    if (event && event.currentTarget) {
      query.aggregateGraphs = event.currentTarget.checked;
      onRunQuery();
    }
  };

  onHideOriginalGraph = (event: React.SyntheticEvent<HTMLInputElement> | undefined) => {
    const { query, onRunQuery } = this.props;
    if (event && event.currentTarget) {
      query.hideOriginalGraphs = event.currentTarget.checked;
      onRunQuery();
    }
  };

  onAggregationFunctionChange = (event: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.aggregationFunction = event;
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form'}>
        <FormSwitch
          queryKeyword
          label={'Aggregate query graphs'}
          tooltip={'Aggregate all graphs of a query.'}
          value={query.aggregateGraphs}
          onChange={this.onAggregateGraphs}
        />

        <Select
          menuPlacement={'bottom'}
          width={12}
          isSearchable={true}
          options={AggregationFunctions}
          value={query.aggregationFunction}
          disabled={!query.aggregateGraphs}
          onChange={this.onAggregationFunctionChange}
        />

        <FormSwitch
          queryKeyword
          disabled={!query.aggregateGraphs}
          labelWidth={10}
          label={'Hide original graphs'}
          tooltip={'Removes the original graphs resulted from the query and only shows the aggregated graph.'}
          value={query.hideOriginalGraphs}
          onChange={this.onHideOriginalGraph}
        />
      </div>
    );
  }
}
