import React, { Component } from "react";

import PostHeader from "./PostHeader";
import NewComment from "../NewComment";
import Comment from "./Comment";
import Track from "../Track";

export default class Post extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-6 post">
				<PostHeader userImgUrl={this.props.info.userImgUrl} userName={this.props.info.userName} postDate={this.props.info.creationDate} />
				<div className="row justify-content-left">
					<div className="col-12">
						<p>{this.props.info.text}</p>
					</div>
				</div>
				{this.props.info.imageUrl ?
					<div className="row">
						<div className="col-12">
							<img src={this.props.info.imageUrl} alt="Profile image" className="post-image" />
						</div>
					</div>
					: ""}
				<div className="container">
					{
						this.props.info.tracks.map((track, i) => {
							return (
								<div className="row track">
									<Track data={track} key={track.id} />
								</div>
							);
						})
					}
				</div>
				<div className="comments">
					<div className="comments-wrapper container">
						{
							this.props.info.comments.map((comment, i) => {
								return <div className="row" key={comment.id}>
										<Comment data={comment} />
								       </div>;
							})
						}
					</div>
					<div className="add-comments-wrapper row">
						<NewComment postId={this.props.info.id} />
					</div>
				</div>
			</div>
		);
	}
}