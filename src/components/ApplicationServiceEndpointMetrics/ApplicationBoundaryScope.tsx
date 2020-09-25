import React, { useState } from 'react';
import { useTheme } from '@grafana/ui';

const INBOUND = 'INBOUND';
const ALL = 'ALL';

const dropdown = {
  position: 'relative',
  background: 'transparent',
  width: '32px',
  height: '32px',
  marginRight: '4px',
} as React.CSSProperties;

const dropdown__list = {
  transition: 'max-height .2s ease-out',
  maxHeight: 0,
  overflow: 'hidden',
  zIndex: 1,
  position: 'fixed',
} as React.CSSProperties;

const dropdown__list__active = {
  overflow: 'hidden',
  zIndex: 2, // we set a zIndex to ensure that the overlay is above other elements and does not move any DOM elements.
  position: 'fixed',
  maxHeight: '1000px',
  opacity: 1,
} as React.CSSProperties;

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconSize = 30;

const inboundIcon = (
  <svg style={iconStyle} height={iconSize} width={iconSize}>
    <path
      transform="translate(3, 5)"
      fill="#33a2e5"
      d="M12.7891666,14.6051302 L12.7751756,19.8293818 L11.4691127,19.8328795 L11.4776628,16.6402814 L6.96695389,21.1509902 L6.2433066,20.427343 L10.7540155,15.9166341 L7.56141732,15.9251842 L7.56491507,14.6191213 L12.7891666,14.6051302 Z M15.754133,9.38135895 C17.1795716,9.38135895 18.3857119,10.5874993 18.3857119,12.0129379 C18.3857119,13.4383765 17.1795716,14.6445168 15.754133,14.6445168 C14.3286944,14.6445168 13.122554,13.4383765 13.122554,12.0129379 C13.122554,10.5874993 14.3286944,9.38135895 15.754133,9.38135895 Z M6.96695389,3.2433066 L11.4776628,7.75401547 L11.4691127,4.56141732 L12.7751756,4.56491507 L12.7891666,9.7891666 L7.56491507,9.77517557 L7.56141732,8.46911269 L10.7540155,8.47766276 L6.2433066,3.96695389 L6.96695389,3.2433066 Z"
    />
  </svg>
);

const allIcon = (
  <svg style={iconStyle} height={iconSize} width={iconSize}>
    <path
      transform="translate(3, 5)"
      fill="#33a2e5"
      d="M7.54586,15 L7.53186897,20.2242515 L6.22580608,20.2277493 L6.23435616,17.0351511 L1.72364729,21.54586 L1,20.8222127 L5.51070887,16.3115038 L2.31811071,16.3200539 L2.32160847,15.013991 L7.54586,15 Z M14.1975552,7.94441147 L17.901552,11.628622 L14.1975552,15.3128325 L13.271556,14.3917799 L15.5351096,12.1403179 L12.4724561,12.1407167 C12.2827518,13.474447 11.1361413,14.5 9.75,14.5 C8.23121694,14.5 7,13.2687831 7,11.75 C7,10.2312169 8.23121694,9 9.75,9 C11.0508538,9 12.1407461,9.90323356 12.4267385,11.1167623 L15.5351096,11.1169261 L13.271556,8.8654641 L14.1975552,7.94441147 Z M20.75,9 C22.2687831,9 23.5,10.2312169 23.5,11.75 C23.5,13.2687831 22.2687831,14.5 20.75,14.5 C19.2312169,14.5 18,13.2687831 18,11.75 C18,10.2312169 19.2312169,9 20.75,9 Z M1.72364729,2 L6.23435616,6.51070887 L6.22580608,3.31811071 L7.53186897,3.32160847 L7.54586,8.54586 L2.32160847,8.53186897 L2.31811071,7.22580608 L5.51070887,7.23435616 L1,2.72364729 L1.72364729,2 Z"
    />
  </svg>
);

/**
 * Props have to be:
 *   value: string
 *   onChange: function that accepts a string as a parameter and returns void
 *   disabled: boolean
 */
export default function ApplicationBoundaryScope(props: any) {
  const theme = useTheme();

  const opacity = props.disabled ? 0.5 : 1;

  const dropdown__list__item = {
    background: theme.colors.bg2,
    cursor: 'pointer',
    listStyle: 'none',
    borderRadius: '3px',
    height: '32px',
    opacity: opacity,
  } as React.CSSProperties;

  const [active, setActive] = useState(false);

  function toggleDropdown() {
    if (!props.disabled) {
      setActive(!active);
    }
  }

  function handleClick(entity: string) {
    props.onChange(entity);
    setActive(false);
  }

  return (
    <div style={dropdown}>
      <div
        onClick={() => toggleDropdown()}
        onBlur={() => setActive(false)}
        style={dropdown__list__item}
        contentEditable
      >
        {props.value === INBOUND ? inboundIcon : allIcon}
      </div>
      <ul style={active ? dropdown__list__active : dropdown__list}>
        <li onClick={() => handleClick(INBOUND)} key={INBOUND} style={dropdown__list__item}>
          {inboundIcon}
        </li>
        <li onClick={() => handleClick(ALL)} key={ALL} style={dropdown__list__item}>
          {allIcon}
        </li>
      </ul>
    </div>
  );
}
