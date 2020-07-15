import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteExperience } from '../../actions/profiles';

const Experience = ({ experience,deleteExperience }) => {

    const experiences = experience.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
                {exp.current ? (
                ' Now'
                ) : (
                <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => deleteExperience(exp._id)}
                    className="btn btn-danger"
                >
                Delete
                </button>
            </td>
        </tr>    
    ))

    return (
        <div className="detail">
            <h2 className="my-2">Where I've Worked</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </div>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        experience:state.profile.profile.experience
    }
}

export default connect(mapStateToProps,{
    deleteExperience
})(Experience);
