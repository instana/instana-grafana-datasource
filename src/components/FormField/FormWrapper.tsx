import React from 'react';


export default function FormWrapper({ disabled, stretch, children }) {
  const style = { display: 'flex' };
  if (disabled) {
    style.opacity = '0.4';
    style.pointerEvents = 'none';
  }
  if (stretch) {
    style.width = '100%';
  }
  return (
    <div style={style}>
      {children}
    </div>
)}
