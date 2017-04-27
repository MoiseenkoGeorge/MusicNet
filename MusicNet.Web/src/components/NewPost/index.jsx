import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from '../../actions/ProfileActions';

export class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postText: ""
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.addPost(this.state.postText);
	}

	postTextChanged(event) {
		this.setState({ postText: event.target.value });
	}

	render() {
		return (
			<div className='col-xs-12 col-md-6 col-md-offset-3'>
				<input type='text'
					className='input-lg'
					placeholder="What's new"
					onChange={this.postTextChanged.bind(this)} />
				<input type='button'
					className='btn btn-lg'
					disabled={this.props.addPostRequesting}
					onClick={this.handleSubmit.bind(this)}>Sign in</input>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		addPostRequesting: state.profile.addPostRequesting
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);