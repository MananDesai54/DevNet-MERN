import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_GITHUB_REPO,
    GET_VISITED_PROFILE
} from './types';
import {
    setAlert
} from './alert';
import { showErrors } from '../utils/errors';
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
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//get all profiles
export const getProfiles = () => async (dispatch) => {
    
    try {
        const profile = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: profile.data
        })

    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//get profile by id
export const getProfileByUserId = (id) => async (dispatch) => {

    try {
        const profile = await axios.get(`/api/profile/user/${id}`);
        dispatch({
            type: GET_VISITED_PROFILE,
            payload: profile.data
        })

    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//get github repositories
export const getGithubRepos = (githubUsername) => async (dispatch) => {

    try {
        const profile = await axios.get(`/api/profile/github/${githubUsername}`);
        dispatch({
            type: GET_GITHUB_REPO,
            payload: profile.data
        })

    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
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
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'));
        //     })
        // }
        showErrors(error,dispatch);
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
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
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'));
        //     })
        // }
        console.log(error);
        showErrors(error,dispatch);
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
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
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'));
        //     })
        // }
        showErrors(error,dispatch);
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteExperience = id => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Deleted','success'));
        
    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'));
        //     })
        // }
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}
export const deleteEducation = id => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Deleted','success'));
        
    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'));
        //     })
        // }
        dispatch({
            type:PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteAccount = ()=> async dispatch=>{

    if(window.confirm('Are you Sure? THIS CANNOT BE UNDONE.')){
        try {

            await axios.delete('/api/profile');
            dispatch({
                type:CLEAR_PROFILE
            });
            dispatch({
                type:DELETE_ACCOUNT
            });
            dispatch(setAlert('Account Deleted Permanently, Sorry to see you go','success'))
            
        } catch (error) {
            // const errors = error.response.data.errors;
            // if(errors) {
            //     errors.forEach(error=>{
            //         dispatch(setAlert(error.msg,'danger'));
            //     })
            // }
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