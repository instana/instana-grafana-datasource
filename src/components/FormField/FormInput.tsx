import React from 'react';

import { InlineFormLabel, Input, PopoverContent } from '@grafana/ui';
import FormWrapper from './FormWrapper';

interface State {}

interface Props {
  label: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  queryKeyword?: boolean;
  labelWidth?: number | 14;
  inputWidth?: number | 30;
  tooltip?: PopoverContent;

  onChange(event?: any): any;
}

/**
 * Default input field including label. Input element is grafana/ui <Input />.
 */
export default class FormInput extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      label,
      tooltip,
      placeholder,
      queryKeyword,
      disabled,
      labelWidth = 14,
      inputWidth = 30,
      ...remaingProps
    } = this.props;

    return (
      <FormWrapper disabled={disabled} stretch={!inputWidth}>
        <InlineFormLabel className={queryKeyword ? 'query-keyword' : ''} width={labelWidth} tooltip={tooltip}>
          {label}
        </InlineFormLabel>
        <Input css={''} width={inputWidth} disabled={disabled} {...remaingProps} />
      </FormWrapper>
    );
  }
}
