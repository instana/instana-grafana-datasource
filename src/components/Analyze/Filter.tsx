import React, { FormEvent } from 'react';

import { ANALYZE_APPLICATION_METRICS, PLEASE_SPECIFY } from '../../GlobalVariables';
import { Button, InlineFormLabel, Input, Select } from '@grafana/ui';
import call_to_entities from '../../lists/apply_call_to_entities';
import { DataSource } from '../../datasources/DataSource';
import { InstanaQuery } from '../../types/instana_query';
import { SelectableValue } from '@grafana/data';
import TagFilter from '../../types/tag_filter';
import operators from '../../lists/operators';
import Entity from '../Entity/Entity';
import _ from 'lodash';

interface FilterState {}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  groups: SelectableValue[];

  onRunQuery(): void;

  onChange(value: InstanaQuery): void;
}

export class Filters extends React.Component<Props, FilterState> {
  OPERATOR_STRING = 'STRING';
  OPERATOR_STRING_SET = 'STRING_SET';
  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';
  OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

  constructor(props: any) {
    super(props);
  }

  addTagFilter = () => {
    const { query, onChange } = this.props;
    query.filters.push({
      tag: query.group,
      entity: call_to_entities[0],
      operator: this.filterOperatorsOnType(query.group.type)[0],
      booleanValue: false,
      numberValue: 0,
      stringValue: '',
      isValid: false,
    });

    onChange(query);
  };

  removeTagFilter = (index: number) => {
    const { query, onChange, onRunQuery } = this.props;
    query.filters.splice(index, 1);

    onChange(query);
    onRunQuery();
  };

  filterOperatorsOnType(type: any): SelectableValue[] {
    return _.filter(operators, (o) => o.type === type);
  }

  onGroupChange(group: SelectableValue, index: number) {
    const { query } = this.props;
    query.filters[index].tag = group;

    let ops = this.filterOperatorsOnType(group.type);
    if (!_.includes(ops, query.filters[index].operator)) {
      query.filters[index].operator = ops[0];
    }

    this.validateChangeAndRun(index);
  }

  onCallToEntityChange = (callToEntity: string, index: number) => {
    const { query } = this.props;
    query.filters[index].entity = callToEntity;

    this.validateChangeAndRun(index);
  };

  onOperatorChange = (operator: SelectableValue, index: number) => {
    const { query } = this.props;
    query.filters[index].operator = operator;

    this.validateChangeAndRun(index);
  };

  canShowStringInput(filter: TagFilter) {
    return (
      filter.tag.type === this.OPERATOR_KEY_VALUE ||
      (!filter.operator.key.includes('EMPTY') &&
        (filter.tag.type === this.OPERATOR_STRING || filter.tag.type === this.OPERATOR_STRING_SET))
    );
  }

  debouncedRunQuery = _.debounce(this.props.onRunQuery, 500);

  onTagFilterStringValueChange = (value: FormEvent<HTMLInputElement>, index: number) => {
    const { query } = this.props;
    query.filters[index].stringValue = value.currentTarget.value;

    this.validateChangeAndRun(index, true);
  };

  onTagFilterNumberValueChange = (value: FormEvent<HTMLInputElement>, index: number) => {
    const { query } = this.props;
    query.filters[index].numberValue = value.currentTarget.valueAsNumber;

    this.validateChangeAndRun(index, true);
  };

  onTagFilterBooleanValueChange(value: SelectableValue, index: number) {
    const { query } = this.props;
    query.filters[index].booleanValue = value.key;

    this.validateChangeAndRun(index);
  }

