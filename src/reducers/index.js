import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import alertReducer from './alert_reducer';
import userReducer from './user_reducer'
import questionReducer from './question_reducer'
import { loadingBarReducer } from 'react-redux-loading'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alert: alertReducer,
  users: userReducer, 
  questions: questionReducer, 
  loadingBar: loadingBarReducer
});

export default rootReducer;