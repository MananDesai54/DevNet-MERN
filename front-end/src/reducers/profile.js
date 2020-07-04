import {
    PROFILE_ERROR,
    GET_PROFILE,
    CLEAR_PROFILE,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_GITHUB_REPO
} from '../actions/types';

const initState = {
    profile: null,
    profiles: [],
    repositories: [],
    loading: true,
    error: {}
}

export default function (state = initState, action) {

    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_PROFILE:
        case CREATE_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
        
        case GET_GITHUB_REPO:
            return {
                ...state,
                repositories:payload,
                loading:false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error:payload
                
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                repositories:[],
            }

        default:
            return state;
    }
}