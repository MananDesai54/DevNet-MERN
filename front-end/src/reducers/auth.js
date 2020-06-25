import { REGISTER_SUCCESS, REGISTER_FAILED,USER_LOADED,AUTH_ERROR,LOGIN_USER,LOGOUT } from '../actions/types';

const initState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
}

export default function(state=initState,action) {
    const { type,payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_USER:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false

            }
        case AUTH_ERROR:
        case REGISTER_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                user:null
            }
    
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }

        default:
            return state;
    }
}