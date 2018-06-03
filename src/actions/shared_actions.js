import { showLoading, hideLoading } from 'react-redux-loading'
import { loadQuestions } from './question_actions'
import { loadUsers } from './user_actions'
import { authSuccess } from './auth_actions'
import { getInitialData } from '../utils/api'

/**
 * Action used to load the initial data. It loads users and questions and then check if there is a login 
 * token available, and if so dispatches the login action to process the login and redirects the user to 
 * the home page 
 */
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