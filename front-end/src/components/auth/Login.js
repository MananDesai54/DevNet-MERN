import React,{ useState,Fragment } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Login = () => {

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
        console.log(formData);
        // try {
        //     const user = {
        //         email,
        //         password
        //     }
    
        //     const config = {
        //         headers : {
        //             'Content-Type':'application/json'
        //         }
        //     }
        //     const body = JSON.stringify(user);
        //     const res = await axios.post('/api/auth',body,config);
        //     console.log(res.data);   
        // } catch (error) {
        //     console.error(error.message);
        // }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
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
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}
export default Login;