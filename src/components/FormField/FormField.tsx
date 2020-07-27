
import React from 'react';

import { Field, Input, PopoverContent } from '@grafana/ui';

interface State {}

interface Props {
    label: string;
    value: string;
    description?: string;
    placeholder?: string;
    hidden?: boolean | false;
    labelWidth?: number | 14;
    inputWidth?: number | 30;
    tooltip?: PopoverContent;
}

/**
 * Default form field including label. Default input element is simple <input />.
 */
export default class FormField extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { label, value, description, placeholder, hidden, labelWidth, inputWidth } = this.props; // , onChange, onBlur
    return (
      <div hidden={hidden}>
        <Field className={'width-'+labelWidth} horizontal label={label} description={description}>
          <Input width={inputWidth}
            value={value}
            placeholder={placeholder}
  //                onChange={onChange}
  //                onBlur={onBlur}
          />
        </Field>
      </div>
    )
  }
}
