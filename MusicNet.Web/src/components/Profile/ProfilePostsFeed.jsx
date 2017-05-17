import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as PostActions from '../../actions/PostActions';
import * as ResetActions from '../../actions/ResetActions';

import Spinner from "../Spinner";
import PostFeed from "../PostFeed";

export class ProfilePostsFeed extends Component {
	constructor(props) {
		super(props);
		this.state = { userName: props.userName }
	}

	componentDidMount() {
		this.fetchData(this.state.userName);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.userName !== nextProps.userName) {
			this.setState({ userName: nextProps.userName });
			this.props.resetActions.resetFeed();
			this.fetchData(nextProps.userName);
		}
	}

	fetchData(userName) {
		this.props.actions.getUserProfilePosts(userName);
	}

	render() {
		let template;
		if (this.props.profilePostsRequesting === true) {
			template = (
				<div className="col-xs-4 col-md-4">
					<Spinner />
				</div>
			);
		} else if (this.props.profilePosts.length === 0) {
			template = (
				<div className="col-xs-12 col-md-12 text-center profilePostsFeed">
					<div className="zero-results">
						<h3>No posts yet.</h3>
					</div>
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
		profilePostsRequesting: state.feed.postsRequesting,
		profilePosts: state.feed.posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(PostActions, dispatch),
		resetActions: bindActionCreators(ResetActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePostsFeed);