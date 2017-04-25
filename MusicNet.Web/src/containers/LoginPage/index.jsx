import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/AuthActions';

export class LoginPage extends Component {

	constructor(props) {
		super(props);
		const redirectRoute = this.props.location.query.next || '/';
		this.state = {
			login: "",
			password: "",
			redirectTo: redirectRoute
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.loginUser(this.state.login, this.state.password, this.state.redirectTo);
	}

	loginChanged(event) {
		this.setState({ login: event.target.value });
	}

	passwordChanged(event) {
		this.setState({ password: event.target.value });
	}
	
	render() {
		return (
			<div className='col-xs-12 col-md-6 col-md-offset-3'>
				<h3>Sign in</h3>
				{this.props.statusText ? <div className='alert alert-danger'>{this.props.statusText}</div> : ''}
				<form role='form'>
					<div className='form-group'>
						<input type='text'
							className='form-control input-lg'
							placeholder='Login'
							onChange={ this.loginChanged.bind(this) } />
					</div>
					<div className='form-group'>
						<input type='password'
							className='form-control input-lg'
							placeholder='Password'
							onChange={ this.passwordChanged.bind(this) } />
					</div>
					<button type='submit'
						className='btn btn-lg'
						disabled={this.props.isAuthenticating}
						onClick={this.handleSubmit.bind(this)}>Sign in</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticating: state.auth.isAuthenticating,
		statusText: state.auth.statusText
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(AuthActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
