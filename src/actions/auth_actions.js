import { showLoading, hideLoading } from 'react-redux-loading'
import { AUTH_SUCCESS, AUTH_FAILURE } from './types/auth_types'
import { loginUser, registerUser } from '../utils/api'
import { history } from '../history/history.js'
import { alertError } from './alert_actions'
import { addUser } from './user_actions'

export function login(username) {
    return (dispatch, getState) => {
        dispatch(showLoading())

        loginUser(username)
            .then(
                user => {
                    dispatch(authSuccess(user))
                    history.push('/app');
                },
                error => {
                    dispatch(authFailure(error))
                    dispatch(alertError(error));
                }
            )
            .then(() => dispatch(hideLoading()))
    };
}

export function register(username, name) {
    return (dispatch, getState) => {
        dispatch(showLoading())

        registerUser(username, name)
            .then(
                user => {
                    dispatch(addUser(user))
                    dispatch(authSuccess(user))
                    history.push('/app');
                },
                error => {
                    dispatch(authFailure(error))
                    dispatch(alertError(error));
                }
            )
            .then(() => dispatch(hideLoading()))
    };
}

function authSuccess(user) { return { type: AUTH_SUCCESS, user } }
function authFailure(error) { return { type: AUTH_FAILURE, error } }

// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }