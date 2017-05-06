import {
	FEED_POSTS_REQUEST,
	FEED_POSTS_REQUEST_SUCCESS,
	FEED_POSTS_REQUEST_FAIL,
} from '../constants/Feed'

import { createReducer } from '../utils';

const initialState = {
	feedPostsRequesting: false,
	feedPosts: []
};

export default createReducer(initialState, {
	FEED_POSTS_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			feedPostsRequesting: true
		});
	},
	FEED_POSTS_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			feedPostsRequesting: false
		});
	},
	FEED_POSTS_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			feedPostsRequesting: false,
			feedPosts: payload.posts
		});
	}
})