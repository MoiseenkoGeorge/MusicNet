import {
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAIL,
	PROFILE_POSTS_REQUEST,
	PROFILE_POSTS_REQUEST_SUCCESS,
	PROFILE_POSTS_REQUEST_FAIL,
	PROFILE_ADD_POST_REQUEST,
	PROFILE_ADD_POST_REQUEST_SUCCESS,
	PROFILE_ADD_POST_REQUEST_FAIL
} from '../constants/Profile'

import { checkHttpStatus, parseJSON, buildURL, getAuthHeader } from "../utils";
import * as authActions from "./AuthActions";

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
					dispatch(profileRequestFail());
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

export function profileRequest() {
	return {
		type: PROFILE_REQUEST
	}
}

export function profileRequestFail() {
	return {
		type: PROFILE_REQUEST_FAIL
	}
}

export function profileRequestSuccess(response) {
	return {
		type: PROFILE_REQUEST_SUCCESS,
		payload: {
			userName: response.name,
			subscribers: response.subscribers,
			subscribes: response.subscribes,
			imageUrl: response.imageUrl,
			postsCount: response.postsCount
		}
	}
}

export function getUserProfilePosts(userName) {
	return (dispatch) => {
		dispatch(profilePostsRequest());
		return fetch((buildURL("api/posts/" + userName)),
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
				dispatch(profilePostsRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(profilePostsRequestFail(error));
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				} else if (error.response.status === 404) {
					dispatch(profilePostsRequestFail);
					// ... not found
				}
			});
	}
}

export function profilePostsRequest() {
	return {
		type: PROFILE_POSTS_REQUEST
	}
}

export function profilePostsRequestSuccess(response) {
	return {
		type: PROFILE_POSTS_REQUEST_SUCCESS,
		payload: {
			posts: response.posts
		}
	}
}

export function profilePostsRequestFail(response) {
	return {
		type: PROFILE_POSTS_REQUEST_FAIL
	}
}

export function addPost(text) {
	return (dispatch) => {
		dispatch(addPostRequest());
		return fetch((buildURL("api/posts")),
			{
				method: "post",
				credentials: "include",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					'Authorization': getAuthHeader()
				},
				body: JSON.stringify({ text: text})
			})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(() => {
				dispatch(addPostRequestSuccess());
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(profilePostsRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				} else if (error.response.status === 404) {
					dispatch(profilePostsRequestFail);
					// ... not found
				}
			});
	}
}

export function addPostRequest() {
	return {
		type: PROFILE_ADD_POST_REQUEST
	}
}

export function addPostRequestSuccess(response) {
	return {
		type: PROFILE_ADD_POST_REQUEST_SUCCESS
	}
}

export function addPostRequestFail(response) {
	return {
		type: PROFILE_ADD_POST_REQUEST_FAIL
	}
}