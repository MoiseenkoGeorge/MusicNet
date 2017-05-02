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

import { createReducer } from '../utils';

const initialState = {
	profileId: "",
	profileImg: null,
	following: 0,
	folllowers: 0,
	profileRequesting: false,
	isMyProfile: false,
	postsCount: 0,
	profilePostsRequesting: false,
	profilePosts: [],
	addPostRequesting: false
};

export default createReducer(initialState, {
	PROFILE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			profileRequesting: true
		});
	},
	PROFILE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			profileRequesting: false
		});
	},
	PROFILE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			profileRequesting: false,
			following: payload.following,
			followers: payload.followers,
			profileId: payload.userId,
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
	},
	PROFILE_ADD_POST_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: true
		});
	},
	PROFILE_ADD_POST_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: false
		});
	},
	PROFILE_ADD_POST_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			addPostRequesting: false
		});
	}
})