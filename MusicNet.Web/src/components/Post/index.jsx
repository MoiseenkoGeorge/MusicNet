import React, { Component } from "react";
import PostHeader from "./PostHeader";

export default class Post extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-6 col-md-offset-3 post">
				<PostHeader userImgUrl={this.props.info.userImgUrl} userName={this.props.info.userName} postDate={this.props.info.creationDate} />
				<div>
					<p>{this.props.info.text}</p>
				</div>
			</div>
		);
	}
}