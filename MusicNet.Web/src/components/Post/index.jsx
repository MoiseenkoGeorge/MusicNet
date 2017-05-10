import React, { Component } from "react";
import PostHeader from "./PostHeader";
import Comment from "./Comment";

export default class Post extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-6 col-md-offset-3 post">
				<PostHeader userImgUrl={this.props.info.userImgUrl} userName={this.props.info.userName} postDate={this.props.info.creationDate} />
				<div>
					<p>{this.props.info.text}</p>
				</div>
				<div>
					<div>
						{
							this.props.info.tracks.map((track, i) => {
								return (
									<div key={track.id}>
										<audio src={track.url} controls="controls"></audio>
									</div>
								);
							})
						}
					</div>
				</div>
				<div className="comments">
					<div className="comments-wrapper row">
						{
							this.props.info.comments.map((comment, i) => {
								return <Comment key={comment.id} data={comment} />;
							})
						}
					</div>
					<div className="add-comments-wrapper row">
						<div className="col-xs-12 col-md-12">
							<input type="text" className="add-comment" placeholder="Leave a comment..."/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}