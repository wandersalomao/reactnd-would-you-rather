import { LOAD_USERS, ADD_USER } from '../actions/types/user_types'
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/types/question_types'

export default function users(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS: {
            return { ...state, ...action.users }
        }
        case ADD_USER: {
            return {    
                ...state, 
                [action.user.id]: action.user
            }
        }
        case SAVE_QUESTION: {
            return {
                ...state, 
                [action.question.author]: {
                    ...state[action.question.author], 
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        }
        case SAVE_QUESTION_ANSWER: {
            const { authedUser, qid, answer } = action.info
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
            }
        }
        default: {
            return state
        }
    }
}