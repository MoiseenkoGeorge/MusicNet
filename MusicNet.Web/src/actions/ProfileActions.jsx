import {
	PROFILE_REQUEST,
	PROFILE_SUCCESS_RESPONSE,
	PROFILE_FAIL_RESPONSE
} from '../constants/Profile'

import { checkHttpStatus, parseJSON, buildURL, getAuthHeader } from "../utils";
import * as authActions from "./AuthActions";

export function profileRequest() {
	return {
		type: PROFILE_REQUEST
	}
}

export function getUserProfile(userName) {
	return (dispatch) => {
		dispatch(profileRequest());
		return fetch(buildURL("api/users/" + userName),
				{
					method: "get",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(response => {
				dispatch(profileRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(profileRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
				else if (error.response.status === 404) {
					dispatch(profileRequestFail);
					// ... not found
				}
			});
	}
}

export function profileRequestFail() {
	return {
		type: PROFILE_FAIL_RESPONSE
	}
}

export function profileRequestSuccess(response) {
	return {
		type: PROFILE_SUCCESS_RESPONSE,
		payload: {
			userName: response.name,
			subscribers: response.subscribers,
			subscribes: response.subscribes,
			imageUrl: response.imageUrl,
			postsCount: response.postsCount
		}
	}
}