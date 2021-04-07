import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const MenuBar : React.FC = () => {
    return (
        <Fragment>
            <Link to="/">Home</Link>
            <Link to="/new">New Item</Link>
        </Fragment>
    )
}

export default MenuBar;