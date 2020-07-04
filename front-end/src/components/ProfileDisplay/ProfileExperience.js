import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({ profile:{experience}}) => {
    return (
        <Fragment>
            { experience.length>0 ? experience.map((exp,index)=>(
                <div key={index}>
                    <h3 className="text-dark">{exp.company}</h3>
                    <p><Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> - {exp.current ? 'Current' :  <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment> }
                    </p>
                    <p><strong>Position: </strong> {exp.title} </p>
                    {exp.description ? 
                        <p>
                            <strong>Description: </strong>{exp.description}
                        </p>
                    : ''}
                </div>
            )) 
             : <Fragment> NO Experience credential Found </Fragment> }
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileExperience;
