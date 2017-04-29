import React, { Component } from "react";
import Post from "../Post";

export default class PostFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: this.props.posts
		}
	}
	render() {
		return (
			<div className="row">
				{
					this.props.posts.map((post, i) => {
						return <Post info={post} key={post.id}/>;
					})
				}
			</div>
		);
	}
}