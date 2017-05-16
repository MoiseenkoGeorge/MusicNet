import React, { Component } from "react";
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';

export default class Comment extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12 comment">
				<div className="col-xs-2 col-md-2">
					<Link to={"/users/" + this.props.data.userName}>
						<img src={this.props.data.userImgUrl} className="img-circle" width="40" height="40" />
					</Link>
				</div>
				<div className="col-xs-10 col-md-10">
					<div className="row">
						<p className="comment-header">
							<Link to={"/users/" + this.props.data.userName}>
								{this.props.data.userName}
							</Link>
						</p>
					</div>
					<div className="row comment-text">
						{this.props.data.text}
					</div>
					<div className="row time">
						<p>
							<TimeAgo date={this.props.data.lastModifiedDate} />
						</p>
					</div>
				</div>
			</div>
			);
	}
}