import {
	SEARCH_TRACKS_BY_TITLE_REQUEST,
	SEARCH_TRACKS_BY_TITLE_REQUEST_SUCCESS,
	SEARCH_TRACKS_BY_TITLE_REQUEST_FAIL
} from '../constants/Search';

import { createReducer } from '../utils';

const initialState = {
	searchRequesting: false,
	tracks: []
};

export default createReducer(initialState, {
	SEARCH_TRACKS_BY_TITLE_REQUEST: (state, payload) => {
		return Object.assign({}, state, {
			searchRequesting: true
		});
	},
	SEARCH_TRACKS_BY_TITLE_REQUEST_FAIL: (state, payload) => {
		return Object.assign({}, state, {
			searchRequesting: false
		});
	},
	SEARCH_TRACKS_BY_TITLE_REQUEST_SUCCESS: (state, payload) => {
		return Object.assign({}, state, {
			searchRequesting: false,
			tracks: payload.tracks
		});
	},
})