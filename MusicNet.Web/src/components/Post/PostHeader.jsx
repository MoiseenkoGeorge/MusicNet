import React, { Component } from "react";
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';

export default class PostHeader extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12">
				<div className="row">
					<div className="col-2">
						<Link to={"/users/" + this.props.userName}>
							<img src={this.props.userImgUrl} className="rounded-circle" width="50" height="50" />
						</Link>
					</div>
					<div className="col-10">
						<div className="post-header-info">
							<h5>
								<Link to={"/users/" + this.props.userName}>
									{this.props.userName}
								</Link>
							</h5>
							<h6 className="time">
								<TimeAgo date={this.props.postDate} />
							</h6>
						</div>
					</div>
				</div>
			</div>
		);
	}
}