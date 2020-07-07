import React,{ useEffect,Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profiles';
import { Link } from 'react-router-dom';
import Loading from '../layout/loading';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ profile:{profile},auth:{ user,loading },getCurrentProfile,deleteAccount }) => {

    useEffect(()=>{
        getCurrentProfile();
        document.title = 'Dashboard';
    },[getCurrentProfile]);

    return  (loading || profile===null)  ? <Loading /> :
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome { user && user.name }
            </p>
            { profile ? 
            <Fragment>
                <DashboardActions />
                <Experience />
                <Education />
                <button
                    onClick={() => deleteAccount()}
                    className="btn btn-danger my-2"
                >
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </Fragment> : 
            <Fragment>
                <p>You have not created a profile , Please add some info.</p>
                <Link to="create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment> }
        </Fragment>
};

Dashboard.prototype = {
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        profile:state.profile,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{
    getCurrentProfile,
    deleteAccount
})(Dashboard);