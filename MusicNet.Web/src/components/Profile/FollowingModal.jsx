import React, { Component } from "react";
import CustomModal from "../Modal";
import Spinner from "../Spinner"

import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from "../../actions/ProfileActions"

import ProfileItem from "./ProfileItem";

export class FollowingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: this.props.userName
		}
		this.onSubscribeClicked = this.onSubscribeClicked.bind(this);
	}

	fetchData(userName) {
		this.props.actions.getUserFollowing(userName);
	}

	componentDidMount() {
		if (!this.props.followingHasBeenRequested && !this.props.followingRequesting) {
			this.fetchData(this.props.userName);
		}
	}

	onSubscribeClicked(userName, isFollowedByMe) {
		if (isFollowedByMe) {
			this.props.actions.unsubscribeFromFollowingUser(userName);
		} else {
			this.props.actions.subscribeToFollowingUser(userName);
		}
	}

	getModalContent() {
		let resultTemplate;
		if (this.props.followingRequesting === true) {
			resultTemplate = (
				<div>
					<Spinner />
				</div>
			);
		} else if (this.props.following.length === 0) {
			resultTemplate = (
				<div>
					<h3>No following yet.</h3>
				</div>
			);
		} else {
			resultTemplate = (
				<ul className="profile-items">
					{
						this.props.following.map((profile, i) => {
							return (
								<li key={profile.id}>
									<ProfileItem data={profile} onSubscribeClick={this.onSubscribeClicked} />
								</li>
							);
						})
					}
				</ul>
			);
		}
		return resultTemplate;
	}

	render() {
		let content = this.getModalContent();

		return (
			<div>
				<CustomModal
					isOpen={this.props.isOpen}
					contentLabel="Following"
					closeModal={this.props.closeModal}
					modalTitle="Following"
				>
					<div className="modal-content">
						{content}
					</div>
				</CustomModal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		followingRequesting: state.profile.followingRequesting,
		following: state.profile.following,
		followingHasBeenRequested: state.profile.followingHasBeenRequested
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingModal);
