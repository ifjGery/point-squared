import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuBar from './MenuBar';

const Header: React.FC = () => {
    const StyledHeader = styled.header`
        display: flex;
        alig-items: center;
    `;

    return (
        <StyledHeader>
            <Logo />
            <MenuBar />
        </StyledHeader>
    );
}

export default Header;