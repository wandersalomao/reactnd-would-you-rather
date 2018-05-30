import { 
    _getUsers, 
    _getQuestions, 
    _login, 
    _register,
    _saveQuestionAnswer 
} from './_DATA.js'

export function loginUser(username) {
    return _login(username)
        .then(
            user => {
                localStorage.setItem('user', JSON.stringify(user))
                return Promise.resolve(user)
            }
        )
}

export function logoutUser() {
    localStorage.removeItem('user');
}

export function registerUser(username, name) {
    return _register({username, name})
        .then(
            user => {
                localStorage.setItem('user', JSON.stringify(user))
                return Promise.resolve(user)
            }    
        )
}

export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions
    }))
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}