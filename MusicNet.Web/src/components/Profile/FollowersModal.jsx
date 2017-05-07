import React, { Component } from "react";
import CustomModal from "../Modal";
import Spinner from "../Spinner"

import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from "../../actions/ProfileActions"

import ProfileItem from "./ProfileItem";

export class FollowersModal extends Component {
	componentDidMount() {
		this.fetchData(this.props.userName);
	}

	fetchData(userName) {
		this.props.actions.getUserFollowers(userName);
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
				<div>
					{
						this.props.followers.map((profile, i) => {
							return (
								<ProfileItem key={profile.id} data={profile}>
								</ProfileItem>
							);
						})
					}
				</div>
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
		followers: state.profile.followers
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersModal);
