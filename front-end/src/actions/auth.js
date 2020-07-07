import { REGISTER_SUCCESS,REGISTER_FAILED,USER_LOADED,AUTH_ERROR,LOGIN_USER,LOGOUT,CLEAR_PROFILE } from './types'
import axios from 'axios';
// import { setAlert } from './alert';
import setAuthToken from '../utils/setToken';
import { showErrors } from '../utils/errors';

//register user
export const register = ({name,email,password})=>async (dispatch)=>{

    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({
        name,
        email,
        password
    });

    try {
        const res = await axios.post('/api/users',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser());   
    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
        showErrors(error,dispatch);
        dispatch({
            type:REGISTER_FAILED
        })
    }
}

//load user
export const loadUser = (token)=>async (dispatch)=>{
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })        
    }
}

//login user
export const loginUser = ({email,password})=> async (dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({
        email,
        password
    })

    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type:LOGIN_USER,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        // const errors = error.response.data.errors;
        // if(errors) {
        //     errors.forEach(error=>{
        //         dispatch(setAlert(error.msg,'danger'))
        //     })
        // }
        showErrors(error,dispatch);
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export const logout = ()=>(dispatch)=>{
    dispatch({
        type:LOGOUT
    })
    dispatch({
        type:CLEAR_PROFILE
    })
}