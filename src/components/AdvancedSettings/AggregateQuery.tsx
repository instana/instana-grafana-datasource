import { Select, Switch } from '@grafana/ui';
import React from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import AggregationFunctions from '../../lists/aggregation_function';

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
    query.aggregateGraphs = !query.aggregateGraphs;
    onRunQuery();
  };

  onHideOriginalGraph = (event: React.SyntheticEvent<HTMLInputElement> | undefined) => {
    const { query, onRunQuery } = this.props;
    query.hideOriginalGraphs = !query.hideOriginalGraphs;
    onRunQuery();
  };

  onAggregationFunctionChange = (event: SelectableValue) => {
    const { query, onRunQuery } = this.props;
    query.aggregationFunction = event;
    onRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form-inline'}>
        <Switch
          labelClass={'width-14'}
          tooltipPlacement={'top'}
          checked={query.aggregateGraphs}
          label={'Aggregate query graphs'}
          onChange={this.onAggregateGraphs}
          tooltip={'Aggregate all graphs of a query.'}
        />

        <Select
          width={6}
          isSearchable={false}
          options={AggregationFunctions}
          value={query.aggregationFunction}
          isDisabled={!query.aggregateGraphs}
          onChange={this.onAggregationFunctionChange}
        />

        <div style={!query.aggregateGraphs ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
          <Switch
            labelClass={'width-14'}
            tooltipPlacement={'top'}
            label={'Hide original graphs'}
            checked={query.hideOriginalGraphs}
            onChange={this.onHideOriginalGraph}
            tooltip={'Removes the original graphs resulted from the query and only shows the aggregated graph.'}
          />
        </div>
      </div>
    );
  }
}
