import React from 'react';
import { Link,NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-globe"></i> DevNet</Link>
            </h1>
            <ul>
                <li><NavLink to="/">Developers</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;