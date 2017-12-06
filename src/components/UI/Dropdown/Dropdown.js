import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { Icon } from 'UI';

const Dropdown = ({
  label,
  button,
  classNameButton = '',
  dropdownWidth = 'auto',
  dropdownPosition = 'left',
  dropdownTopOverlap = '0',
  children
}) => {
  const style = {
    width: dropdownWidth,
    top: dropdownTopOverlap,
    left: dropdownPosition === 'left' ? 0 : 'auto',
    right: dropdownPosition === 'right' ? 0 : 'auto',
  };
  return (
    <Wrapper className="nc-dropdown" onSelection={handler => handler()}>
      {
        button
          ? <Button>{button}</Button>
          : <Button className={c('nc-dropdownButton', classNameButton)}>{label}</Button>
      }
      <Menu>
        <ul className="nc-dropdownList" style={style}>
          {children}
        </ul>
      </Menu>
    </Wrapper>
  );
};

const DropdownItem = ({ label, icon, iconDirection, onClick }) => (
  <MenuItem className="nc-dropdownItem" value={onClick}>
    <span>{label}</span>
    {
      icon
        ? <span className="nc-dropdownItemIcon">
            <Icon type={icon} direction={iconDirection} size="small"/>
          </span>
        : null
    }
  </MenuItem>
);


export { Dropdown, DropdownItem };
