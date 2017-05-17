import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from '../../actions/ProfileActions';
import FollowersModal from './FollowersModal';
import FollowingModal from './FollowingModal';

import Spinner from "../Spinner";

export class ProfileHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: props.userName,
			followersModalIsOpen: false,
			followingModalIsOpen: false
		}
		this.onSubscribeClicked = this.onSubscribeClicked.bind(this);
		this.openFollowersModal = this.openFollowersModal.bind(this);
		this.openFollowingModal = this.openFollowingModal.bind(this);
		this.closeFollowersModal = this.closeFollowersModal.bind(this);
		this.closeFollowingModal = this.closeFollowingModal.bind(this);
	}

	openFollowersModal() {
		this.setState({ followersModalIsOpen: true });
	}

	closeFollowersModal() {
		this.setState({ followersModalIsOpen: false });
	}

	openFollowingModal() {
		this.setState({ followingModalIsOpen: true });
	}

	closeFollowingModal() {
		this.setState({ followingModalIsOpen: false });
	}

	componentDidMount() {
		this.fetchData(this.state.userName);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.userName !== nextProps.userName) {
			this.setState({
				userName: nextProps.userName,
				followersModalIsOpen: false,
				followingModalIsOpen: false
			});
			this.fetchData(nextProps.userName);
		}
	}

	fetchData(userName) {
		this.props.actions.getUserProfile(userName);
	}

	onSubscribeClicked() {
		let userName = this.props.userName;
		let userId = this.props.profileId;
		if (this.props.isFollowedByMe) {
			this.props.actions.unsubscribeFromUser(userName, userId);
		} else {
			this.props.actions.subscribeToUser(userName, userId);
		}
		
	}

	getFollowButton() {
		if (!this.props.isMyProfile) {
			let button = (
				<button className={this.props.isFollowedByMe ? "button button-inverse button-follow" : "button button-follow"}
					disabled={this.props.subscriptionRequesting}
					onClick={this.onSubscribeClicked}>
					{this.props.isFollowedByMe ? "Unfollow" : "Follow"}
				</button>);
			return button;
		}
		return '';
	}

	getFollowersModal() {
		if (this.state.followersModalIsOpen) {
			let modal = (
				<FollowersModal userName={this.props.userName}
					isOpen={this.state.followersModalIsOpen}
					closeModal={this.closeFollowersModal}
				/>
			);
			return modal;
		}
		return '';
	}

	getFollowingModal() {
		if (this.state.followingModalIsOpen) {
			let modal = (
				<FollowingModal userName={this.props.userName}
					isOpen={this.state.followingModalIsOpen}
					closeModal={this.closeFollowingModal}
				/>
			);
			return modal;
		}
		return '';
	}

	getTemplate() {
		let template;
		if (this.props.profileRequesting === true) {
			template = (
				<div className="col-xs-4 col-md-4 col-xs-offset-4 col-md-offset-4">
					<Spinner />
				</div>
			);
		} else {
			template = (
				<div className="col-12 profile-header row">
					<div className="col-xs-3 col-md-3 col-xs-offset-1 col-md-offset-1">
						<img src={this.props.profileImg} className="rounded-circle img-profile" alt="Profile image" />
					</div>
					<div className="col-xs-8 col-md-8">
						<div className="row">
							<div className="col-xs-6 col-md-6">
								<h1>{this.state.userName}</h1>
							</div>
							<div className="col-xs-3 col-md-3">
								{this.getFollowButton()}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-4 col-md-4">
								<h4>
									<span>{this.props.postsCount} </span>
									posts
								</h4>
							</div>
							<div className="col-xs-4 col-md-4 btn-followers" onClick={this.openFollowersModal}>
								<h4>
									<span>{this.props.followers} </span>
									followers
								</h4>
							</div>
							<div className="col-xs-4 col-md-4 btn-following" onClick={this.openFollowingModal}>
								<h4>
									<span>{this.props.following} </span>
									following
								</h4>
							</div>
						</div>
					</div>
					{this.getFollowersModal()}
					{this.getFollowingModal()}
				</div>
			);
		}
		return template;
	}

	render() {
		let template = this.getTemplate();
		return template;
	}
}

function mapStateToProps(state) {
	return {
		profileId: state.profile.profileId,
		profileImg: state.profile.profileImg,
		following: state.profile.followingCount,
		followers: state.profile.followersCount,
		isMyProfile: state.profile.isMyProfile,
		profileRequesting: state.profile.profileRequesting,
		postsCount: state.profile.postsCount,
		isFollowedByMe: state.profile.isFollowedByMe,
		subscriptionRequesting: state.profile.subscriptionRequesting
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);