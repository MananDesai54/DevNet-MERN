import React,{ useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import Loading from '../layout/loading';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const PostDetail = ({ post : {post , loading},match,getPostById }) => {

    useEffect(()=>{
        getPostById(match.params.id);
    },[getPostById,match]);

    return (
        <Fragment>
            { loading || post===null
                ? <Loading />
                :<Fragment>
                    <Link to="/posts" className="btn">
                        Back To Posts
                    </Link>
                    <PostItem post={post} key={post._id} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        { post.comments.map(comment=>(
                            <CommentItem key={comment._id} postId={post._id} comment={comment} postUser={post.user} />
                        )) }
                    </div>
                </Fragment> 
            }
        </Fragment>
    )
}

PostDetail.propTypes = {
    post:PropTypes.object.isRequired,
    match:PropTypes.object.isRequired,
    getPostById:PropTypes.func.isRequired,
}

const mapStateToProps = state=>{
    return{
        post:state.post
    }
}

export default connect(mapStateToProps,{
    getPostById
})(PostDetail);
