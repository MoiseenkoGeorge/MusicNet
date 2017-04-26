import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";

export default class Profile extends Component {
	render() {
		return (
			<div className="row">
				<ProfileHeader userName = {this.props.params.userName}/>
			</div>
		);
	}
}