import React from 'react';
import NavLink from './GuestLinkNavItem';

const GuestLinks = () => {
    return (
        <ul className="navbar-nav">
            <NavLink linkTo="/register" icon="fas fa-user-plus" title="Register" />
            <NavLink linkTo="/login" icon="fas fa-sign-in-alt" title="Login" />
            <NavLink linkTo="/profiles" icon="fas fa-users" title="Developers" />
        </ul>
    )
}

export default GuestLinks;
