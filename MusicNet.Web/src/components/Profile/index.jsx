import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";

export default class Profile extends Component {
	render() {
		return (
			<div className="col-xs-12">
				<ProfileHeader userName = {this.props.params.userName}/>
				The profile
			</div>
		);
	}
}