import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsFeed from "./ProfilePostsFeed";
import NewPost from "../NewPost";

export default class Profile extends Component {
	render() {
		return (
			<div className="row">
				<div className="row">
					<ProfileHeader userName={this.props.params.userName} />
				</div>
				<div className="row">
					<NewPost />
				</div>
				<div className="row">
					<ProfilePostsFeed userName={this.props.params.userName} />
				</div>
			</div>
		);
	}
}