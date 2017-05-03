import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import MusicAttachModal from "./MusicAttachModal";
import * as ProfileActions from '../../actions/ProfileActions';

export class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postText: "",
			modalIsOpen: false
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
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
			<div className='col-xs-12 col-md-6 col-md-offset-3 new-post'>
				<input type='text'
					className='input-lg'
					placeholder="What's new"
					onChange={this.postTextChanged.bind(this)} />
				<input type='button'
					className='btn btn-lg'
					value="Send"
					disabled={this.props.addPostRequesting}
					onClick={this.handleSubmit.bind(this)} />
				<input type='button'
					className='btn btn-lg'
					value="Attach Music"
					disabled={this.props.addPostRequesting}
					onClick={this.openModal} />
				<MusicAttachModal isOpen={this.state.modalIsOpen} closeModal={this.closeModal} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);