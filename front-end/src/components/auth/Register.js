import React,{ useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// interface Props {
//     setAlert:Function
// }

const Register = ({ setAlert,register,isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const { name,email,password,password2 } = formData;

    const onChange = e =>setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
    const onSubmit = async e =>{
        e.preventDefault();
        if(password!==password2) {
            setAlert('Password do not match','danger');
        }else {
            register({name,email,password});
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className="auth">
            <h1 className="large text-primary">Sign Up</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                <input autoComplete="off" type="text" placeholder="Name" name="name" value={name} onChange={e =>{ onChange(e)}}   required/>
                </div>
                <div className="form-group">
                <input autoComplete="off" type="email" placeholder="Email Address" value={email} onChange={e =>{onChange(e)}} name="email"  required/>
                <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
                </div>
                <div className="form-group">
                <input autoComplete="off"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e=>{onChange(e)}}
                    minLength={6}
                 required/>
                </div>
                <small>
                    Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
                </small>
                <div className="form-group">
                <input autoComplete="off"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e=>{onChange(e)}}
                    minLength={6}
                 required/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="my-1 already-text">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

Register.prototype = {
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state)=>{
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{ 
    setAlert,
    register
})(Register);