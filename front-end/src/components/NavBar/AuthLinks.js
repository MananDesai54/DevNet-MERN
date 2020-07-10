import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';

const AuthLinks = (props) => {
    return (
        <ul className="navbar-nav">
            <li className="navbar-item" title={props.title}>
                <a href="#!" className="icon-button" >
                    <i className="material-icons">{props.icon}</i>
                </a>
            </li>
        </ul>
    )
}

AuthLinks.propTypes = {
    props:PropTypes.object,
}

export default AuthLinks
