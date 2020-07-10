import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GuestLinkNavItem = ({ linkTo,icon,title }) => {
    return (
        <Fragment>
            <li className="navbar-item">
                <Link to={linkTo} className="navbar-link">
                    <span> <i className={icon}></i> </span>{' '}
                    <p>{title}</p>
                </Link>
            </li>
        </Fragment>
    )
}

GuestLinkNavItem.propTypes = {
    linkTo:PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
}

export default GuestLinkNavItem;
