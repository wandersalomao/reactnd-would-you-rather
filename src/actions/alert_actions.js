import { ALERT_SUCCESS, ALERT_ERROR, CLEAR_MESSAGE } from './types/alert_types'

export function alertSuccess(message) {
    _displayAlertMessage(message)
    return { type: ALERT_SUCCESS, message };
}

export function alertError(message) {
    _displayAlertMessage(message, 'error')
    return { type: ALERT_ERROR, message };
}

export function clearMessage() {
    return { type: CLEAR_MESSAGE };
}

function _displayAlertMessage(messageText, messageType = '') {
    const alertMessage = document.getElementById("alert-message")

    alertMessage.classList.add("show")
    if (messageType) {
        alertMessage.classList.add(messageType)
    }
    
    alertMessage.innerText = messageText

    // After 3 seconds, remove the show class from DIV
    // setTimeout(() => { alertMessage.className = alertMessage.className.replace("show", ""); }, 3000)
    setTimeout(() => { 
        alertMessage.classList.remove("show")
        alertMessage.classList.remove(messageType)
    }, 3000)
}