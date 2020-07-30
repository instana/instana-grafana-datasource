import React, { ChangeEvent } from 'react';

import {
  PLEASE_SPECIFY
} from '../../../GlobalVariables';
import { DataSource } from '../../../datasources/DataSource';
import { InstanaQuery } from '../../../types/instana_query';
import { Button, InlineFormLabel } from '@grafana/ui';
import FormInput from '../../FormField/FormInput';
import { SelectableValue } from '@grafana/data';

interface MetricFilterState {
  customFilters: string[];
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  availableMetrics: SelectableValue[];
  onFilterChange(customFilters: string[]): void;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class MetricFilter extends React.Component<Props, MetricFilterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      customFilters: [],
    };
  }

  componentDidMount() {
    const { query } = this.props;
    this.setState({ customFilters: query.customFilters });

    this.props.onFilterChange(query.customFilters);
  }

  onFilterChange = (eventItem: ChangeEvent<HTMLInputElement>, index: number) => {
    const customFilters: string[] = this.state.customFilters;
    customFilters[index] = eventItem.currentTarget.value;
    this.setState({ customFilters: customFilters });

    this.props.onFilterChange(customFilters);
  };

  addCustomFilter = () => {
    let customFilters = this.state.customFilters;
    customFilters.push('');
    this.setState({ customFilters: customFilters });

    const { query, onChange } = this.props;
    query.customFilters = customFilters;
    onChange(query);
  };

  removeCustomFilter = (index: number) => {
    let customFilters: string[] = this.state.customFilters;
    customFilters.splice(index, 1);
    this.setState({ customFilters: customFilters });

    this.props.onFilterChange(customFilters);
  };

  render() {
    let filter = null;
    let listFilter = this.state.customFilters.map((filters, index) => {
      filter = (
        <div className={'gf-form'}>
          <FormInput
            label={index + 1 + '. filter metric select'}
            value={this.state.customFilters[index]}
            placeholder={PLEASE_SPECIFY}
            onChange={(event) => this.onFilterChange(event, index)}
            tooltip={'Type to suggest metrics.'}
          />
          <Button variant={'secondary'} onClick={() => this.removeCustomFilter(index)}>
            -
          </Button>
        </div>
      );
      return filter;
    });

    return (
      <div>
        {listFilter}

        <div className={'gf-form'}>
          <InlineFormLabel width={14} tooltip={'Add an additional metric select filter.'}>
            Add filter metric select
          </InlineFormLabel>
          <Button variant={'secondary'} onClick={this.addCustomFilter}>
            +
          </Button>
        </div>
      </div>
    );
  }
}
