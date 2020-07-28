
import React from 'react';

import { InlineFormLabel, Select, PopoverContent, SelectOptionGroup } from '@grafana/ui';

interface State {}

interface Props {
    label: string;
    value: string;
    options: SelectOptionGroup;
    hidden?: boolean;
    queryKeyword?: boolean;
    searchable?: boolean | true;
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
    const { label, tooltip, searchable=true, queryKeyword, hidden, placeholder='-', labelWidth=14, inputWidth=30,...remaingProps } = this.props;

    return (
      <div className={'gf-form'} hidden={hidden}>
        <InlineFormLabel className={queryKeyword?'query-keyword':''} width={labelWidth} tooltip={tooltip}>{label}</InlineFormLabel>
        <Select
          width={inputWidth}
          isSearchable={searchable}
          placeholder={placeholder}
          {...remaingProps}
        />
      </div>
    )
  }
}
