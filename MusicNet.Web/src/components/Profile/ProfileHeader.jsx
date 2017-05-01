import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as ProfileActions from '../../actions/ProfileActions';

import Spinner from "../Spinner";

export class ProfileHeader extends Component {
	constructor(props) {
		super(props);
		this.state = { userName: props.userName }
	}

	componentDidMount() {
		this.fetchData(this.state.userName);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.userName !== nextProps.userName) {
			this.setState({ userName: nextProps.userName });
			this.fetchData(nextProps.userName);
		}
	}

	fetchData(userName) {
		this.props.actions.getUserProfile(userName);
	}

	render() {
		let template;
		if (this.props.profileRequesting === true) {
			template = (
				<div className="col-xs-4 col-md-4 col-xs-offset-4 col-md-offset-4">
					<Spinner />
				</div>
			);
		} else {
			template = (
				<div className="col-xs-12 col-md-12">
					<div className="col-xs-3 col-md-3 col-xs-offset-1 col-md-offset-1">
						<img src={this.props.profileImg} className="img-circle" alt="Profile image" />
					</div>
					<div className="col-xs-8 col-md-8">
						<div className="row">
							<div className="col-xs-8 col-md-8">
								<h2>{this.state.userName}</h2>
							</div>
							<div className="col-xs-4 col-md-4">
							</div>
						</div>
						<div className="row">
							<div className="col-xs-4 col-md-4">
								<h4>
									<span>{this.props.postsCount} </span>
									posts
								</h4>
							</div>
							<div className="col-xs-4 col-md-4">
								<h4>
									<span>{this.props.subscribers} </span>
									followers
								</h4>
							</div>
							<div className="col-xs-4 col-md-4">
								<h4>
									<span>0 </span>
									following
								</h4>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return template;
	}
}

function mapStateToProps(state) {
	return {
		profileImg: state.profile.profileImg,
		subscribes: state.profile.subscribes,
		subscribers: state.profile.subscribers,
		isMyProfile: state.profile.isMyProfile,
		profileRequesting: state.profile.profileRequesting,
		postsCount: state.profile.postsCount
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ProfileActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);