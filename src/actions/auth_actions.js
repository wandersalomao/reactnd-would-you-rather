import { showLoading, hideLoading } from 'react-redux-loading'
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from './types/auth_types'
import { loginUser, logoutUser, registerUser } from '../utils/api'
import { history } from '../history/history.js'
import { alertError } from './alert_actions'
import { addUser } from './user_actions'

/**
 * Login action that tries to authenticate the passed user. If the authentication is successfull, 
 * redirects the user to the home page (/app). Otherwise, display an error message. 
 * @param {*} username - The username of the user trying to authenticate
 */
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

/**
 * Logout action. It logs the user out and redirects the flow to the login page
 */
export function logout() {
    return dispatch => {
        logoutUser()
        dispatch({type: AUTH_LOGOUT})
        history.push('/login')        
    }
}

/**
 * Register action used to create a new user with the given username and name. If successfull, 
 * redirects the user to the home page (/app). Otherwise, display an error message.  
 * @param {*} username - The username of the user being registered
 * @param {*} name - The name of the user being registered
 */
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