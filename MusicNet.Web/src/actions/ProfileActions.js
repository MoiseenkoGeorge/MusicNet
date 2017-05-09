import {
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAIL,
	PROFILE_POSTS_REQUEST,
	PROFILE_POSTS_REQUEST_SUCCESS,
	PROFILE_POSTS_REQUEST_FAIL,
	PROFILE_ADD_POST_REQUEST,
	PROFILE_ADD_POST_REQUEST_SUCCESS,
	PROFILE_ADD_POST_REQUEST_FAIL,
	PROFILE_SUBSCRIBE_REQUEST,
	PROFILE_SUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_SUBSCRIBE_REQUEST_FAIL,
	PROFILE_UNSUBSCRIBE_REQUEST,
	PROFILE_UNSUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_UNSUBSCRIBE_REQUEST_FAIL,
	PROFILE_FOLLOWERS_REQUEST,
	PROFILE_FOLLOWERS_REQUEST_SUCCESS,
	PROFILE_FOLLOWERS_REQUEST_FAIL,
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST,
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_FAIL,
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST,
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_FAIL,
	PROFILE_FOLLOWING_REQUEST,
	PROFILE_FOLLOWING_REQUEST_SUCCESS,
	PROFILE_FOLLOWING_REQUEST_FAIL,
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST,
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_FAIL,
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST,
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_SUCCESS,
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_FAIL,
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
			userId: response.id,
			userName: response.name,
			followersCount: response.followersCount,
			followingCount: response.followingCount,
			imageUrl: response.imageUrl,
			postsCount: response.postsCount,
			isFollowedByMe: response.isFollowedByMe
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

export function addPost(text, tracks) {
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
				body: JSON.stringify({ text: text, tracks: tracks })
			})
			.then(checkHttpStatus)
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

export function subscribeToUser(userName)
{
	return (dispatch) => {
		dispatch(subscribeRequest());
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "post",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(subscribeRequestSuccess());
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(subscribeRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function subscribeRequest() {
	return {
		type: PROFILE_SUBSCRIBE_REQUEST
	}
}

export function subscribeRequestSuccess() {
	return {
		type: PROFILE_SUBSCRIBE_REQUEST_SUCCESS
	}
}

export function subscribeRequestFail() {
	return {
		type: PROFILE_SUBSCRIBE_REQUEST_FAIL
	}
}

export function unsubscribeFromUser(userName) {
	return (dispatch) => {
		dispatch(unsubscribeRequest());
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "delete",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(unsubscribeRequestSuccess());
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(unsubscribeRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function unsubscribeRequest() {
	return {
		type: PROFILE_UNSUBSCRIBE_REQUEST
	}
}

export function unsubscribeRequestSuccess() {
	return {
		type: PROFILE_UNSUBSCRIBE_REQUEST_SUCCESS
	}
}

export function unsubscribeRequestFail() {
	return {
		type: PROFILE_UNSUBSCRIBE_REQUEST_FAIL
	}
}

export function getUserFollowers(userName) {
	return (dispatch) => {
		dispatch(getFollowersRequest());
		return fetch((buildURL("api/users/" + userName + "/followers")),
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
			.then((response) => {
				dispatch(getFollowersRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(getFollowersRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function getFollowersRequest() {
	return {
		type: PROFILE_FOLLOWERS_REQUEST
	}
}

export function getFollowersRequestSuccess(response) {
	response.profiles.forEach((profile) => { profile.subscribeRequesting = false });
	return {
		type: PROFILE_FOLLOWERS_REQUEST_SUCCESS,
		payload: {
			profiles: response.profiles
		}
	}
}

export function getFollowersRequestFail() {
	return {
		type: PROFILE_FOLLOWERS_REQUEST_FAIL
	}
}

export function getUserFollowing(userName) {
	return (dispatch) => {
		dispatch(getFollowingRequest());
		return fetch((buildURL("api/users/" + userName + "/following")),
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
			.then((response) => {
				dispatch(getFollowingRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(getFollowingRequestFail);
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function getFollowingRequest() {
	return {
		type: PROFILE_FOLLOWING_REQUEST
	}
}

export function getFollowingRequestSuccess(response) {
	response.profiles.forEach((profile) => { profile.subscribeRequesting = false });
	return {
		type: PROFILE_FOLLOWING_REQUEST_SUCCESS,
		payload: {
			profiles: response.profiles
		}
	}
}

export function getFollowingRequestFail() {
	return {
		type: PROFILE_FOLLOWING_REQUEST_FAIL
	}
}

export function subscribeToFollowersUser(userName) {
	return (dispatch) => {
		dispatch(subscribeFollowersUserRequest(userName));
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "post",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(subscribeFollowersUserRequestSuccess(userName));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(subscribeFollowersUserRequestFail(userName));
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function subscribeFollowersUserRequest(userName) {
	return {
		type: PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST,
		payload: {
			userName: userName
		}
	}
}

export function subscribeFollowersUserRequestSuccess(userName) {
	return {
		type: PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_SUCCESS,
		payload: {
			userName: userName
		}
	}
}

export function subscribeFollowersUserRequestFail() {
	return {
		type: PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_FAIL,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFromFollowersUser(userName) {
	return (dispatch) => {
		dispatch(unsubscribeFollowersUserRequest(userName));
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "delete",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(unsubscribeFollowersUserRequestSuccess(userName));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(unsubscribeFollowersUserRequestFail(userName));
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function unsubscribeFollowersUserRequest(userName) {
	return {
		type: PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFollowersUserRequestSuccess(userName) {
	return {
		type: PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_SUCCESS,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFollowersUserRequestFail() {
	return {
		type: PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_FAIL,
		payload: {
			userName: userName
		}
	}
}

export function subscribeToFollowingUser(userName) {
	return (dispatch) => {
		dispatch(subscribeFollowingUserRequest(userName));
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "post",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(subscribeFollowingUserRequestSuccess(userName));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(subscribeFollowingUserRequestFail(userName));
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function subscribeFollowingUserRequest(userName) {
	return {
		type: PROFILE_FOLLOWING_SUBSCRIBE_REQUEST,
		payload: {
			userName: userName
		}
	}
}

export function subscribeFollowingUserRequestSuccess(userName) {
	return {
		type: PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_SUCCESS,
		payload: {
			userName: userName
		}
	}
}

export function subscribeFollowingUserRequestFail() {
	return {
		type: PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_FAIL,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFromFollowingUser(userName) {
	return (dispatch) => {
		dispatch(unsubscribeFollowingUserRequest(userName));
		return fetch((buildURL("api/users/" + userName + "/following")),
				{
					method: "delete",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					}
				})
			.then(checkHttpStatus)
			.then(() => {
				dispatch(unsubscribeFollowingUserRequestSuccess(userName));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(unsubscribeFollowingUserRequestFail(userName));
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function unsubscribeFollowingUserRequest(userName) {
	return {
		type: PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFollowingUserRequestSuccess(userName) {
	return {
		type: PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_SUCCESS,
		payload: {
			userName: userName
		}
	}
}

export function unsubscribeFollowingUserRequestFail() {
	return {
		type: PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_FAIL,
		payload: {
			userName: userName
		}
	}
}