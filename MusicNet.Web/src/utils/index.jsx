export function checkHttpStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function parseJSON(response) {
	return response.json();
}

export function buildURL(url) {
	const baseUrl = "http://localhost:11000/";
	return baseUrl + url;
}

export function createReducer(initialState, reducerMap) {
	return (state = initialState, action) => {
		const reducer = reducerMap[action.type];

		return reducer
			? reducer(state, action.payload)
			: state;
	};
}

export function getAuthHeader() {
	let token = localStorage.getItem("accessToken");
	return `Bearer ${token}`;
}