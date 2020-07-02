import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE
} from './types';
import {
    setAlert
} from './alert';
import axios from 'axios';

//get current profile
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

//create or update profile
export const createProfile = (data,history,edit=false)=>async (dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify(data);

    try {
        const res = await axios.post('/api/profile',body,config);
        dispatch({
            type:CREATE_PROFILE,
            payload:res.data
        })   
        dispatch(setAlert(edit?'Profile Updated':'Profile Created','success',2000));
        if(!edit){
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'));
            })
            dispatch({
                type:PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const addExperience = (data,history) =>async dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify(data);

    try {
        const res = await axios.put('/api/profile/experience',body,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })   
        dispatch(setAlert('Experience Added','success',2000));
        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'));
            })
            dispatch({
                type:PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const addEducation = (data,history) =>async dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify(data);

    try {
        const res = await axios.put('/api/profile/education',body,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })   
        dispatch(setAlert('Education Added','success',2000));
        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'));
            })
            dispatch({
                type:PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}