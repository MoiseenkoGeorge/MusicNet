import React, { Component } from "react";
import NavLink from '../../components/NavLink';
import TimeAgo from 'react-timeago';

export default class PostHeader extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12">
				<div className="row">
					<div className="col-xs-2 col-md-2">
						<NavLink to={"/users/" + this.props.userName}>
							<img src={this.props.userImgUrl} className="img-circle" width="50" height="50" />
						</NavLink>
					</div>
					<div className="col-xs-10 col-md-10">
						<div className="post-header-info row">
							<h5>
								<NavLink to={"/users/" + this.props.userName}>
									{this.props.userName}
								</NavLink>
							</h5>
							<h6>
								<TimeAgo date={this.props.postDate} />
							</h6>
						</div>
					</div>
				</div>
			</div>
		);
	}
}