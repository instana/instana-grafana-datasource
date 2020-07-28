
import React from 'react';

import { InlineFormLabel, PopoverContent } from '@grafana/ui';

interface State {}

interface Props {
    label: string;
    value: string;
    hidden?: boolean;
    placeholder?: string;
    queryKeyword?: boolean;
    labelWidth?: number | 14;
    inputWidth?: number | 30;
    tooltip?: PopoverContent;

    onChange();
}

/**
 * Default input field including label. Input element is grafana/ui <Input />.
 */
export default class FormInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, tooltip, placeholder, queryKeyword, hidden, labelWidth=14, inputWidth=30,...remaingProps } = this.props;
    return (
      <div className={'gf-form'} hidden={hidden}>
        <InlineFormLabel className={queryKeyword?'query-keyword':''} width={labelWidth} tooltip={tooltip}>{label}</InlineFormLabel>
        <input type="text"
          className={inputWidth>0?'width-'+inputWidth:'full-width'}
          {...remaingProps}
        />
      </div>
    )
  }
}
