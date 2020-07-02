import React,{ useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profiles';
import { Link } from 'react-router-dom';

const AddEducation = ({ addEducation,history }) => {

    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:'',
        description:''
    })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData

    const [showToDate,toggleToDate] = useState(false);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        addEducation(formData,history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        value={school}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        value={degree}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            value={current} 
                            onChange={()=>{
                                toggleToDate(!showToDate);
                                setFormData({
                                    ...formData,
                                    current:!current
                                })
                            }} /> 
                            Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={handleChange} disabled={showToDate} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary my-1" onClick={handleSubmit}>Add Education</button>
                <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{
    addEducation
})(AddEducation);
