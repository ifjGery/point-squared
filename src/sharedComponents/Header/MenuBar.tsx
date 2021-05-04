import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Menu = styled.section`
  margin-left: 2em;
  align-self: center;
`;

const MenuItem = styled(Link)`
  padding: 0.5em;
  margin-right: 1em;
  border-radius: 5px;

  :hover,
  &.selected:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  :last-of-type {
    margin-right: 0;
  }

  &.selected {
    background: rgba(0, 0, 0, 0.1);
  }
`;

type Item = {
  path: string;
  name: string;
};

interface MenuBarProps {
  items: Array<Item>;
}

const MenuBar: React.FC<MenuBarProps> = ({ items }) => {
  const location = useLocation();

  return (
    <Menu>
      {items.map((item) => (
        <MenuItem
          to={item.path}
          className={location.pathname === item.path ? 'selected' : ''}
        >
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuBar;
