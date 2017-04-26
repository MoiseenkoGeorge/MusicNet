import {
	PROFILE_REQUEST,
	PROFILE_SUCCESS_RESPONSE,
	PROFILE_FAIL_RESPONSE
} from '../constants/Profile'

import { createReducer } from '../utils';

const initialState = {
	profileImg: null,
	subscribes: 0,
	subscribers: 0,
	profileRequsting: false,
	isMyProfile: false,
	postsCount: 0
};

export default createReducer(initialState, {
	PROFILE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: true
		});
	},
	PROFILE_FAIL_RESPONSE: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: false
		});
	},
	PROFILE_SUCCESS_RESPONSE: (state, payload) => {
		return Object.assign({}, state, {
			profileRequsting: false,
			subscribes: payload.subscribes,
			subscribers: payload.subscribers,
			isMyProfile: payload.userName === localStorage.userName,
			profileImg: payload.imageUrl,
			postsCount: payload.postsCount
		});
	}
})