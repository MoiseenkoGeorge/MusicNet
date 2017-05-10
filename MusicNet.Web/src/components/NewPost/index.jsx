import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import MusicAttachModal from "./MusicAttachModal";
import Player from "../Player";
import * as PostActions from '../../actions/PostActions';

export class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postText: "",
			tracks: [],
			modalIsOpen: false
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onAttachClick = this.onAttachClick.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.actions.addPost(this.state.postText, this.state.tracks);
	}

	postTextChanged(e) {
		this.setState({ postText: e.target.value });
	}

	onAttachClick(track) {
		if (this.state.tracks.length < 10 && !this.state.tracks.includes(track)) {
			this.setState({ tracks: this.state.tracks.concat(track) });
			this.closeModal();
		}
	}

	getMusicAttachModal() {
		if (this.state.modalIsOpen) {
			let modal = (
				<MusicAttachModal isOpen={this.state.modalIsOpen}
					closeModal={this.closeModal}
					onAttachClick={this.onAttachClick} />
			);
			return modal;
		}
		return '';
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
				<div className="post-music-content">
					{
						this.state.tracks.map((track, i) => {
							return (
								<div key={track.id}>
									<audio src={track.url} controls="controls"></audio>
								</div>
							);
						})
					}
				</div>
				{this.getMusicAttachModal()}
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
		actions: bindActionCreators(PostActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);