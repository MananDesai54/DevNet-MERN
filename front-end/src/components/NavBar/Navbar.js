import React, { Fragment,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profiles';
import { Switch } from '@material-ui/core';
import { setTheme } from '../../actions/theme';
import Sun from '../../assets/svg/sun.svg';
import Moon from '../../assets/svg/moon.svg';
import { CSSTransition } from 'react-transition-group';
import GuestLink from './GuestLinks';

const Navbar = ({ getCurrentProfile,logout , auth :{
    isAuthenticated,loading
},profile:{
    profile
},theme:{
    darkTheme
},setTheme
}) => {

    const [checked,setChecked] = useState(darkTheme);
    const [open,setOpen] = useState(false);
    const [activeMenu,setActiveMenu] = useState('main');
    const [height,setHeight] = useState(null);

    const calcHeight = e =>{
        setHeight(e.offsetHeight+80);
    }

    useEffect(()=>{
        getCurrentProfile();
        document.title = 'DevNet';
    },[getCurrentProfile]);

    const changeTheme = () =>{
        setChecked(!checked);
        setTheme();
    }
    
    const guestLinks = (
        <GuestLink />
    );

    const authLinks = (
        <ul className="navbar-nav">
            { profile!==null && !loading 
                ?<li className="navbar-item" title={profile.user.name}>
                    <div>
                        <Link to={`/profile/${profile.user._id}`} className="navbar-link">
                            <img src={profile.user.avatar} alt="avatar" className="round-img avatar" />{' '}
                            <p> {` ${profile.user.name}`} </p>
                        </Link>
                    </div>
                </li> 
                :<Fragment></Fragment>
            }
            <li className="navbar-item">
                <a href="#!" className="icon-button" title="Create Post">
                    <i className="material-icons">add</i>
                </a>
            </li>
            <li className="navbar-item" title="Send Message">
                <a href="#!" className="icon-button">
                    <i className="material-icons">message</i>
                </a>
            </li>
            <li className="navbar-item" title="Options">
                <a href="#!" className="icon-button" onClick={()=>{
                    setOpen(!open);
                }}>
                    <i className="material-icons">arrow_drop_down</i>
                </a>
                { open && 
                <div className="dropdown" style={{height:height}}>
                    <CSSTransition 
                        in={activeMenu === 'main'}
                        unmountOnExit 
                        timeout={400} 
                        classNames='menu-primary'
                        onEnter={calcHeight}
                    >
                        <div className="menu">
                        { profile!==null && !loading 
                            ?<Link to={`/profile/${profile.user._id}`} className="menu-item check-profile" title={profile.user.name}>
                                <img src={profile.user.avatar} alt="avatar" className="round-img avatar" />{' '}
                                <p className="menu-title user-profile">
                                    <span>{` ${profile.user.name}`} </span>
                                    <small>Check Your Profile</small>
                                </p>
                                <span><i className="material-icons">arrow_forward_ios</i></span>
                            </Link> 
                            :<Fragment></Fragment>
                        }
                            <a href="#!" className="menu-item" onClick={()=>{
                                setActiveMenu('settings')
                            }}>
                                <span className="icon-button"><i className="material-icons">settings</i></span>
                                <p className="menu-title">Setting</p>
                                <span><i className="material-icons">arrow_forward_ios</i></span>
                            </a>
                            <a href="#!" className="menu-item">
                                <span className="icon-button"><i className="material-icons">help</i></span>
                                <p className="menu-title">Help & Support</p>
                                <span><i className="material-icons">arrow_forward_ios</i></span>
                            </a>
                            <a href="#!" className="menu-item">
                                <span className="icon-button">
                                    <i className="fas fa-moon"></i>
                                </span>
                                <p className="menu-title">Dark mode</p>
                                <img src={Sun} alt="" height={20} width={20} style={{width:'30px'}} onClick={changeTheme} />
                                <Switch checked={checked} onChange={changeTheme} />
                                <img src={Moon} alt="" height={15} width={20} style={{width:'20px'}} onClick={changeTheme} />
                            </a>
                            <Link to="/posts" className="menu-item">
                                <span className="icon-button"><i className="fas fa-code"></i></span>
                                <p className="menu-title">Posts</p>
                            </Link>
                            <Link to="/profiles" className="menu-item">
                                <span className="icon-button"><i className="fas fa-users"></i></span>
                                <p className="menu-title">Developers</p>
                            </Link>
                            <a onClick={logout} href="#!" className="menu-item">
                                <span className="icon-button"><i className="fas fa-sign-out-alt"></i></span>
                                <p className="menu-title">Logout</p> 
                            </a>
                        </div>
                    </CSSTransition>
                    <CSSTransition 
                        in={activeMenu === 'settings'} 
                        unmountOnExit 
                        timeout={400} 
                        classNames='menu-secondary'
                        onEnter={calcHeight}
                    >
                        <div className="menu">
                            <a href="#!" className="menu-item"onClick={()=>{
                                    setActiveMenu('main')
                                }} >
                                <span className="icon-button" >
                                    <i className="material-icons">west</i>
                                </span>
                            </a>
                            <a href="#!" className="menu-item">
                                <span className="icon-button"><i className="material-icons">password</i></span>
                                <p className="menu-title">Change password</p>
                                <span><i className="material-icons">arrow_forward_ios</i></span>
                            </a>
                        </div>
                    </CSSTransition>
                </div>
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
    setTheme:PropTypes.func.isRequired,
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
    setTheme
})(Navbar);