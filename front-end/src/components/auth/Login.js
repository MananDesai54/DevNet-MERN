import React,{ useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Login = ({ loginUser,isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email,password } = formData;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    const onSubmit = async e =>{
        e.preventDefault();
        loginUser({email,password});
    }
    //redirect is loggedin
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="auth login">
            <h1 className="large text-primary">Sign In</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="my-1 already-text">
            Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

Login.prototype = {
    loginUser:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state)=>{
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{
    loginUser
})(Login);