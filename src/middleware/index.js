import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware } from 'redux'

const loggerMiddleware = createLogger();

export default applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware
)