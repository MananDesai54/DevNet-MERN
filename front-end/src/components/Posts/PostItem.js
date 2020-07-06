import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { likePost,unlikePost,deletePost } from '../../actions/post';

const PostItem = ({ post:{
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date
},auth,likePost,unlikePost,deletePost,showActions }) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                <Link to={`/profile/${user}`}>
                    <img
                    className="round-img"
                    src={avatar}
                    alt=""
                    />
                    <h4>{name}</h4>
                </Link>
                </div>
                <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted {moment(date).fromNow()}
                </p>
                { showActions 
                    ? <Fragment>
                        <button type="button" className="btn btn-light" onClick={()=>likePost(_id)}>
                            <i className="fas fa-thumbs-up"></i>
                            { likes.length>0 && (
                                <span>{likes.length}</span>
                            ) }
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>unlikePost(_id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion {comments.length>0 && (
                                <span className='comment-count'>{comments.length}</span>
                            )} 
                        </Link>
                        {!auth.loading && user === auth.user._id && 
                            <button      
                            type="button"
                            className="btn btn-danger"
                            onClick={()=>deletePost(_id)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        }
                    </Fragment>
                    :<Fragment></Fragment> 
                }
                </div>
            </div>
        </Fragment>
    )
}

PostItem.defaultProps = {
    showActions:true
}

PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    likePost:PropTypes.func.isRequired,
    unlikePost:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{
    likePost,
    unlikePost,
    deletePost
})(PostItem);
