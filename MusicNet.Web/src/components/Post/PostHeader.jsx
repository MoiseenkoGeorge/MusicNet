import React, { Component } from "react";
import NavLink from '../../components/NavLink';


export default class PostHeader extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12">
				<div className="row">
					<NavLink to={"/users/" + this.props.userName}>
						<img src={this.props.userImgUrl} width="50" height="50" />
					</NavLink>
					<div className="post-header-info">
						<h5>
							<NavLink to={"/users/" + this.props.userName}>
								{this.props.userName}
							</NavLink>
						</h5>
						<h6>
							{this.props.postDate}
						</h6>
					</div>
				</div>
			</div>
			);
	}
}