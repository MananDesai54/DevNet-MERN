import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = ({ profile:{education}}) => {
    return (
        <Fragment>
            { education.length>0 ? education.map((edu,index)=>(
                <div key={index}>
                    <h3 className="text-dark">{edu.school}</h3>
                    <p><Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> - {edu.current ? 'Current' :  <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment> }
                    </p>
                    <p><strong>Degree: </strong>{edu.degree}</p>
                    <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                    {edu.description ? 
                        <p>
                            <strong>Description: </strong>{edu.description}
                        </p>
                    : ''}
                </div>
            )) 
             : <Fragment> NO education credential Found </Fragment> }
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileEducation;
