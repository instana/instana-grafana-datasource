import React from 'react';

import { InlineFormLabel, TextArea, PopoverContent } from '@grafana/ui';
import FormWrapper from './FormWrapper';

interface State {}

interface Props {
  label: string;
  value: string;
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  queryKeyword?: boolean;
  labelWidth?: number | 14;
  inputWidth?: number | 30;
  tooltip?: PopoverContent;

  onChange(event?: any): any;
}

/**
 * Default input text area including label. Input text area is grafana/ui <TextArea />.
 */
export default class FormTextArea extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, tooltip, queryKeyword, disabled, labelWidth = 14, inputWidth = 30, ...remainingProps } = this.props;

    return (
      <FormWrapper disabled={disabled} stretch={!inputWidth}>
        <InlineFormLabel className={queryKeyword ? 'query-keyword' : ''} width={labelWidth} tooltip={tooltip}>
          {label}
        </InlineFormLabel>
        <TextArea css={''} rows={4} width={inputWidth} disabled={disabled} {...remainingProps} />
      </FormWrapper>
    );
  }
}
