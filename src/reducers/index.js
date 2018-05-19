import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import alertReducer from './alert_reducer';
import { loadingBarReducer } from 'react-redux-loading'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alert: alertReducer,
  loadingBar: loadingBarReducer
});

export default rootReducer;