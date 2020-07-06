import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ comment:{
    _id,
    text,
    name,
    avatar,
    user,
    date
},postId,postUser,auth,deleteComment }) => {
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
                    { !auth.loading && (user === auth.user._id || postUser === auth.user._id) &&
                        <button      
                            type="button"
                            className="btn btn-danger"
                            onClick={()=>{deleteComment(postId,_id)}}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    }
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    auth:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired,
}

const mapStateToProps = state=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{
    deleteComment
})(CommentItem);
