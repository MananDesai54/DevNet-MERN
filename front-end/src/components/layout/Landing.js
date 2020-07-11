import React, { Fragment } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';  
import Register from '../auth/Register';
import Card from '../Card/Card';
// import Developer from  '../../assets/svg/developer.svg';

const Landing = ({ auth:{isAuthenticated} }) => {

    if(isAuthenticated) return <Redirect to="/dashboard" />

    return (
            <Fragment>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <div className="intro">
                            <h1 className="x-large">Welcome, Developers..!</h1>
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
                <Card 
                    icon="room" 
                    title="Find & Connect with Other Developers."
                    description="You can find any developer by technology stack ( i.e - JavaScript developer , AI expert  ) or check for developer around your area."
                />
                <Card 
                    icon="message" 
                    title="share Post & Projects"
                    description="You can share anything related to Programming , Frameworks , Projects and many more related ro Computer science."
                />
                <Card 
                    icon="code" 
                    title="Create Your Own Portfolio"
                    description="You can create your portfolio and share and use it any whee you want."
                />
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