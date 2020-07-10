import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                    <span> <i className="fas fa-user-plus"></i> </span>{' '}
                    <p>Register</p>
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                    <span> <i className="fas fa-sign-in-alt"></i> </span>{' '}
                    <p>Login</p>
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="/profiles" className="navbar-link">
                    <span><i className="fas fa-users"></i></span>{' '}
                    <p>Developers</p>
                </Link>
            </li>
        </ul>
    )
}

export default GuestLinks
