import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as PostActions from '../../actions/PostActions';
import * as ResetActions from '../../actions/ResetActions';

import Spinner from "../Spinner";
import PostFeed from "../PostFeed";

export class Feed extends Component {
	constructor(props) {
		super(props);
		this.state = { posts: props.posts }
	}

	componentWillMount() {
		this.props.resetActions.resetFeed();
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		this.props.actions.getUserFeed();
	}

	getTemplate() {
		let template;
		if (this.props.postsRequesting === true) {
			template = (
				<div className="col-xs-4 col-md-4">
					<Spinner />
				</div>
			);
		} else if (this.props.posts.length === 0) {
			template = (
				<div className="col-xs-12 col-md-12 text-center profilePostsFeed">
					<h3>No posts yet.</h3>
				</div>
			);
		} else {
			template = (
				<div className="col-xs-12 col-md-12">
					<PostFeed posts={this.props.posts} />
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
		postsRequesting: state.feed.postsRequesting,
		posts: state.feed.posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(PostActions, dispatch),
		resetActions: bindActionCreators(ResetActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
