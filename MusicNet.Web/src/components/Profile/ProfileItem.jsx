import React, { Component } from "react";
import {Link} from 'react-router';

export default class ProfileItem extends Component {
	onSubscribeClicked(userName) {
		this.props.onSubscribeClick(userName, this.props.data.isFollowedByMe);
	}

	getFollowButton() {
		if (!this.props.isMyProfile) {
			let userName = this.props.data.name;
			let button = (
				<button className={this.props.data.isFollowedByMe ? "button button-inverse" : "button"}
					disabled={this.props.data.subscribeRequesting}
					onClick={this.onSubscribeClicked.bind(this, userName)}>
					{this.props.data.isFollowedByMe ? "Unfollow" : "Follow"}
				</button>);
			return button;
		}
		return '';
	}

	render() {
		return (
			<div className="profile-item-wrapper">
				<div className="profile-item">
					<Link to={"/users/" + this.props.data.name}>
						<img src={this.props.data.imageUrl} className="rounded-circle profile-item-img" width="40" height="40" />
					</Link>
					<div className="profile-item-content">
						<Link to={"/users/" + this.props.data.name}>
							{this.props.data.name}
						</Link>
					</div>
				</div>
				<div className="profile-item-follow-wrapper">
					{this.getFollowButton()}
				</div>
			</div>
			);
	}
}
