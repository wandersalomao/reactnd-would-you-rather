import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types/auth_types'

const INITIAL_STATE = { authenticated: false, user: {}, error: '' };

export default function authentication(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, authenticated: true, user: action.user };
        case LOGIN_FAILURE:
            return { ...state, authenticated: false, user: {}, error: action.error };
        default:
          return state
    }
}