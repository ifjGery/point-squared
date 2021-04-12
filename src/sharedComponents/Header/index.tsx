import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuBar from './MenuBar';

const StyledHeader = styled.header`
    display: flex;
    alig-items: center;
`;

const Header: React.FC = () => (
  <StyledHeader>
    <Logo />
    <MenuBar />
  </StyledHeader>
);

export default Header;
