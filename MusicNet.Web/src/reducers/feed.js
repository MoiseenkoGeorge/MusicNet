﻿import {
	FEED_POSTS_REQUEST,
	FEED_POSTS_REQUEST_SUCCESS,
	FEED_POSTS_REQUEST_FAIL,
} from '../constants/Feed'

import {
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_REQUEST_SUCCESS,
	ADD_COMMENT_REQUEST_FAIL,
} from '../constants/Post';

import {
	RESET_FEED_REDUCER
} from '../constants/Reset';

import { createReducer } from '../utils';

const initialState = {
	postsRequesting: false,
	posts: []
};

export default createReducer(initialState, {
	FEED_POSTS_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: true
		});
	},
	FEED_POSTS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: false
		});
	},
	FEED_POSTS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: false,
			posts: state.posts.concat(payload.posts)
		});
	},
	PROFILE_POSTS_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: true
		});
	},
	PROFILE_POSTS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: false
		});
	},
	PROFILE_POSTS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			postsRequesting: false,
			posts: state.posts.concat(payload.posts)
		});
	},
	PROFILE_ADD_POST_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: true
		});
	},
	PROFILE_ADD_POST_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: false,
			posts: [payload.post].concat(state.posts)
		});
	},
	PROFILE_ADD_POST_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: false
		});
	},
	ADD_COMMENT_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			posts: state.posts.map(post => post.id === payload.postId ?
				Object.assign({}, post, { addCommentRequesting: true }) :
				post
			)
		});
	},
	ADD_COMMENT_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			posts: state.posts.map(post => post.id === payload.postId ?
				Object.assign({}, post, { addCommentRequesting: false, comments: post.comments.concat(payload.comment) }) :
				post
			)
		});
	},
	ADD_COMMENT_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			posts: state.posts.map(post => post.id === payload.postId ?
				Object.assign({}, post, { addCommentRequesting: false }) :
				post
			)
		});
	},
	RESET_FEED_REDUCER: (state, payload) => {
		return initialState;
	}
})