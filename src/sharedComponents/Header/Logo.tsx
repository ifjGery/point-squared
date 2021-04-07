import React from 'react';
import styled from 'styled-components';

const Logo: React.FC = () => {
    const LogoStyled = styled.h1`
        margin: 0;
    `;

    return (
        <LogoStyled>Point Squared</LogoStyled>
    )
}

export default Logo;