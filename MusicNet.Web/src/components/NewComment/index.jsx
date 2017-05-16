import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PostActions from '../../actions/PostActions';

export class NewComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentText: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeComment = this.changeComment.bind(this);
	}

	changeComment(e) {
		this.setState({ commentText: e.target.value.trim() });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.actions.addCommentToPost(this.props.postId, this.state.commentText);
		this.setState({ commentText: "" });
	}

	render() {
		return (
			<div className="col-xs-12 col-md-12">
				<form role="form" onSubmit={this.handleSubmit} className="add-comment">
					<input type="text" placeholder="Leave a comment..." onChange={this.changeComment} disabled={this.props.addCommentRequesting} value={this.state.commentText}/>
				</form>
			</div>
			);
	}
}

function mapStateToProps(state) {
	return {
		addCommentRequesting: state.feed.addCommentRequesting
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(PostActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);