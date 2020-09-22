import React, { useState } from 'react';
import { useTheme } from '@grafana/ui';

const DESTINATION = 'DESTINATION';
const SOURCE = 'SOURCE';

const dropdown = {
  position: 'relative',
  background: "transparent",
  width: "32px",
  height: "32px",
  marginRight: "4px",
} as React.CSSProperties;

const dropdown__list = {
  transition: "max-height .2s ease-out",
  maxHeight: 0,
  overflow: "hidden",
  zIndex: 1,
  position: "fixed"
} as React.CSSProperties;

const dropdown__list__active = {
  transition: "max-height .2s ease-out",
  overflow: "hidden",
  zIndex: 1,
  position: "fixed",
  maxHeight: "1000px",
  opacity: 1
} as React.CSSProperties;

const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconSize = 30;

const destinationIcon = (
  <svg style={iconStyle} height={iconSize} width={iconSize}>
    <path transform="translate(3, 5)" fill="#33a2e5"
          d="M4 11.173h6.38L8.115 8.92 9.042 8l3.704 3.684-3.704 3.684-.926-.92 2.263-2.252H4zM16.43 14.316c-1.426 0-2.632-1.206-2.632-2.632 0-1.425 1.206-2.631 2.632-2.631 1.425 0 2.631 1.206 2.631 2.631 0 1.426-1.206 2.632-2.631 2.632z"/>
  </svg>
);

const sourceIcon = (
  <svg style={iconStyle} height={iconSize} width={iconSize}>
    <path transform="translate(3, 5)" fill="#33a2e5"
          d="M9.939 11.173h6.379L14.054 8.92 14.98 8l3.704 3.684-3.704 3.684-.926-.92 2.264-2.252h-6.38c-.308 1.023-1.234 1.842-2.366 1.842C6.132 14.243 5 13.117 5 11.787c0-1.33 1.132-2.457 2.47-2.457 1.234 0 2.16.717 2.469 1.843z"/>
  </svg>
);

/**
 * Props have to be:
 *   value: string
 *   onChange: function that accepts a string as a parameter and returns void
 */
export default function Entity(props: any) {
  const theme = useTheme();

  const dropdown__list__item = {
    background: theme.colors.bg2,
    cursor: "pointer",
    listStyle: "none",
    borderRadius: "3px",
    height: "32px",
  } as React.CSSProperties;

  const [ active, setActive ] = useState(false);

  function toggleDropdown() {
    setActive(!active);
  }

  function handleClick(entity: string) {
    props.onChange(entity);
    setActive(false);
  }

  return (
    <div style={dropdown}>
      <div
        onClick={() => toggleDropdown()}
        style={dropdown__list__item}
      >
        {props.value === DESTINATION ? destinationIcon : sourceIcon}
      </div>
      <ul style={(active ? dropdown__list__active : dropdown__list)}>
        <li
          onClick={() => handleClick(DESTINATION)}
          key={DESTINATION}
          style={dropdown__list__item}
        >
          {destinationIcon}
        </li>
        <li
          onClick={() => handleClick('SOURCE')}
          key={SOURCE}
          style={dropdown__list__item}
        >
          {sourceIcon}
        </li>
      </ul>
    </div>
  );
}
