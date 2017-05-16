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

						return <div className="col-12 justify-content-center" key={post.id}>
							       <Post info={post} />
						       </div>;
					})
				}
			</div>
		);
	}
}