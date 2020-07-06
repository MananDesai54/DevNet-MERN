import React,{ useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import Loading from '../layout/loading';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts,post:{posts,loading} })=>{

    useEffect(()=>{
        getPosts();
    },[getPosts]);

    return (
        <Fragment>
            { loading
                ? <Loading />
                : <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i>Welcome to the community
                    </p>
                    <PostForm />
                    <div className="posts">
                        {posts.map(post=>(
                            <PostItem post={post} key={post._id} />
                        ))}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps = state=>{
    return {
        post:state.post
    }
}

export default connect(mapStateToProps,{
    getPosts
})(Posts);