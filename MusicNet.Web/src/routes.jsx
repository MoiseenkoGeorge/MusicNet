import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {App} from './containers/App';
import Profile from './components/Profile';
import Feed from './components/Feed';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import NotFound from './components/NotFound';
import Search from './components/Search';

import requireAuthentication from './containers/AuthenticatedComponent';

export const routes = (
	<div>
		<Route path='/' component={App}>
			<IndexRoute component={requireAuthentication(Feed)}/>
			<Route path='/users/:userName' component={Profile}/>
			<Route path='/login' component={LoginPage}/>
			<Route path='/register' component={RegisterPage} />
			<Route path="/search/:category" component={Search} />
		</Route>
		<Route path='*' component={NotFound}/>
	</div>
);
