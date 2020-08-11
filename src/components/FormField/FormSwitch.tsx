import React from 'react';

import { InlineFormLabel, LegacyForms, PopoverContent } from '@grafana/ui';
import FormWrapper from './FormWrapper';

const { Switch } = LegacyForms;

interface State {}

interface Props {
  label: string;
  value: boolean;
  disabled?: boolean;
  queryKeyword?: boolean;
  labelWidth?: number | 14;
  tooltip?: PopoverContent;

  onChange(event?: any): any;
}

/**
 * Default switch field including label. Switch element is grafana/ui <Switch />.
 */
export default class FormSwitch extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, tooltip, queryKeyword, disabled, labelWidth = 14, value, ...remainingProps } = this.props;

    return (
      <FormWrapper disabled={disabled} stretch={false}>
        <InlineFormLabel className={queryKeyword ? 'query-keyword' : ''} width={labelWidth} tooltip={tooltip}>
          {label}
        </InlineFormLabel>
        <Switch checked={value} label={''} {...remainingProps} />
      </FormWrapper>
    );
  }
}
