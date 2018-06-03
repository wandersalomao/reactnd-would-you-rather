import { LOAD_USERS, ADD_USER } from './types/user_types'

/**
 * Action used to laod users from the backend. 
 * @param {*} users - the users being loaded to the store. 
 */
export function loadUsers(users) {
    return {
        type: LOAD_USERS,
        users
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}