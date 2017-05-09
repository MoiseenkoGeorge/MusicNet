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
	followersHasBeenRequested: false,
	followingRequesting: false,
	followingHasBeenRequested: false
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
			followingCount: payload.followingCount,
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
			followersRequesting: true,
			followersHasBeenRequested: false
		});
	},
	PROFILE_FOLLOWERS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followersRequesting: false,
			followersHasBeenRequested: true,
			followers: payload.profiles
		});
	},
	PROFILE_FOLLOWERS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followersRequesting: false,
			followersHasBeenRequested: true
		});
	},
	PROFILE_FOLLOWING_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: true,
			followingHasBeenRequested: false
		});
	},
	PROFILE_FOLLOWING_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: false,
			followingHasBeenRequested: true,
			following: payload.profiles
		});
	},
	PROFILE_FOLLOWING_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followingRequesting: false,
			followingHasBeenRequested: true
		});
	},
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting : true}) :
				profile
			)
		});
	},
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false, isFollowedByMe: true }) :
				profile
			),
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { isFollowedByMe: true }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWERS_SUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: true }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false, isFollowedByMe: false }) :
				profile
			),
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { isFollowedByMe: false }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWERS_UNSUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: true }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false, isFollowedByMe: true }) :
				profile
			),
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { isFollowedByMe: true }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_SUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: true }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false, isFollowedByMe: false }) :
				profile
			),
			followers: state.followers.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { isFollowedByMe: false }) :
				profile
			)
		});
	},
	PROFILE_FOLLOWING_UNSUBSCRIBE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			following: state.following.map(profile => profile.name === payload.userName ?
				Object.assign({}, profile, { subscribeRequesting: false }) :
				profile
			)
		});
	}
})