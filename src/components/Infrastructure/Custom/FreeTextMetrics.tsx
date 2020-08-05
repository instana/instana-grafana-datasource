import React, { ChangeEvent } from 'react';

import { InstanaQuery } from '../../../types/instana_query';
import FormSwitch from '../../FormField/FormSwitch';
import { Input } from '@grafana/ui';
import _ from 'lodash';

interface FreeTextMetricsState {}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class FreeTextMetrics extends React.Component<Props, FreeTextMetricsState> {
  constructor(props: any) {
    super(props);
  }

  deboundedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onUseFreeTextMetricsChange = (event: React.SyntheticEvent<HTMLInputElement> | undefined) => {
    const { query, onChange } = this.props;
    if (event && event.currentTarget) {
      query.useFreeTextMetrics = event.currentTarget.checked;
      if (query.useFreeTextMetrics) {
        query.metric = {};
      }
      onChange(query);
    }
  };

  onFreeTextMetricsChange = (eventItem: ChangeEvent<HTMLInputElement>) => {
    const { query, onChange } = this.props;
    query.freeTextMetrics = eventItem.currentTarget.value;
    onChange(query);

    // onRunQuery with 500ms delay after last debounce
    this.deboundedRunQuery();
  };

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form'}>
        <FormSwitch
          queryKeyword
          label={'Enable free text metrics'}
          tooltip={
            'Specify comma separated metrics directly in this text field. Once this field has a value,' +
            ' selected metrics from above will be ignored. Enabled as soon as a query is entered. ' +
            'Max 4 metrics supported.'
          }
          value={query.useFreeTextMetrics}
          onChange={this.onUseFreeTextMetricsChange}
          disabled={false}
        />
        <Input
          css={''}
          width={0}
          disabled={!query.useFreeTextMetrics}
          value={query.freeTextMetrics}
          placeholder={'metric.one,metric.two,metric.three'}
          onChange={this.onFreeTextMetricsChange}
        />
      </div>
    );
  }
}
