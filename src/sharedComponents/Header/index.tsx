import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuBar from './MenuBar';

const StyledHeader = styled.header`
  display: flex;
  alig-items: center;
`;

const menuItems = [
  { path: '/', name: 'Home' },
  { path: '/new', name: 'New Item' },
  { path: '/stateGroup', name: 'State Manager' },
];

const Header: React.FC = () => (
  <StyledHeader>
    <Logo />
    <MenuBar items={menuItems} />
  </StyledHeader>
);

export default Header;
