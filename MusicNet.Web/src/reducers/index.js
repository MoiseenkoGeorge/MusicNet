import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import search from './search';

export const rootReducer = combineReducers({
	auth,
	profile,
	search
});
