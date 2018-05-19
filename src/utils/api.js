import { _getUsers } from './_DATA.js'

export function authenticate(username) {
    return new Promise((res, rej) => {
        _getUsers().then( users => {

            const user = users[username]

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                res(user)
            } else {
                rej("Login failed, please check your credentials")
            }
        })
    })
}