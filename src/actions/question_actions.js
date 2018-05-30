import { LOAD_QUESTIONS, SAVE_QUESTION_ANSWER } from './types/question_types'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer } from '../utils/api'

export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}

export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading())
        
        return saveQuestionAnswer(info)
            .then(() => {
                dispatch(success(info))
            })
            .then(() => dispatch(hideLoading()))
    }

    function success(info) { return { type: SAVE_QUESTION_ANSWER, info } }
}