import React, { Fragment } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';  
import Register from '../auth/Register';
// import Developer from  '../../assets/svg/developer.svg';

const Landing = ({ auth:{isAuthenticated} }) => {

    if(isAuthenticated) return <Redirect to="/dashboard" />

    return (
            <Fragment>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <div className="intro">
                            <h1 className="x-large">Welcome,</h1>
                            <h1 className="x-large">Developer..!</h1>
                            <p className="lead">
                                Create Profile and connect with other Developers. Post any project , Share Github repositories , Make own Portfolio , Find any developer near your location and many more You can do here.
                            </p>
                            <div className="buttons">
                                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                                <Link to="/login" className="btn btn-light">Login</Link>
                            </div>
                        </div>
                        <div className="register">
                            <Register />
                        </div>
                    </div>
                </div>
            </section>
            <section className="details">
                <div className="card">
                    <span className="icon">
                        <i className="material-icons">location</i>
                    </span>
                    hello
                </div>
            </section>
        </Fragment>
    )
}

Landing.prototype = {
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Landing);