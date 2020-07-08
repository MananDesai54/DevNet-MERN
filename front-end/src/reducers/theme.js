import { SET_THEME} from '../actions/types';

const initState = {
    darkTheme:localStorage.getItem('darkTheme')?JSON.parse(localStorage.getItem('darkTheme')):false
}
console.log(initState);


export default function (state=initState,action) {
    const { type } = action;
    switch (type) {
        case SET_THEME:
            localStorage.setItem('darkTheme',!state.darkTheme);
            return {
                ...state,
                darkTheme:!state.darkTheme
            }
    
        default:
            return state;
    }
}