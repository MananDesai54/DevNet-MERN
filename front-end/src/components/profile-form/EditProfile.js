import React,{ useState, Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProfile,getCurrentProfile } from '../../actions/profiles';

const EditProfile = ({ profile:{profile,loading},createProfile,history,getCurrentProfile }) => {

    const [formData,setFormData] = useState({
        company:'',
        website:'',
        location:'',
        bio:'',
        status:'',
        githubusername:'',
        skills:'',
        youtube:'',
        facebook:'',
        instagram:'',
        twitter:'',
        linkedin:''
    });

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin
    } = formData;

    const [showSocialLinks,toggleSocialLinkState] = useState(false);

    useEffect(()=>{
        getCurrentProfile();

        setFormData({
            ...formData,
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername:
              loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
          });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading,getCurrentProfile]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData);
        createProfile(formData,history,true);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Update Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <select name="status" value={status} onChange={handleChange}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange} />
                    <small className="form-text"
                        >Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={handleChange} />
                    <small className="form-text"
                        >Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange} />
                    <small className="form-text"
                        >City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleChange} />
                    <small className="form-text"
                        >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                        >If you want your latest repositories and a Github link, include your
                        username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleChange}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" 
                        className="btn btn-light" 
                        onClick={()=>{
                                toggleSocialLinkState(
                                    !showSocialLinks
                                )
                            }
                        }
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {showSocialLinks ? 
                <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={handleChange} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={handleChange} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={handleChange} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleChange} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleChange} />
                    </div>
                </Fragment> : <Fragment></Fragment> }
                
                <button type="submit" className="btn btn-primary my-1" onClick={handleSubmit}>Update Profile</button>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state=>{
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps,{
    createProfile,
    getCurrentProfile
})(EditProfile);
