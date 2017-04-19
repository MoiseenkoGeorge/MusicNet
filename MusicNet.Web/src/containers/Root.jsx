import React from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { ReduxRouter } from 'redux-router';
import { Route, IndexRoute } from "react-router";
import { App } from "../containers";
import { HomeView, LoginView, ProtectedView } from "../views";
import { requireAuthentication } from "../components/AuthenticatedComponent";

export default class Root extends React.Component {

	render() {
		return (
			<div>
				<Provider store={this.props.store}>
					<div>
						<ReduxRouter>
							{routes}
						</ReduxRouter>
					</div>
				</Provider>
			</div>
		);
	}
}