import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as ResetActions from '../../actions/ResetActions';
import ProfileHeader from "./ProfileHeader";
import ProfilePostsFeed from "./ProfilePostsFeed";
import NewPost from "../NewPost";

export class Profile extends Component {
	componentWillMount() {
		this.props.actions.resetFeed();
	}

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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ResetActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);