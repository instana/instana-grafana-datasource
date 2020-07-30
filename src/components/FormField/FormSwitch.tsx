import React from 'react';

import { InlineFormLabel, LegacyForms, PopoverContent, SelectOptionGroup } from '@grafana/ui';
import FormWrapper from './FormWrapper';

const { Switch } = LegacyForms;

interface State {}

interface Props {
    label: string;
    value: boolean;
    queryKeyword?: boolean;
    labelWidth?: number | 14;
    tooltip?: PopoverContent;

    onChange();
}

/**
 * Default switch field including label. Switch element is grafana/ui <Switch />.
 */
export default class FormSwitch extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, tooltip, queryKeyword, disabled, labelWidth=14, value,...remaingProps } = this.props;

    return (
      <FormWrapper disabled={disabled}>
        <InlineFormLabel className={queryKeyword?'query-keyword':''} width={labelWidth} tooltip={tooltip}>{label}</InlineFormLabel>
        <Switch checked={value} disabled={disabled} {...remaingProps} />
      </FormWrapper>
    )
  }
}
