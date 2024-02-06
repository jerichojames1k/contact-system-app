import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import dataRegisterReducer from './dataRegisterReducer'
import credentialReducer from './credentialReducer';


const rootReducer= combineReducers({
  contact: contactReducer,
  registerInputData:dataRegisterReducer,
  credentialReducer
  // Other reducers can be added here if needed
});

export default rootReducer;