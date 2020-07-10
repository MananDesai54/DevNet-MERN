import React, { Fragment,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profiles';
import GuestLink from './GuestLinks';
import AuthLink from './AuthLinks';
import DropDown from './DropDown';

const Navbar = ({ getCurrentProfile,logout , auth :{
    isAuthenticated,loading
},profile:{
    profile
}
}) => {

    const [open,setOpen] = useState(false);

    useEffect(()=>{
        getCurrentProfile();
        document.title = 'DevNet';
    },[getCurrentProfile]);
    
    const guestLinks = (
        <GuestLink />
    );

    const authLinks = (
        <ul className="navbar-nav">
            { profile!==null && !loading 
                ?<li className="navbar-item" title={profile.user.name}>
                    <Link to={`/profile/${profile.user._id}`} className="navbar-link">
                        <img src={profile.user.avatar} alt="avatar" className="round-img avatar" />{' '}
                        <p> {` ${profile.user.name}`} </p>
                    </Link>
                </li> 
                :<Fragment></Fragment>
            }
            <AuthLink title="Create Post" icon="add" />
            <AuthLink title="Send Message" icon="message" />
            <li className="navbar-item" title="Options">
                <a href="#!" className="icon-button" onClick={()=>{
                    setOpen(!open);
                }}>
                    <i className="material-icons">arrow_drop_down</i>
                </a>
                { open && 
                    <DropDown  
                        profile={profile} 
                        loading={loading}
                        logout={logout} 
                    />    
                }
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

Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    theme:PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        auth:state.auth,
        profile:state.profile,
        theme:state.theme
    }
}

export default connect(mapStateToProps,{
    logout,
    getCurrentProfile,
})(Navbar);