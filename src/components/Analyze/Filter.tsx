import React, { ChangeEvent } from 'react';
import { InstanaQuery } from '../../types/instana_query';
import { Button, FormLabel, Input, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DataSource } from '../../datasources/DataSource';
import operators from '../../lists/operators';
import _ from 'lodash';
import TagFilter from '../../types/tag_filter';

interface FilterState {
  tagFilters: TagFilter[]
}

interface Props {
  query: InstanaQuery;
  datasource: DataSource;
  groups: SelectableValue[];
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class Filters extends React.Component<Props, FilterState> {
  OPERATOR_STRING = 'STRING';
  OPERATOR_NUMBER = 'NUMBER';
  OPERATOR_BOOLEAN = 'BOOLEAN';
  OPERATOR_KEY_VALUE = 'KEY_VALUE_PAIR';

  constructor(props: any) {
    super(props);

    this.state = {
      tagFilters: []
    };
  }

  addTagFilter = () => {
    const { query, onChange, groups } = this.props;
    let cf = this.state.tagFilters;
    cf.push({
      tag: groups[0],
      entity: { },
      booleanValue: false,
      isValid: false,
      numberValue: 0,
      operator: this.filterOperatorsOnType(groups[0].type)[0],
      stringValue: '',
    });

    this.setState({ tagFilters: cf });
    query.filters = cf;
    onChange(query);
  };

  removeTagFilter = (index: number) => {
    const { query, onChange, onRunQuery } = this.props;
    let cf: TagFilter[] = this.state.tagFilters;
    cf.splice(index, 1);
    this.setState({ tagFilters: cf });
    query.filters = cf;

    onChange(query);
    onRunQuery();
  }

  filterOperatorsOnType(type: any): SelectableValue[] {
    return _.filter(operators, o => o.type === type)
  }

  onGroupChange(group: SelectableValue, index: number) {
    const { query, onChange } = this.props;
    query.filters[index].tag = group;

    let ops = this.filterOperatorsOnType(group.type);
    if (!_.includes(ops, query.filters[index].operator)) {
      query.filters[index].operator = ops[0];
    }

    onChange(query);
    this.isValid(index);
  }

  onOperatorChange = (operator: SelectableValue, index: number) => {
    const { query, onChange } = this.props;
    query.filters[index].operator = operator;
    onChange(query);
    this.isValid(index);
  }

  canShowStringInput(filter: TagFilter) {
    return (filter.tag.type === 'STRING' || filter.tag.type === 'KEY_VALUE_PAIR') && !filter.operator.key.includes('EMPTY')
  }

  onTagFilterStringValueChange = (value: ChangeEvent<HTMLInputElement>, index: number) => {
    const { query, onChange } = this.props;
    query.filters[index].stringValue = value.currentTarget.value;
    onChange(query);
    this.isValid(index);
  }

  onTagFilterNumberValueChange = (value: ChangeEvent<HTMLInputElement>, index: number) => {
    const { query, onChange } = this.props;
    query.filters[index].numberValue = value.currentTarget.valueAsNumber;
    onChange(query);
    this.isValid(index);
  }

  onTagFilterBooleanValueChange(value: SelectableValue, index: number) {
    const { query, onChange } = this.props;
    query.filters[index].booleanValue = value.key;
    onChange(query);
    this.isValid(index);
  }

  isValid(index: number) {
    const { query, onChange, onRunQuery } = this.props;
    if (query.filters[index].tag) {
      if (query.filters[index].operator.key.includes("EMPTY")) {
        query.filters[index].isValid = true;
        // to avoid sending value with query.filters[index] operators that do not require a value (such as is-present/is-not-present)
        query.filters[index].stringValue = "";
        query.filters[index].numberValue = 0;
        query.filters[index].booleanValue = true;
      } else if (this.OPERATOR_STRING === query.filters[index].tag.type && query.filters[index].stringValue) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_KEY_VALUE === query.filters[index].tag.type && query.filters[index].stringValue && query.filters[index].stringValue.includes('=')) {
        query.filters[index].isValid = true;
      } else if (this.OPERATOR_NUMBER === query.filters[index].tag.type && query.filters[index].numberValue !== null) {
        query.filters[index].isValid = true;
      } else query.filters[index].isValid = this.OPERATOR_BOOLEAN === query.filters[index].tag.type && query.filters[index].booleanValue;
    } else {
      query.filters[index].isValid = false;
    }

    onChange(query);
    onRunQuery();
  }

  render() {
    const { query, groups } = this.props;
    let filter = null;
    let listFilter = this.state.tagFilters.map((filters, index) => {
      filter =
        <div className={'gf-form-inline'}>
          <FormLabel width={14} tooltip={'Add an additional tag filter.'}>Add filter</FormLabel>
          <Select
            width={20}
            isSearchable={true}
            value={query.filters[index].tag}
            options={groups}
            onChange={group => this.onGroupChange(group, index)}
          />
          <Select
            width={10}
            isSearchable={true}
            value={query.filters[index].operator}
            options={this.filterOperatorsOnType(query.filters[index].tag.type)}
            onChange={operator => this.onOperatorChange(operator, index)}
          />

          { this.canShowStringInput(query.filters[index]) &&
          <Input
            value={query.filters[index].stringValue}
            placeholder={query.filters[index].tag.type === 'KEY_VALUE_PAIR' ? 'key=value' : 'please specify'}
            onChange={e => this.onTagFilterStringValueChange(e, index)}
            onBlur={this.props.onRunQuery}
          />
          }

          { query.filters[index].tag.type === 'NUMBER' &&
          <Input
            type={'number'}
            value={query.filters[index].numberValue}
            placeholder={'please specify'}
            onChange={e => this.onTagFilterNumberValueChange(e, index)}
            onBlur={this.props.onRunQuery}
          />
          }

          { query.filters[index].tag.type === 'BOOLEAN' &&
          <Select
            onChange={e => this.onTagFilterBooleanValueChange(e, index)}
            value={{key: '' + query.filters[index].booleanValue, label: '' + query.filters[index].booleanValue}}
            options={[{key: 'false', label: 'false'}, {key: 'true', label: 'true'}, ]}
          />
          }

          <Button variant={'inverse'} onClick={event => this.removeTagFilter(index)}>-</Button>
        </div>;
      return filter;
    });

    return (
      <div>
        {listFilter}

        <div className={'gf-form-inline'}>
          <FormLabel width={14} tooltip={'Add an additional tag filter.'}>Add filter</FormLabel>
          <Button variant={'inverse'} onClick={this.addTagFilter}>+</Button>
        </div>
      </div>
    );
  }

}
