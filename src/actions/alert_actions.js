import { ALERT_SUCCESS, ALERT_ERROR, CLEAR_MESSAGE } from './types/alert_types'

/**
 * Action used to display a successful message
 * @param {*} message - The message that will be displayed
 */
export function alertSuccess(message) {
    _displayAlertMessage(message)
    return { type: ALERT_SUCCESS, message };
}

/**
 * Action used to display an error message
 * @param {*} message - The message that will be displayed
 */
export function alertError(message) {
    _displayAlertMessage(message, 'error')
    return { type: ALERT_ERROR, message };
}

/**
 * Action used to clear a message previously displayed
 */
export function clearMessage() {
    return { type: CLEAR_MESSAGE };
}

/**
 * Internal function used to manage the messages being displayed. 
 * @param {*} messageText - The message that will be displayed
 * @param {*} messageType - The message type: error or null
 */
function _displayAlertMessage(messageText, messageType = '') {
    const alertMessage = document.getElementById("alert-message")

    alertMessage.classList.add("show")
    if (messageType) {
        alertMessage.classList.add(messageType)
    }
    
    alertMessage.innerText = messageText

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => { 
        alertMessage.classList.remove("show")
        alertMessage.classList.remove(messageType)
    }, 3000)
}