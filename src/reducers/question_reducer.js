import { LOAD_QUESTIONS, SAVE_QUESTION_ANSWER } from '../actions/types/question_types'

export default function questions(state = {}, action) {
    switch (action.type) {
        case LOAD_QUESTIONS: 
            return { ...state, ...action.questions }
        case SAVE_QUESTION_ANSWER: 
            const { authedUser, qid, answer } = action.info
			return {
				...state,
				[qid]: {
				...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			}
            
        default:
            return state
    }
}