import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile'

export const rootReducer = combineReducers({
	auth,
	profile
});
