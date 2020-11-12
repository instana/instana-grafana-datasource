import React, { ChangeEvent } from 'react';

import FormTextArea from 'components/FormField/FormTextArea';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import FormSelect from '../FormField/FormSelect';
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

let isUnmounting = false;

export class Explore extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      queryTypes: []
    };
  }

  componentDidMount() {
    const { query, datasource, onChange } = this.props;
    isUnmounting = false;

    datasource.fetchExploreTypes().then(result => {
      if (!isUnmounting) {
        result.unshift({ key: null, label: "Please select (" + result.length + ")" })

        if (!query.entityType || query.entityType?.key === null) {
          query.entityType = result[0];
          onChange(query);
        }

        this.setState({
          queryTypes: result
        });
      }
    });

    if (query.entityType?.key) {
      datasource
      .fetchExploreMetrics(query.entityType)
      .then((results) => {
        this.props.updateMetrics(results);
      });
    }
  }

  componentWillUnmount() {
    isUnmounting = true;
  }

  onFilterChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.tagFilterExpression = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.debouncedRunQuery();
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onTypeChange = (eventItem: SelectableValue) => {
    const { query, datasource, onChange } = this.props;
    query.entityType = eventItem;
    onChange(query);

    if (query.entityType?.key) {
      datasource
        .fetchExploreMetrics(query.entityType)
        .then((results) => {
          this.props.updateMetrics(results);
        });
    }
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        <div className={'gf-form'}>
          <FormSelect
            queryKeyword
            labelWidth={14}
            inputWidth={0}
            label={'Type'}
            tooltip={'Select an entity type for a list of available metrics.'}
            noOptionsMessage={'No types found with query'}
            value={query.entityType}
            options={this.state.queryTypes}
            onChange={this.onTypeChange}
          />
        </div>

         <div className={'gf-form'}>
          <FormTextArea
            queryKeyword
            inputWidth={0}
            label={'Filter'}
            tooltip={'Filter.'}
            value={query.tagFilterExpression}
            onChange={this.onFilterChange}
          />
        </div>
      </div>
    );
  }
}
