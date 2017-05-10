import React, { Component } from "react";
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';

export default class Comment extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12">
				<div className="col-xs-2 col-md-2">
					<Link to={"/users/" + this.props.data.userName}>
						<img src={this.props.data.userImgUrl} className="img-circle" width="40" height="40" />
					</Link>
				</div>
				<div className="col-xs-10 col-md-10">
					<div className="row">
						<h5>
							<Link to={"/users/" + this.props.data.userName}>
								{this.props.data.userName}
							</Link>
						</h5>
					</div>
					<div className="row comment-text">
						{this.props.data.text}
					</div>
					<div className="row">
						<h6>
							<TimeAgo date={this.props.data.creationDate} />
						</h6>
					</div>
				</div>
			</div>
			);
	}
}