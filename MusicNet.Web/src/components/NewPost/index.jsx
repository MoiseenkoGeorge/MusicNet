import React, { Component } from "react";
import { bindActionCreators } from 'redux';
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
		this.resetState = this.resetState.bind(this);
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
		this.resetState();
	}

	resetState() {
		this.setState({
			postText: "",
			tracks: [],
			modalIsOpen: false
		});
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
			<div className='col-xs-12 col-md-6 new-post'>
				<form className="form-inline">
					<div className="form-group col-8">
						<textarea className="form-control" rows="2" placeholder="What's new" onChange={this.postTextChanged.bind(this)}></textarea>
					</div>
					<div className="form-group col-1 attach-input-wrapper">
						<div className="attach-music-input" disabled={this.props.addPostRequesting} onClick={this.openModal}></div>
					</div>
					<div className="form-group col-1 attach-input-wrapper">
						<div className="attach-picture-input" disabled={this.props.addPostRequesting}></div>
					</div>
					<input type='button'
						className='btn btn-primary col-2'
						value="Send"
						disabled={this.props.addPostRequesting}
						onClick={this.handleSubmit.bind(this)} />
				</form>
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