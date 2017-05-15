import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
} from '../constants/Auth'

import { createReducer } from '../utils';

const initialState = {
	token: null,
	userName: null,
	userImgUrl: null,
	isAuthenticated: false,
	isAuthenticating: false,
	isRegistrating: false,
	statusText: null
};

export default createReducer(initialState, {
	LOGIN_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticating: true,
			statusText: null
		});
	},
	LOGIN_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticating: false,
			isAuthenticated: true,
			token: payload.token,
			userName: payload.userName,
			statusText: "You have been successfully logged in."
		});
	},
	LOGIN_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticating: false,
			isAuthenticated: false,
			token: null,
			userName: null,
			statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
		});
	},
	LOGOUT_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticated: false,
			token: null,
			userName: null,
			statusText: 'You have been successfully logged out.'
		});
	},
	REGISTER_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			isRegistrating: true,
			statusText: null
		});
	},
	REGISTER_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			isRegistrating: false,
			isAuthenticated: true,
			token: payload.token,
			userName: payload.userName,
			statusText: "You have been successfully signed up."
		});
	},
	REGISTER_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			isRegistrating: false,
			isAuthenticated: false,
			token: null,
			userName: null,
			statusText: `Registrating Error: ${payload.status} ${payload.statusText}`
		});
	},
});
