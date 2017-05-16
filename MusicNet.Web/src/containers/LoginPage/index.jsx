import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as AuthActions from '../../actions/AuthActions';

export class LoginPage extends Component {

	constructor(props) {
		super(props);
		const redirectRoute = this.props.location.query.next || '/';
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			login: "",
			password: "",
			isValidPassword: null,
			isValidLogin: null,
			redirectTo: redirectRoute
		}
		this.validateLogin = this.validateLogin.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
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

	validatePassword(e) {
		let isValid = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{6,}$/.test(e.target.value);
		this.setState({ isValidPassword: isValid });
	}

	validateLogin(e) {
		let isValid = /^[a-zA-Z0-9]{4,}$/.test(e.target.value);
		this.setState({ isValidLogin: isValid });
	}

	getFormGroupClass(stateProperty) {
		if (stateProperty === true && !this.props.statusText) {
			return "has-success";
		} else if (stateProperty === false || this.props.statusText) {
			return "has-danger";
		} else {
			return "";
		}
	}

	getInputClass(stateProperty) {
		if (stateProperty === true && !this.props.statusText) {
			return "form-control-success";
		} else if (stateProperty === false || this.props.statusText) {
			return "form-control-danger";
		} else {
			return "input-lg";
		}
	}
	
	render() {
		return (
			<div className='col-xs-12 col-md-6 login'>
				<h3>Sign in</h3>
				{this.props.statusText ? <div className='alert alert-danger'>{this.props.statusText}</div> : ''}
				<form role='form'>
					<div className={"form-group " + (this.getFormGroupClass(this.state.isValidLogin))}>
						<input type='text'
							className={'form-control ' + (this.getInputClass(this.state.isValidLogin))}
							placeholder='Login'
							onChange={this.loginChanged.bind(this)}
							onBlur={this.validateLogin}
						/>
					</div>
					<div className={"form-group " + (this.getFormGroupClass(this.state.isValidPassword))}>
						<input type='password'
							className={"form-control " + (this.getInputClass(this.state.isValidPassword))}
							placeholder='Password'
							onChange={this.passwordChanged.bind(this)}
							onBlur={this.validatePassword}
						/>
					</div>
					<div className="row">
						<div className="col-3">
							<button type='submit'
								className='btn btn-primary'
								disabled={this.props.isAuthenticating || !(this.state.isValidPassword && this.state.isValidLogin)}
								onClick={this.handleSubmit}>Sign in</button>
						</div>
						<div className="col-9 switch-sign-in align-self-center">
							<h5>Don't have an account? <Link to={"/register"}>Sign up</Link></h5>
						</div>
					</div>
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