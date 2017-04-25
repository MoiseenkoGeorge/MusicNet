import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from '../../actions/ProfileActions';

import Spinner from "../Spinner";

export class ProfileHeader extends Component {

	componentWillMount() {
		this.fetchData();
	}

	fetchData() {
		this.props.actions.getUserProfile(this.props.userName);
	}

	render() {
		let template;
		if (this.props.profileRequesting === true) {
			template = (
				<Spinner/>
			);
		} else {
			template = (
				<div className="col-xs-12">
					<img src={this.props.profileImg} className="img-circle" alt="Profile image" />
				</div>
					);
		}
		return template;
	}
}

function mapStateToProps(state) {
	return {
		profileImg: state.profile.profileImg,
		subscribes: state.profile.subscribes,
		subscribers: state.profile.subscribers,
		isMyProfile: state.profile.isMyProfile,
		profileRequesting: state.profile.profileRequsting
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);