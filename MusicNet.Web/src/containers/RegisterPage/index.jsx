import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as AuthActions from '../../actions/AuthActions'

export class RegisterPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			isValidEmail: null,
			isValidPassword: null,
			isValidLogin: null,
			isVaildConfirmPassword: null,
			login: "",
			password: "",
			confirmPassword: "",
			redirectTo: "/"
		}
		this.validateEmail = this.validateEmail.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
		this.validateLogin = this.validateLogin.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.registerUser(this.state.email, this.state.login, this.state.password);
	}

	emailChanged(event) {
		this.setState({ email: event.target.value });
	}

	loginChanged(event) {
		this.setState({ login: event.target.value });
	}

	passwordChanged(event) {
		this.setState({ password: event.target.value });
	}

	validateEmail(e) {
		let isValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e.target.value);
		this.setState({ isValidEmail: isValid });
	}

	validatePassword(e) {
		let isValid = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{6,}$/.test(e.target.value);
		this.setState({ isValidPassword: isValid });
	}

	validateLogin(e) {
		let isValid = /^[a-zA-Z0-9]{4,}$/.test(e.target.value);
		this.setState({ isValidLogin: isValid });
	}

	validateConfirmPassword(e) {
		let isValid = e.target.value === this.state.password;
		this.setState({ isVaildConfirmPassword: isValid });
	}

	getFormGroupClass(stateProperty) {
		if (stateProperty === true) {
			return "has-success";
		} else if (stateProperty === false) {
			return "has-danger";
		} else {
			return "";
		}
	}

	getInputClass(stateProperty) {
		if (stateProperty === true) {
			return "form-control-success";
		} else if (stateProperty === false) {
			return "form-control-danger";
		} else {
			return "input-lg";
		}
	}

	render() {
		return (
				<div className='col-xs-12 col-md-6 register'>
					<h3>Sign up</h3>
					{this.props.statusText ? <div className='alert alert-danger'>{this.props.statusText}</div> : ''}
					<form role='form'>
						<div className={"form-group " + (this.getFormGroupClass(this.state.isValidEmail))}>
							<input type='text'
								className={'form-control ' + (this.getInputClass(this.state.isValidEmail))}
								placeholder='Email'
								onChange={this.emailChanged.bind(this)}
								onBlur={this.validateEmail}
							/>
						</div>
						<div className={"form-group " + (this.getFormGroupClass(this.state.isValidLogin))}>
							<input type='text'
								className={"form-control " + (this.getInputClass(this.state.isValidLogin))}
								placeholder='UserName'
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
						<div className={"form-group " + (this.getFormGroupClass(this.state.isVaildConfirmPassword))}>
							<input type='password'
								className={"form-control " + (this.getInputClass(this.state.isVaildConfirmPassword))}
								placeholder='Confirm Password'
								onChange={this.validateConfirmPassword}
							/>
						</div>
						<div className="row">
							<div className="col-3">
								<button type='submit'
									className='btn btn-primary'
									disabled={this.props.isRegistrating || !(this.state.isValidEmail && this.state.isValidPassword && this.state.isValidLogin && this.state.isVaildConfirmPassword)}
									onClick={this.handleSubmit.bind(this)}>Sign up</button>
							</div>
							<div className="col-9 switch-sign-in align-self-center">
								<h5>Have an account? <Link to={"/login"}>Sign in</Link></h5>
							</div>
						</div>
					</form>
				</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isRegistrating: state.auth.isRegistrating,
		statusText: state.auth.statusText
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(AuthActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
