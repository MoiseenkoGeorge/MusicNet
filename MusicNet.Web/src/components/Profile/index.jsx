import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsFeed from "./ProfilePostsFeed";
import NewPost from "../NewPost";

export class Profile extends Component {
	render() {
		return (
			<div className="row">
				<div className="row">
					<ProfileHeader userName={this.props.params.userName} />
				</div>
				{this.props.isMyProfile ?
					<div className="row">
						<NewPost />
					</div>
					: ''}

				<div className="row">
					<ProfilePostsFeed userName={this.props.params.userName} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isMyProfile: state.profile.isMyProfile
	}
}

export default connect(mapStateToProps)(Profile);