import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { routes } from './routes'
import { loginSuccess } from './actions/AuthActions' 

const store = configureStore();

let token = localStorage.getItem('accessToken');
let userName = localStorage.getItem('userName');
if (token !== null) {
	store.dispatch(loginSuccess({accessToken: token, userName: userName}));
}

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('root')
);