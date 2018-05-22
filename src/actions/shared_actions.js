import { showLoading, hideLoading } from 'react-redux-loading'
import { loadQuestions } from './question_actions'
import { loadUsers } from './user_actions'
import { getInitialData } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(loadUsers(users))
                dispatch(loadQuestions(questions))
                dispatch(hideLoading())
            })
    }
}