import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';
import {
    setAlert
} from './alert';
import axios from 'axios';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const profile = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: profile.data
        })

    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            })
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}