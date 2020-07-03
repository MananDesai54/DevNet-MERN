import React,{ useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/loading';
import { getProfileByUserId } from '../../actions/profiles';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';

const Profile = ({ match,profile:{profile,loading},auth,getProfileByUserId }) => {

    useEffect(()=>{
        getProfileByUserId(match.params.id);
    },[getProfileByUserId,match.params.id]);

    return (
        <Fragment>
            {profile===null || loading ? <Loading /> : 
            <Fragment>
                <Link to="/profiles" className="btn btn-light">Back To Profile</Link>
                { auth.isAuthenticated && !auth.loading && auth.user._id===profile.user._id && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link> }
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        <ProfileExperience profile={profile} />
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    profile:PropTypes.object.isRequired,
    getProfileByUserId:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        profile:state.profile,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{
    getProfileByUserId
})(Profile);
