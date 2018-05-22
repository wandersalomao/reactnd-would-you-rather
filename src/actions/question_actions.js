import { LOAD_QUESTIONS } from './types/question_types'

export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}