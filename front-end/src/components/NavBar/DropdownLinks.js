import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DropdownLinks = ({ left,title,right,setActiveMenu }) => {
    return (
        <a href="#!" className="menu-item" onClick={()=>{
            setActiveMenu()
        }}>
            <span className="icon-button"><i className="material-icons">{left}</i></span>
            <p className="menu-title">{title}</p>
            {right ? <span><i className="material-icons">{right}</i></span> :<Fragment></Fragment> }
        </a>
    )
}

DropdownLinks.propTypes = {
    left:PropTypes.string,
    right:PropTypes.string,
    title:PropTypes.string,
    setActiveMenu:PropTypes.func,
}

export default DropdownLinks;
