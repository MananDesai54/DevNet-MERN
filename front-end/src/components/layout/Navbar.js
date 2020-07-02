import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

const Navbar = ({ logout , auth :{isAuthenticated,loading} }) => {

    const guestLinks = (
        <ul>
            <li><Link to="/!">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li>
                <div>
                    <Link to="/dashboard">
                        <i className="fas fa-user"></i>{' '}
                        <span className="hide-sm">Dashboard</span> 
                    </Link>
                </div>
            </li>
            <li><Link to="/!">Developers</Link></li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span> 
                </a>
            </li>
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