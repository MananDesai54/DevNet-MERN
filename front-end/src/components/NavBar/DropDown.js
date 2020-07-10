import React,{ Fragment,useState } from 'react'
import PropTypes from 'prop-types';
import Sun from '../../assets/svg/sun.svg';
import Moon from '../../assets/svg/moon.svg';
import { CSSTransition } from 'react-transition-group';
import { Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { setTheme } from '../../actions/theme';
import { connect } from 'react-redux';

const DropDown = ({ profile,loading,setTheme,logout,theme:{
    darkTheme
} }) => {

    const [checked,setChecked] = useState(darkTheme);
    const [activeMenu,setActiveMenu] = useState('main');
    const [height,setHeight] = useState(null);

    const calcHeight = e =>{
        setHeight(e.offsetHeight+80);
    }

    const changeTheme = () =>{
        setChecked(!checked);
        setTheme();
    }

    return (
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
                    <a href="#!" className="menu-item" onClick={()=>{
                        setActiveMenu('help')
                    }}>
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
                    <a href="#!" className="menu-item">
                        <span className="icon-button" onClick={()=>{
                            setActiveMenu('main')
                        }}   >
                            <i className="material-icons">west</i>
                        </span>
                        <h2 className="menu-title">Settings & Privacy</h2>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="material-icons">settings</i></span>
                        <p className="menu-title">settings</p>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="fas fa-lock"></i></span>
                        <p className="menu-title">Privacy & Security</p>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="fas fa-globe"></i></span>
                        <p className="menu-title">Language</p>
                    </a>
                </div>
            </CSSTransition>
            <CSSTransition 
                in={activeMenu === 'help'} 
                unmountOnExit 
                timeout={400} 
                classNames='menu-secondary'
                onEnter={calcHeight}
            >
                <div className="menu">
                    <a href="#!" className="menu-item">
                        <span className="icon-button" onClick={()=>{
                            setActiveMenu('main')
                        }}   >
                            <i className="material-icons">west</i>
                        </span>
                        <h2 className="menu-title">Help & Support</h2>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="material-icons">help</i></span>
                        <p className="menu-title">Help Center</p>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="material-icons">message</i></span>
                        <p className="menu-title">Support Inbox</p>
                    </a>
                    <a href="#!" className="menu-item">
                        <span className="icon-button"><i className="fas fa-exclamation-circle"></i></span>
                        <p className="menu-title">Report a Problem</p>
                    </a>
                </div>
            </CSSTransition>
        </div>
    )
}

DropDown.propTypes = {
    activeMenu:PropTypes.string.isRequired,
    profile:PropTypes.object.isRequired,
    loading:PropTypes.bool.isRequired,
    calcHeight:PropTypes.func.isRequired,
    setActiveMenu:PropTypes.func.isRequired,
    setTheme:PropTypes.func.isRequired,
    theme:PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired,
}

const mapStateToProps = state =>{
    return {
        theme:state.theme
    }
}

export default connect(mapStateToProps,{
    setTheme
})(DropDown);
