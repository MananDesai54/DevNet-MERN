import React,{ Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profiles';
import ProfileItem from './ProfileItem';
import Loading from '../layout/loading';

const Profiles = ({ getProfiles,profile:{profiles,loading} }) => {

    useEffect(()=>{
        getProfiles();
    },[getProfiles]);

    return (
        <Fragment>
            { loading ? <Loading />: <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with Developers
                    </p>
                    <div className="profiles">
                        {profiles.length>0
                            ? profiles.map(profile=>{
                                return <ProfileItem profile={profile} key={profile._id}/> 
                            })
                            : <h4>No Profiles Found....!!!</h4>
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state=>{
    return {
        profile:state.profile,
    }
}

export default connect(mapStateToProps,{
    getProfiles
})(Profiles);
