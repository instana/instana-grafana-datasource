import React from 'react';

import { InlineFormLabel, Select, PopoverContent, SelectOptionGroup } from '@grafana/ui';
import FormWrapper from './FormWrapper';
import { SelectableValue } from '@grafana/data';
import './form.css';

interface State {}

interface Props {
  label: string;
  value: SelectableValue;
  options: SelectOptionGroup;
  queryKeyword?: boolean;
  disabled?: boolean;
  defaultValue?: SelectableValue;
  searchable?: boolean | true;
  labelWidth?: number | 14;
  inputWidth?: number | 30;
  placeholder?: string | '-';
  tooltip?: PopoverContent;

  onChange(event?: any): any;
}

/**
 * Default select field including label. Select element is grafana/ui <Select />.
 */
export default class FormSelect extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      label,
      tooltip,
      searchable = true,
      disabled,
      queryKeyword,
      placeholder = '-',
      labelWidth = 14,
      inputWidth = 30,
      ...remaingProps
    } = this.props;

    return (
      <FormWrapper disabled={disabled} stretch={!inputWidth}>
        <InlineFormLabel className={queryKeyword ? 'query-keyword' : ''} width={labelWidth} tooltip={tooltip}>
          {label}
        </InlineFormLabel>
        <Select
          className={'select'}
          menuPlacement={'bottom'}
          disabled={disabled}
          width={inputWidth}
          isSearchable={searchable}
          placeholder={placeholder}
          {...remaingProps}
        />
      </FormWrapper>
    );
  }
}
