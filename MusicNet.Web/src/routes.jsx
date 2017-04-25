import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {App} from './containers/App'
import Profile from './components/Profile'
import Genre from './components/Genre'
import Release from './components/Release'
import Feed from './components/Feed'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import NotFound from './components/NotFound'
import requireAuthentication from './containers/AuthenticatedComponent'

export const routes = (
	<div>
		<Route path='/' component={App}>
			<IndexRoute component={requireAuthentication(Feed)}/>
			<Route path='/genre/:genre' component={Genre}>
				<Route path='/genre/:genre/:release' component={Release}/>
			</Route>
			<Route path='/users/:userName' component={Profile}/>
			<Route path='/login' component={LoginPage}/>
			<Route path='/register' component={RegisterPage}/>
		</Route>
		<Route path='*' component={NotFound}/>
	</div>
);