  validateChangeAndRun(index: number, runDebounced = false) {
    const { query, onChange, onRunQuery } = this.props;
    if (query.filters[index].tag) {
      if (
        query.filters[index].operator.key.includes('EMPTY') &&
        (this.OPERATOR_STRING === query.filters[index].tag.type ||
          this.OPERATOR_STRING_SET === query.filters[index].tag.type)
      ) {
        query.filters[index].isValid = true;
        // to avoid sending value with query.filters[index] operators that do not require a value (such as is-present/is-not-present)
        query.filters[index].stringValue = '';
        query.filters[index].numberValue = 0;
        query.filters[index].booleanValue = true;
      } else if (
        (this.OPERATOR_STRING === query.filters[index].tag.type ||
          this.OPERATOR_STRING_SET === query.filters[index].tag.type) &&
        query.filters[index].stringValue
      ) {
        query.filters[index].isValid = true;
      } else if (
        query.filters[index].operator.key.includes('EMPTY') &&
        this.OPERATOR_KEY_VALUE === query.filters[index].tag.type &&
        query.filters[index].stringValue
      ) {
        query.filters[index].isValid = true;
      } else if (
        this.OPERATOR_KEY_VALUE === query.filters[index].tag.type &&
        query.filters[index].stringValue &&
        query.filters[index].stringValue.includes('=')
      ) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_NUMBER === query.filters[index].tag.type && !isNaN(query.filters[index].numberValue)) {
        query.filters[index].isValid = true;
      } else if (
        this.OPERATOR_BOOLEAN === query.filters[index].tag.type &&
        query.filters[index].booleanValue !== undefined
      ) {
        query.filters[index].isValid = true;
      }
    } else {
      query.filters[index].isValid = false;
    }

    onChange(query);
    if (runDebounced) {
      // onRunQuery with 500ms delay after last debounce
      this.debouncedRunQuery();
    } else {
      onRunQuery();
    }
  }

  render() {
    const { query, groups } = this.props;

    let listFilter = query.filters.map((singleFilter, index) => {
      return (
        <div className={'gf-form'}>
          <InlineFormLabel className={'query-keyword'} width={14} tooltip={'Filter by tag.'}>
            {index + 1}. filter
          </InlineFormLabel>
          {query.metricCategory.key === ANALYZE_APPLICATION_METRICS && (
            <Entity
              value={query.filters[index].entity}
              onChange={(callToEntity: string) => this.onCallToEntityChange(callToEntity, index)}
            />
          )}
          <Select
            menuPlacement={'bottom'}
            width={30}
            isSearchable={true}
            value={query.filters[index].tag}
            options={groups}
            onChange={(group) => this.onGroupChange(group, index)}
          />
          <Select
            menuPlacement={'bottom'}
            width={12}
            isSearchable={true}
            value={query.filters[index].operator}
            options={this.filterOperatorsOnType(query.filters[index].tag.type)}
            onChange={(operator) => this.onOperatorChange(operator, index)}
          />

          {this.canShowStringInput(query.filters[index]) && (
            <Input
              css={''}
              width={30}
              value={query.filters[index].stringValue}
              placeholder={query.filters[index].tag.type === 'KEY_VALUE_PAIR' ? 'key=value' : PLEASE_SPECIFY}
              onChange={(event) => this.onTagFilterStringValueChange(event, index)}
            />
          )}

          {query.filters[index].tag.type === 'NUMBER' && (
            <Input
              css={''}
              type={'number'}
              width={30}
              value={query.filters[index].numberValue}
              placeholder={PLEASE_SPECIFY}
              onChange={(event) => this.onTagFilterNumberValueChange(event, index)}
            />
          )}

          {query.filters[index].tag.type === 'BOOLEAN' && (
            <Select
              menuPlacement={'bottom'}
              width={30}
              isSearchable={true}
              onChange={(e) => this.onTagFilterBooleanValueChange(e, index)}
              value={{ key: '' + query.filters[index].booleanValue, label: '' + query.filters[index].booleanValue }}
              options={[
                { key: 'false', label: 'false' },
                { key: 'true', label: 'true' },
              ]}
            />
          )}

          <Button variant={'secondary'} onClick={() => this.removeTagFilter(index)}>
            -
          </Button>
        </div>
      );
    });

    return (
      <div>
        {listFilter}

        <div className={'gf-form'}>
          <InlineFormLabel width={14} tooltip={'Add an additional tag filter.'}>
            Add filter
          </InlineFormLabel>
          <Button variant={'secondary'} onClick={this.addTagFilter}>
            +
          </Button>
          <div hidden={!query.showWarningCantShowAllResults}>
            <InlineFormLabel width={12} tooltip={'Add Filter to narrow down the data.'}>
              ⚠️ Can't show all results
            </InlineFormLabel>
          </div>
        </div>
      </div>
    );
  }
}
