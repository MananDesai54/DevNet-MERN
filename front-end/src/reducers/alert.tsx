import { SET_ALERT,REMOVE_ALERT } from '../actions/types';

const initState:Object = []

export default function(state:any=initState,action:any):Object[] {

    const { type,payload } = action;

    switch (type) {
        case SET_ALERT:
            return [
                ...state,
                payload
            ]
        case REMOVE_ALERT:
            return state.filter((alert: { id: string; }) => alert.id!==payload.id)
        default:
            return state;
    }
}