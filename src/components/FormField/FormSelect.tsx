
import React from 'react';

import { InlineFormLabel, Select, PopoverContent, SelectOptionGroup } from '@grafana/ui';

interface State {}

interface Props {
    label: string;
    value: string;
    options: SelectOptionGroup;
    hidden?: boolean;
    searchable?: boolean;
    queryKeyword?: boolean;
    labelWidth?: number | 14;
    inputWidth?: number | 30;
    placeholder?: string | '-';
    tooltip?: PopoverContent;

    onChange();
}

/**
 * Default select field including label. Select element is grafana/ui <Select />.
 */
export default class FormSelect extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, value, tooltip, options, searchable, placeholder, queryKeyword, hidden, labelWidth, inputWidth, onChange } = this.props;

    return (
      <div className={'gf-form'} hidden={hidden}>
        <InlineFormLabel className={queryKeyword?'query-keyword':''} width={labelWidth} tooltip={tooltip}>{label}</InlineFormLabel>
        <Select
          width={inputWidth}
          isSearchable={searchable}
          options={options}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    )
  }
}
