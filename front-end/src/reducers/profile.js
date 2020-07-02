import {
    PROFILE_ERROR,
    GET_PROFILE,
    CLEAR_PROFILE,
    CREATE_PROFILE
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
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                repositories:[],
                loading:false
            }

        default:
            return state;
    }
}