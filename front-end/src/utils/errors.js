import { setAlert } from '../actions/alert';

export const showErrors = (error,dispatch) =>{
    const errors = error.response.data.errors;
    if(errors) {
        errors.forEach(error=>{
            dispatch(setAlert(error.msg,'danger'))
        })
    }
}