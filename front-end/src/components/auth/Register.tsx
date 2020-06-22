import React,{ useState,Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/actions';
import PropTypes from 'prop-types';

// interface Props {
//     setAlert:Function
// }

const Register:React.FC = ({ setAlert }:any) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const { name,email,password,password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
    const onSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        if(password!==password2) {
            setAlert('Password do not match','danger');
        }else {
            console.log(formData);
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                <input autoComplete="off" type="text" placeholder="Name" name="name" value={name} onChange={e =>{ onChange(e)}} required />
                </div>
                <div className="form-group">
                <input autoComplete="off" type="email" placeholder="Email Address" value={email} onChange={e =>{onChange(e)}} name="email" />
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
                />
                </div>
                <div className="form-group">
                <input autoComplete="off"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e=>{onChange(e)}}
                    minLength={6}
                />
                </div>
                <input autoComplete="off" type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.prototype = {
    setAlert:PropTypes.func.isRequired
}

export default connect(null,{ 
    setAlert 
})(Register);