import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profiles';
import { connect } from 'react-redux';
import Loading from '../layout/loading';

const ProfileRepos = ({ username,repositories,getGithubRepos }) => {

    useEffect(()=>{
        getGithubRepos(username);
    },[getGithubRepos,username]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
            </h2>
            {repositories===null ? <Loading />:
                repositories.map((repo,index)=>(
                    <div className="repo bg-white p-1 my-1" key={index}>
                        <div>
                        <h4><a href={repo.html_url} target="_blank"
                            rel="noopener noreferrer">{repo.name}</a></h4>
                        <p>
                            {repo.description}
                        </p>
                        </div>
                        <div>
                        <ul>
                            <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                            <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                            <li className="badge badge-light">Forks: {repo.forks_count}</li>
                        </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

ProfileRepos.propTypes = {
    username:PropTypes.string.isRequired,
    getGithubRepos:PropTypes.func.isRequired,
    repositories:PropTypes.array.isRequired,
}

const mapStateToProps = state=>{
    return{
        repositories:state.profile.repositories
    }
}

export default connect(mapStateToProps,{
    getGithubRepos
})(ProfileRepos);
