import React, { ChangeEvent } from 'react';

import FormTextArea from 'components/FormField/FormTextArea';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import _ from 'lodash';
import '../plugin.css';

interface State {
  queryTypes: SelectableValue[];
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  queryTypes: SelectableValue[];
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
  updateMetrics(metrics: SelectableValue[]): void;
  updateQueryTypes(types: SelectableValue[]): void;
}

export class Explore extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  onFilterChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.tagFilterExpression = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  }

  isValidJson = (tagFilterExpression: string): boolean => {
    if (tagFilterExpression) {
      try {
        JSON.parse(tagFilterExpression);
        return true;
      } catch (error) {
        return false;
      }
    }

    // no need to invalidate an empty input field
    return true;
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  render() {
    const { query } = this.props;

    return (
      <div>
        <div className={'gf-form'}>
          <FormTextArea
            queryKeyword
            inputWidth={0}
            label={'Filter'}
            tooltip={'This is currently a beta feature and only available for selected customers. If you are interested in this technology, please submit a request via our support system at https://support.instana.com/ '}
            value={query.tagFilterExpression}
            invalid={!this.isValidJson(query.tagFilterExpression)}
            onChange={this.onFilterChange}
          />
        </div>
      </div>
    );
  }
}
