import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

const Navbar = ({ logout , auth :{isAuthenticated,loading} }) => {

    const guestLinks = (
        <ul>
            <li><NavLink to="/!">Developers</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li><NavLink to="/!">Developers</NavLink></li>
            <li><a onClick={logout} href="#!"><span className="hide-sm">Logout</span> <i className="fas fa-sign-out-alt"></i>{' '}</a></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-globe"></i> DevNet</Link>
            </h1>
            { !loading && (<React.Fragment>{isAuthenticated?authLinks:guestLinks}</React.Fragment>) }
        </nav>
    )
}

Navbar.prototype = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{
    logout
})(Navbar);