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

    return  (loading && profile===null)  ? <Loading /> :
        <div className="dashboard">
            { profile ? 
            <Fragment>
                <DashboardActions />
                <div className="details">
                    <Experience />
                    <Education />
                </div>
                <button
                    onClick={() => deleteAccount()}
                    className="btn btn-danger my-2"
                >
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </Fragment> : 
            <Fragment>
                <p className="not-profile">You have not created a profile , Please add some info.</p>
                <Link to="create-profile" className="m-2" style={{border:'none',padding:10,color:'white',background:'#484a4d'}}>
                    Create Profile
                </Link>
                <h2>Welcome</h2>
            </Fragment> }
        </div>
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