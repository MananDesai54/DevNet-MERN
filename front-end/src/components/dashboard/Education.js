import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteEducation } from '../../actions/profiles';

const Education = ({ education,deleteEducation }) => {

    const educations = education.map(edu=>(
        <div key={edu._id} className="data-edu">
            <div className="data">
                <div className="detail-company">{edu.school}</div>
                <div className="detail-title">{edu.degree}</div>
            </div>
            <span>
                <i className="material-icons">arrow_forward_ios</i>
            </span>
        </div>  
    ))

    return (
        <div className="details__position">
            <h2 className="my-1 center">Education</h2>
            <div className="detail">
                <div className="detail-data">
                    {educations}
                </div>
            </div>
        </div>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        education:state.profile.profile.education
    }
}

export default connect(mapStateToProps,{
    deleteEducation
})(Education);
