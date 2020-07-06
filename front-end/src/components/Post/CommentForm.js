import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentPost } from '../../actions/post';
 
const CommentForm = ({ commentPost,postId }) => {

    const [text,setText] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Comment Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e)=>{
                    e.preventDefault();
                    commentPost(postId,{ text });
                    setText('');
                }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Leave comment"
                    required
                    value={text}
                    onChange={e=>{setText(
                        e.target.value
                    )}}
                ></textarea>
                <button type="submit" className="btn btn-dark my-1">Add Comment</button>
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    commentPost:PropTypes.func.isRequired,
}

export default connect(null,{
    commentPost
})(CommentForm);
