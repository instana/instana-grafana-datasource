
import React from 'react';

import { InlineFormLabel, Input, PopoverContent } from '@grafana/ui';

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
export default class FormField extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, tooltip, placeholder, queryKeyword, hidden, labelWidth=14, inputWidth=30,...remaingProps } = this.props;
    return (
      <div className={'gf-form'} hidden={hidden}>
        <InlineFormLabel className={queryKeyword?'query-keyword':''} width={labelWidth} tooltip={tooltip}>{label}</InlineFormLabel>
        <Input
          width={inputWidth}
          {...remaingProps}
        />
      </div>
    )
  }
}
