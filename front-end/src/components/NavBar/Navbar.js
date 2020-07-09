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

    useEffect(()=>{
        getCurrentProfile();
        document.title = 'DevNet';
    },[getCurrentProfile]);

    const changeTheme = () =>{
        setChecked(!checked);
        setTheme();
    }
    
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
                <div>
                    <img src={Sun} alt="" height={15} width={20} style={{width:'30px'}} onClick={changeTheme} />
                    <Switch checked={checked} onChange={changeTheme} />
                    <img src={Moon} alt="" height={15} width={20} style={{width:'20px'}} onClick={changeTheme} />
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
            {/* { !loading && (<React.Fragment>{isAuthenticated?authLinks:guestLinks}</React.Fragment>) } */}
            <ul className="navbar-nav">
                { profile!==null && !loading 
                    ?<li className="navbar-item">
                        <div>
                            <Link to={`/profile/${profile.user._id}`} className="navbar-item">
                                <img src={profile.user.avatar} alt="avatar" className="round-img avatar" />{' '}
                                <p> {` ${profile.user.name}`} </p>
                            </Link>
                        </div>
                    </li> 
                    :<Fragment></Fragment>
                }
                <li className="navbar-item">
                    <a href="#!" className="icon-button">
                        <i className="material-icons">add</i>
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#!" className="icon-button">
                        <i className="material-icons">message</i>
                    </a>
                </li>
                <li className="navbar-item" onClick={()=>{
                    setOpen(!open);
                }}>
                    <a href="#!" className="icon-button">
                        <i className="material-icons">arrow_drop_down</i>
                    </a>
                    { open && 
                        <div className="dropdown">
                            <a href="#!" className="menu-item">
                                {/* <img src={profile.user.avatar} alt="avatar" className="round-img avatar" /> */}
                                <span>My Profile</span>
                            </a>
                            <a href="#!" className="menu-item">
                                <span><i className="material-icons">settings</i></span>
                                <p>Setting</p>
                                <span><i className="material-icons">arrow_forward_ios</i></span>
                            </a>
                        </div>
                    }
                </li>
            </ul>
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