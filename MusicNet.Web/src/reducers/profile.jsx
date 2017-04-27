import {
	PROFILE_REQUEST,
	PROFILE_REQUEST_SUCCESS,
	PROFILE_REQUEST_FAIL,
	PROFILE_POSTS_REQUEST,
	PROFILE_POSTS_REQUEST_SUCCESS,
	PROFILE_POSTS_REQUEST_FAIL
} from '../constants/Profile'

import { createReducer } from '../utils';

const initialState = {
	profileImg: null,
	subscribes: 0,
	subscribers: 0,
	profileRequsting: false,
	isMyProfile: false,
	postsCount: 0,
	profilePostsRequesting: false,
	profilePosts: []
};

export default createReducer(initialState, {
	PROFILE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: true
		});
	},
	PROFILE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: false
		});
	},
	PROFILE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: false,
			subscribes: payload.subscribes,
			subscribers: payload.subscribers,
			isMyProfile: payload.userName === localStorage.userName,
			profileImg: payload.imageUrl,
			postsCount: payload.postsCount
		});
	},
	PROFILE_POSTS_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			profilePostsRequesting: true
		});
	},
	PROFILE_POSTS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			profilePostsRequesting: false
		});
	},
	PROFILE_POSTS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			profilePostsRequesting: false,
			profilePosts: payload.posts
		});
	}
})