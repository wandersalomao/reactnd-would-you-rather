import { LOAD_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER } from './types/question_types'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { history } from '../history/history.js'

/**
 * Action used to load the question from the backend. This is called when loadind the initial data 
 * @param {*} questions 
 */
export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}

/**
 * Action used to save an answer for a question. 
 * @param {*} info - An object containing the answer information. It has the following properties: 
 *  - authedUser: the id of the logged user 
 *  - qid: the id of the question being answered 
 *  - answer: the answer option chosen by the user 
 */
export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading())
        
        return saveQuestionAnswer(info)
            .then(() => {
                dispatch(success(info))
                dispatch(hideLoading())
            })
    }

    function success(info) { return { type: SAVE_QUESTION_ANSWER, info } }
}

/**
 * Action used to add a new question. Once the question is saved, the user is redirected to the home page.
 * @param {*} question - An object containing the new question information. It has the following properties: 
 *  - optionOneText: The text for the option one 
 *  - optionTwoText: The text for the option two 
 */
export function handleSaveQuestion(question) {
    return (dispatch, getState) => {
        dispatch(showLoading())

        const { auth } = getState()
        question = { ...question, author: auth.loggedUserId }

        return saveQuestion(question)
            .then((savedQuestion) => {
                dispatch(success(savedQuestion))
                history.push('/') 

                dispatch(hideLoading())
            })
    }

    function success(question) { return { type: SAVE_QUESTION, question } }
}