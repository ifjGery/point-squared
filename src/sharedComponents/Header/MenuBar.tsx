import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';

const MenuBar : React.FC = () => {
    const Menu = styled.section`
        margin-left: 2em;
        align-self: center;
    `;

    const MenuItem = styled(Link)`
        padding: 0.5em;
        margin-right: 1em;

        :hover,
        &.selected:hover {
            background: rgba(0,0,0,0.2);
        }

        :last-of-type {
            margin-right: 0;
        }

        &.selected {
            background: rgba(0,0,0,0.1);
        }
    `;

    const location = useLocation();

    return (
        <Menu>
            <MenuItem to="/" className={location.pathname === "/" ? "selected" : ""}>Home</MenuItem>
            <MenuItem to="/new" className={location.pathname === "/new" ? "selected" : ""}>New Item</MenuItem>
        </Menu>
    )
}

export default MenuBar;