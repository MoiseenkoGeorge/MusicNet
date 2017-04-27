import React, { Component } from "react";

export default class Post extends Component {
	render() {
		return (
			<div className="row">
				<div>
					<p>{this.props.info.postText}</p>
				</div>
			</div>
		);
	}
}