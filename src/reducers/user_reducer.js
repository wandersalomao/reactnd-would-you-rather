import { LOAD_USERS, ADD_USER } from '../actions/types/user_types'

export default function users(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS: 
            return { ...state, ...action.users }
        case ADD_USER: 
            return {    
                ...state, 
                [action.user.id]: action.user
            }
        default:
          return state
    }
}