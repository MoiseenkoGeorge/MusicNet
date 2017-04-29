import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from '../../actions/ProfileActions';

import Spinner from "../Spinner";
import PostFeed from "../PostFeed";

export class ProfilePostsFeed extends Component {
	componentWillMount() {
		this.fetchData();
	}

	fetchData() {
		this.props.actions.getUserProfilePosts(this.props.userName);
	}

	render() {
		let template;
		if (this.props.profilePostsRequesting === true) {
			template = (
				<div className="col-xs-4 col-md-4 col-xs-offset-4 col-md-offset-4">
					<Spinner />
				</div>
			);
		} else if (this.props.profilePosts.length === 0) {
			template = (
				<div className="col-xs-12 col-md-12 text-center profilePostsFeed">
					<h3>No posts yet.</h3>
				</div>
			);
		} else {
			template = (
				<div className="col-xs-12 col-md-12">
					<PostFeed posts={this.props.profilePosts} />
				</div>
			);
		}

		return template;
	}
}

function mapStateToProps(state) {
	return {
		profilePostsRequesting: state.profile.profilePostsRequesting,
		profilePosts: state.profile.profilePosts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePostsFeed);