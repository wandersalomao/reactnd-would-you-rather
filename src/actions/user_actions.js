import { LOAD_USERS, ADD_USER } from './types/user_types'

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