﻿import {
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_REQUEST_SUCCESS,
	ADD_COMMENT_REQUEST_FAIL,
} from '../constants/Post';

import {
	FEED_POSTS_REQUEST,
	FEED_POSTS_REQUEST_SUCCESS,
	FEED_POSTS_REQUEST_FAIL,
} from '../constants/Feed'

import { checkHttpStatus, parseJSON, buildURL, getAuthHeader } from "../utils";
import * as authActions from "./AuthActions";

export function getUserFeed() {
	return (dispatch) => {
		dispatch(feedPostsRequest());
		return fetch(buildURL("api/posts"),
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
				dispatch(feedPostsRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(feedPostsRequestFail());
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
				else if (error.response.status === 404) {
					dispatch(feedPostsRequestFail);
					// ... not found
				}
			});
	}
}

export function feedPostsRequest() {
	return {
		type: FEED_POSTS_REQUEST
	}
}

export function feedPostsRequestFail() {
	return {
		type: FEED_POSTS_REQUEST_FAIL
	}
}

export function feedPostsRequestSuccess(response) {
	return {
		type: FEED_POSTS_REQUEST_SUCCESS,
		payload: {
			posts: response.posts
		}
	}
}

export function addCommentToPost(postId, text) {
	return (dispatch) => {
		dispatch(addCommentRequest(postId));
		return fetch(buildURL("api/posts/" + postId + "/comments"),
				{
					method: "post",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						'Authorization': getAuthHeader()
					},
					body: JSON.stringify({ text: text })
				})
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(() => {
				dispatch(addCommentRequestSuccess(postId));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(addCommentRequestFail());
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function addCommentRequest(postId) {
	return {
		type: ADD_COMMENT_REQUEST,
		payload: {
			postId: postId
		}
	}
}

export function addCommentRequestSuccess(postId) {
	return {
		type: ADD_COMMENT_REQUEST_SUCCESS,
		payload: {
			postId: postId
		}
	}
}

export function addCommentRequestFail() {
	return {
		type: ADD_COMMENT_REQUEST_FAIL,
		payload: {
			postId: postId
		}
	}
}