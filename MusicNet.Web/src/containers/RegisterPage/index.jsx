import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/AuthActions'

export class RegisterPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			login: "",
			password: "",
			confirmPassword: "",
			redirectTo: "/"
		}
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

	confirmPasswordChanged(event) {
		
	}

	render() {
		return (
			<div className='col-xs-12 col-md-6 col-md-offset-3'>
				<h3>Sign up</h3>
				{this.props.statusText ? <div className='alert alert-danger'>{this.props.statusText}</div> : ''}
				<form role='form'>
					<div className='form-group'>
						<input type='text'
							className='form-control input-lg'
							placeholder='Email'
							onChange={this.emailChanged.bind(this)} />
					</div>
					<div className='form-group'>
						<input type='text'
							className='form-control input-lg'
							placeholder='UserName'
							onChange={this.loginChanged.bind(this)} />
					</div>
					<div className='form-group'>
						<input type='password'
							className='form-control input-lg'
							placeholder='Password'
							onChange={this.passwordChanged.bind(this)} />
					</div>
					<div className='form-group'>
						<input type='password'
							className='form-control input-lg'
							placeholder='Confirm Password'
							onChange={this.passwordChanged.bind(this)} />
					</div>
					<button type='submit'
						className='btn btn-lg'
						disabled={this.props.isRegistrating}
						onClick={this.handleSubmit.bind(this)}>Sign up</button>
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
