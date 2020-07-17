import React,{ Fragment,useState } from 'react'
import PropTypes from 'prop-types';
import Sun from '../../assets/svg/sun.svg';
import Moon from '../../assets/svg/moon.svg';
import { CSSTransition } from 'react-transition-group';
import { Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { setTheme } from '../../actions/theme';
import { connect } from 'react-redux';
import DropdownLink from './DropdownLinks';

const DropDown = ({ profile,loading,setTheme,logout,theme:{
    darkTheme
} }) => {

    const [checked,setChecked] = useState(darkTheme);
    const [activeMenu,setActiveMenu] = useState('main');
    const [height,setHeight] = useState(null);

    const calcHeight = e =>{
        setHeight(e.offsetHeight);
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
                    <DropdownLink left="settings" title="Setting" right="arrow_forward_ios" setActiveMenu={()=>{
                            setActiveMenu('settings')
                    }} />
                    <DropdownLink left="help" title="Help & Support" right="arrow_forward_ios" setActiveMenu={()=>{
                            setActiveMenu('help')}
                    }/>
                    <a href="#!" className="menu-item">
                        <span className="icon-button">
                            <i className="fas fa-moon"></i>
                        </span>
                        <p className="menu-title">Dark mode</p>
                        <img src={Sun} alt="" height={20} width={20} style={{width:'30px'}} onClick={changeTheme} />
                        <Switch checked={checked} onChange={changeTheme} color="primary" />
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
                    <DropdownLink left="settings" title="Settings" />
                    <DropdownLink left="lock" title="Privacy & Security" />
                    <DropdownLink left="language" title="Language" />
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
                    <DropdownLink left="help" title="Help Center" />
                    <DropdownLink left="message" title="Support Inbox" />
                    <DropdownLink left="error" title="Report a Problem" />
                </div>
            </CSSTransition>
        </div>
    )
}

DropDown.propTypes = {
    activeMenu:PropTypes.string,
    profile:PropTypes.object,
    loading:PropTypes.bool,
    calcHeight:PropTypes.func,
    setActiveMenu:PropTypes.func,
    setTheme:PropTypes.func,
    theme:PropTypes.object,
    logout:PropTypes.func,
}

const mapStateToProps = state =>{
    return {
        theme:state.theme
    }
}

export default connect(mapStateToProps,{
    setTheme
})(DropDown);
