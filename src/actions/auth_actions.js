import { showLoading, hideLoading } from 'react-redux-loading'
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types/auth_types'
import { authenticate } from '../utils/api'
import { history } from '../history/history.js';
import { alertError } from './alert_actions'

export function login(username) {
    return dispatch => {
        dispatch(showLoading())

        authenticate(username)
            .then(
                user => {
                    dispatch(success(user))
                    history.push('/app');
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertError(error));
                }
            )
            .then(() => dispatch(hideLoading()))
    };

    function success(user) { return { type: LOGIN_SUCCESS, user } }
    function failure(error) { return { type: LOGIN_FAILURE, error } }
}

// function logout() {
//     userService.logout();
//     return { type: userConstants.LOGOUT };
// }