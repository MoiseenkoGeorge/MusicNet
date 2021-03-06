﻿import React, { Component } from "react";
import CustomModal from "../Modal";
import Spinner from "../Spinner"

import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from "../../actions/ProfileActions"

import ProfileItem from "./ProfileItem";

export class FollowersModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: this.props.userName
		}
		this.onSubscribeClicked = this.onSubscribeClicked.bind(this);
	}

	fetchData(userName) {
		this.props.actions.getUserFollowers(userName);
	}

	componentDidMount() {
		if (!this.props.followersHasBeenRequested && !this.props.followersRequesting) {
			this.fetchData(this.props.userName);
		}
	}

	onSubscribeClicked(userName, isFollowedByMe) {
		if (isFollowedByMe) {
			this.props.actions.unsubscribeFromFollowersUser(userName);
		} else {
			this.props.actions.subscribeToFollowersUser(userName);
		}
	}
	
	getModalContent() {
		let resultTemplate;
		if (this.props.followersRequesting === true) {
			resultTemplate = (
				<div>
					<Spinner />
				</div>
			);
		} else if (this.props.followers.length === 0) {
			resultTemplate = (
				<div>
					<h3>No followers yet.</h3>
				</div>
			);
		} else {
			resultTemplate = (
				<ul className="profile-items">
					{
						this.props.followers.map((profile, i) => {
							return (
								<li key={profile.id}>
									<ProfileItem data={profile} onSubscribeClick={this.onSubscribeClicked}/>
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
					contentLabel="Followers"
					closeModal={this.props.closeModal}
					modalTitle="Followers"
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
		followersRequesting: state.profile.followersRequesting,
		followers: state.profile.followers,
		followersHasBeenRequested: state.profile.followersHasBeenRequested
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersModal);
