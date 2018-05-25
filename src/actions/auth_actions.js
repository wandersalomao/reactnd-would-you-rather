import { showLoading, hideLoading } from 'react-redux-loading'
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from './types/auth_types'
import { loginUser, logoutUser, registerUser } from '../utils/api'
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

export function logout() {
    return dispatch => {
        logoutUser()
        dispatch({type: AUTH_LOGOUT})
        history.push('/login')        
    }
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

export function authSuccess(user) { return { type: AUTH_SUCCESS, user } }
export function authFailure(error) { return { type: AUTH_FAILURE, error } }