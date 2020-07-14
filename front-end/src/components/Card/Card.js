import React from 'react';

const Card = ({ icon,title,description }) => {
    return (
        <div className="card">
            <span className="icon">
                <i className="material-icons">{icon}</i>
                {/* <img src={icon} alt=""/> */}
            </span>
            <h3 className="card-title">
                 {title}
            </h3>
            <p className="description">
                {description}
            </p>
        </div>
    )
}

export default Card;
