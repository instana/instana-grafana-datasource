import React from 'react';

export default function FormDisabled({ disabled, strech, children }) {
  const style = { display: 'flex' };
  if (disabled) {
    style.opacity = '0.4';
    style.pointerEvents = 'none';
  }
  if (strech) {
    style.width = '100%';
  }
  return (
    <div style={style}>
      {children}
    </div>
)}
