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
	PROFILE_FOLLOWING_REQUEST,
	PROFILE_FOLLOWING_REQUEST_SUCCESS,
	PROFILE_FOLLOWING_REQUEST_FAIL
	} from '../constants/Profile'

import { createReducer } from '../utils';

const initialState = {
	profileId: "",
	profileImg: null,
	profileRequesting: false,
	isMyProfile: false,
	postsCount: 0,
	profilePostsRequesting: false,
	profilePosts: [],
	addPostRequesting: false,
	isFollowedByMe: false,
	subscriptionRequesting: false,
	followingCount: 0,
	followersCount: 0,
	followers: [],
	following: [],
	followersRequesting: false,
	followingRequesting: false
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
			followersCount: payload.followersCount,
			profileId: payload.userId,
			isMyProfile: payload.userName === localStorage.userName,
			isFollowedByMe: payload.isFollowedByMe,
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
	},
	PROFILE_SUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			subscriptionRequesting: true
		});
	},
	PROFILE_SUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			subscriptionRequesting: false,
			isFollowedByMe: true,
			followersCount: state.followersCount + 1
		});
	},
	PROFILE_SUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			subscriptionRequesting: false
		});
	},
	PROFILE_UNSUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			subscriptionRequesting: true
		});
	},
	PROFILE_UNSUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			subscribeRequesting: false,
			isFollowedByMe: false,
			followersCount: state.followersCount - 1
		});
	},
	PROFILE_UNSUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			subscriptionRequesting: false
		});
	},
	PROFILE_FOLLOWERS_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			followersRequesting: true
		});
	},
	PROFILE_FOLLOWERS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followersRequesting: false,
			followers: payload.profiles
		});
	},
	PROFILE_FOLLOWERS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followersRequesting: false
		});
	},
	PROFILE_FOLLOWING_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: true
		});
	},
	PROFILE_FOLLOWING_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: false,
			following: payload.profiles
		});
	},
	PROFILE_FOLLOWING_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: false
		});
	}
})