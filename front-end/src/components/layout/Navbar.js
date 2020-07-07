import React, { Fragment,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profiles';

const Navbar = ({ getCurrentProfile,logout , auth :{
    isAuthenticated,loading
},profile:{
    profile
}}) => {

    useEffect(()=>{
        getCurrentProfile();
        document.title = 'DevNet';
    },[getCurrentProfile]);
    
    const guestLinks = (
        <ul>
            <li><Link to="/profiles"><i className="fas fa-users"></i>  Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li>
                <div>
                    <Link to="/posts">Posts</Link>
                </div>
            </li>
            <li>
                <div>
                    <Link to="/dashboard">
                        <i className="fas fa-user"></i>{' '}
                        <span className="hide-sm">Dashboard</span> 
                    </Link>
                </div>
            </li>
            <li>
                <div>
                    <Link to="/profiles">
                        <i className="fas fa-users"></i>{' '}
                        <span className="hide-sm">Developers</span>
                    </Link>
                </div>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span> 
                </a>
            </li>
            { profile!==null && !loading 
                ?<li>
                    <div>
                        <Link to={`/profile/${profile.user._id}`}>
                            <img src={profile.user.avatar} alt="avatar" className="round-img avatar" />
                        </Link>
                    </div>
                </li> 
                :<Fragment></Fragment>
            }
            
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
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        auth:state.auth,
        profile:state.profile,
    }
}

export default connect(mapStateToProps,{
    logout,
    getCurrentProfile
})(Navbar);