import { AUTH_SUCCESS, AUTH_FAILURE } from '../actions/types/auth_types'

const INITIAL_STATE = { authenticated: false, loggedUserId: '', error: '' };

export default function authentication(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, authenticated: true, loggedUserId: action.user.id };
        case AUTH_FAILURE:
            return { ...state, authenticated: false, user: {}, error: action.error };
        default:
          return state
    }
}