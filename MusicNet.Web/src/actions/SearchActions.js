import {
	SEARCH_TRACKS_BY_TITLE_REQUEST,
	SEARCH_TRACKS_BY_TITLE_REQUEST_SUCCESS,
	SEARCH_TRACKS_BY_TITLE_REQUEST_FAIL
} from '../constants/Search';

import { checkHttpStatus, parseJSON, buildURL, getAuthHeader } from "../utils";
import * as authActions from "./AuthActions";

export function getTracksByTitle(term) {
	return (dispatch) => {
		dispatch(searchTracksByTitleRequest());
		return fetch(buildURL("api/search/tracks?term=" + term),
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
				dispatch(searchTracksByTitleRequestSuccess(response));
			})
			.catch(error => {
				if (error.response.status === 401) {
					dispatch(searchTracksByTitleRequestFail());
					dispatch(authActions.loginUserFailure(error));
					dispatch(pushState(null, '/login'));
				}
			});
	}
}

export function searchTracksByTitleRequest() {
	return {
		type: SEARCH_TRACKS_BY_TITLE_REQUEST
	}
}

export function searchTracksByTitleRequestFail() {
	return {
		type: SEARCH_TRACKS_BY_TITLE_REQUEST_FAIL
	}
}

export function searchTracksByTitleRequestSuccess(response) {
	return {
		type: SEARCH_TRACKS_BY_TITLE_REQUEST_SUCCESS,
		payload: {
			tracks: response.tracks
		}
	}
}