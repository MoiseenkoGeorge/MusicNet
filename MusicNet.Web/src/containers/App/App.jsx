import React, { Component } from 'react';
import { connect } from 'react-redux'
import Footer from "./Footer";
import NavBar from "./NavBar";

export class App extends Component {
	render() {
		return (
			<div className="wrapper">
				{this.props.isAuthenticated
					? <NavBar />
					: ''
				}
				<div className='container main-container'>
					<div className='row'>
						<div className='col-xs-12'>
							{this.props.children}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps)(App)