import React from 'react';
import styled from 'styled-components';

const LogoStyled = styled.h1`
    margin: 0;
`;

const Logo: React.FC = () => {
    return (
        <LogoStyled>Point Squared</LogoStyled>
    )
}

export default Logo;