import { ALERT_SUCCESS, ALERT_ERROR, CLEAR_MESSAGE } from '../actions/types/alert_types'

const INITIAL_STATE = { message: '', type: '' };

export default function alert(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ALERT_SUCCESS:
            return { ...state, message: action.message, type: 'success' };
        case ALERT_ERROR:
            return { ...state, message: action.message, type: 'error' };
        case CLEAR_MESSAGE:
            return { ...state, message: '' };
        default:
          return state
    }
}