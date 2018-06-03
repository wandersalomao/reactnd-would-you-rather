import { 
    _getUsers, 
    _getQuestions, 
    _login, 
    _register,
    _saveQuestionAnswer, 
    _saveQuestion
} from './_DATA.js'

/**
 * Process the login operation. If the login is successfull, set the login token to the local store.
 * @param {*} username - Username of the user trying to log in 
 */
export function loginUser(username) {
    return _login(username)
        .then(
            user => {
                localStorage.setItem('user', JSON.stringify(user))
                return Promise.resolve(user)
            }
        )
}

/**
 * Process the logout operation and remove the login token from the local store. 
 */
export function logoutUser() {
    localStorage.removeItem('user');
}

/**
 * Register a new user. If the registration is succesfull then set the login token to the local store.
 * @param {*} username - Username of the user trying to sign up
 * @param {*} name - Name of the user trying to sign up
 */
export function registerUser(username, name) {
    return _register({username, name})
        .then(
            user => {
                localStorage.setItem('user', JSON.stringify(user))
                return Promise.resolve(user)
            }    
        )
}

/**
 * Operation used to load the initial data (users and questions).
 */
export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions
    }))
}

/**
 * Operation used to save an answer for a question. 
 * @param {*} info - Object containing information about the answer. 
 */
export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

/**
 * Operation used to save a new question. 
 * @param {*} question - Object containing information about the question. 
 */
export function saveQuestion(question) {
    return _saveQuestion(question)
}