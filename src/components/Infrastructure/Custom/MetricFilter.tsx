import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../../types/instana_query';
import { Button, FormField, FormLabel } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../../../datasources/DataSource';

interface MetricFilterState {
  customFilters: string[]
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  availableMetrics: SelectableValue<string>[];
  onFilterChange(customFilters: string[]): void;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class MetricFilter extends React.Component<Props, MetricFilterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      customFilters: []
    };
  }

  onFilterChange = (eventItem: ChangeEvent<HTMLInputElement>, index: number) => {
    const { onFilterChange } = this.props;
    const cf: string[] = this.state.customFilters;
    cf[index] = eventItem.currentTarget.value;
    this.setState({customFilters: cf});
    onFilterChange(cf);
  };

  addCustomFilter = () => {
    let cf = this.state.customFilters;
    cf.push('');
    this.setState({ customFilters: cf });

    const { query, onChange } = this.props;
    query.customFilters = cf;
    onChange(query);
  };

  removeCustomFilter = (index: number) => {
    let cf: string[] = this.state.customFilters;
    cf.splice(index, 1);
    this.setState({ customFilters: cf });
    // removing a filter might result in more than 5 available metrics
    this.props.onFilterChange(cf);
  }

  render() {
    let filter = null;
    let listFilter = this.state.customFilters.map((filters, index) => {
      filter =
        <div className={'gf-form-inline'}>
          <FormField
            label={(index + 1) + '. filter metric select'}
            labelWidth={14}
            inputWidth={30}
            value={this.state.customFilters[index]}
            placeholder={'Please specify'}
            onChange={event => this.onFilterChange(event, index)}
            tooltip={'Type to suggest metrics.'}
          />
          <Button variant={'inverse'} onClick={event => this.removeCustomFilter(index)}>-</Button>
        </div>;
      return filter;
    });

    return (
      <div>
        {listFilter}

        <div className={'gf-form-inline'}>
          <FormLabel width={14} tooltip={'Add an additional metric select filter.'}>Add filter metric select</FormLabel>
          <Button variant={'inverse'} onClick={this.addCustomFilter}>+</Button>
        </div>
      </div>
    );
  }

}
