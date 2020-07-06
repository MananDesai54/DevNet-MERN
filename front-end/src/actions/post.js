import axios from 'axios';
import { setAlert } from './alert';
import { 
    GET_POSTS,
    POST_ERROR,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from './types';

//get all posts
export const getPosts = () => async dispatch=>{
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
} 

//get post
export const getPostById = (postId) => async dispatch=>{
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
} 

//like post
export const likePost = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`./api/posts/like/${postId}`);
        dispatch({
            type:LIKE_POST,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//unlike post
export const unlikePost = (postId) => async dispatch =>{
    try {
        const res = await axios.put(`./api/posts/unlike/${postId}`);
        dispatch({
            type:UNLIKE_POST,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//comment add to post
export const commentPost = (postId,text) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(text);
        
        const res = await axios.post(`/api/posts/comment/${postId}`,body,config);

        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert('Comment added','success'));

    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//delete comment
export const deleteComment = (postId,commentId) => async dispatch =>{
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:DELETE_COMMENT,
            payload:commentId
        })
        dispatch(setAlert('Comment deleted','success'));
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//delete post
export const deletePost = (postId) => async dispatch =>{
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type:DELETE_POST,
            payload:postId
        })
        dispatch(setAlert('Post deleted','success'));
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//add post 
export const addPost = post => async dispatch => {
    try {

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(post);
        
        const res = await axios.post('/api/posts',body,config);

        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post added','success'));

    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}