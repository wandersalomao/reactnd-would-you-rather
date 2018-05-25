import { showLoading, hideLoading } from 'react-redux-loading'
import { loadQuestions } from './question_actions'
import { loadUsers } from './user_actions'
import { authSuccess } from './auth_actions'
import { getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(loadUsers(users))
                dispatch(loadQuestions(questions))
            })
            .then(() => {
                // if a login token exists then we populate the initial auth information in the store
                const loggedUser = localStorage.getItem('user')
                if (loggedUser) {
                    dispatch(authSuccess(JSON.parse(loggedUser)))
                }
            })
            .then(() => dispatch(hideLoading()))
    }
}