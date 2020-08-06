import React from 'react';

interface WrapperProps {
  disabled?: boolean;
  stretch?: boolean;
  children: any;
}

export default function FormWrapper(props: WrapperProps) {
  const style: any = { display: 'flex' };

  if (props.disabled) {
    style.opacity = '0.4';
    style.pointerEvents = 'none';
  }

  if (props.stretch) {
    style.width = '100%';
  }

  return <div style={style}>{props.children}</div>;
}
