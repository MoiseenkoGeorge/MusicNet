import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
} from '../constants/User'

import {
	ROUTING
} from '../constants/Routing'

import { checkHttpStatus, parseJSON, buildURL } from "../utils"

export function loginRequest() {
	return {
		type: LOGIN_REQUEST
	}
}

export function loginUser(login, password, nextAddress) {
	return (dispatch) => {
		dispatch(loginRequest());
		return fetch(buildURL("api/auth/login"),
			{
				method: "post",
				credentials: "include",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ name: login, password: password })
			})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(response => {
				dispatch(loginSuccess(response));
				dispatch(redirect(nextAddress));
			})
			.catch(error => {
				dispatch(loginFailure(error));
			});
	}
}

export function loginSuccess(response) {
	localStorage.setItem("token", response.accessToken);
	return {
		type: LOGIN_SUCCESS,
		payload: {
			token: response.accessToken,
			userName: response.userName
		}
	}
}

export function loginFailure(error) {
	localStorage.removeItem('token');
	return {
		type: LOGIN_FAIL,
		payload: {
			status: error.response.status,
			statusText: error.response.statusText
		}
	}
}

export function redirect(address = "/") {
	return {
		type: ROUTING,
		payload: {
			method: 'replace',
			nextUrl: address
		}
	}
}

export function logout() {
	localStorage.removeItem('token');
	return {
		type: LOGOUT_SUCCESS
	}
}

export function registerRequest() {
	return {
		type: REGISTER_REQUEST
	}
}

export function registerUser(email, login, password) {
	return (dispatch) => {
		dispatch(registerRequest);
		return fetch(buildURL("api/auth/register"),
			{
				method: "post",
				credentials: "include",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email: email, name: login, password: password })
			})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(response => {
				dispatch(registerSuccess(response));
				dispatch(redirect());
			})
			.catch(error => {
				dispatch(registerFailure(error));
			});
	}
}

export function registerSuccess(response) {
	localStorage.setItem("token", response.accessToken);
	return {
		type: REGISTER_SUCCESS,
		payload: {
			token: response.accessToken,
			userName: response.userName
		}
	}
}

export function registerFailure(error) {
	return {
		type: REGISTER_FAIL,
		payload: {
			status: error.response.status,
			statusText: error.response.statusText
		}
	}
}
