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
} from '../actions/types'

const initState = {
    post:null,
    posts:[],
    loading:true,
    error:{}
}

export default function (state=initState,action) {

    const { type,payload } = action

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            }

        case GET_POST:
            return {
                ...state,
                post:payload,
                loading:false
            }

        case LIKE_POST:
        case UNLIKE_POST:
            const postUpdate = state.posts.map(post=>post._id===payload.postId?{...post,likes:payload.likes}:post);
            return {
                ...state,
                posts:postUpdate,
                loading:false
            }

        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }

        case ADD_COMMENT:
            return {
                ...state,
                post:{
                    ...state.post,
                    comments:payload
                },
                loading:false
            }

        case DELETE_COMMENT:
            return {
                ...state,
                post:{
                    ...state.post,
                    comments:state.post.comments.filter(comment=>comment._id!==payload)
                },
                loading:false
            }

        case DELETE_POST:
            const newPosts = state.posts.filter(post=>post._id!==payload);
            return {
                ...state,
                posts:newPosts,
                loading:false
            }

        case POST_ERROR:
            return {
                ...state,
                loading:false,
                error:payload
            }
    
        default:
            return state;
    }
}