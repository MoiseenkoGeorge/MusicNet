import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { routes } from './routes'
import { loginSuccess } from './actions/UserActions' 

const store = configureStore();

let token = localStorage.getItem('token');
if (token !== null) {
	store.dispatch(loginSuccess(token));
}

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('root')
);