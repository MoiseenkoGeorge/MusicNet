import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as SearchActions from '../../actions/SearchActions';
import Track from "../Track";
import Spinner from "../Spinner";
import ProfileItem from "../Profile/ProfileItem";

export class SearchUsersResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: this.props.term
		}
		this.onSubscribeClicked = this.onSubscribeClicked.bind(this);
	}

	onSubscribeClicked(userName, isFollowedByMe) {
	}

	componentDidMount() {
		this.fetchData(this.state.term);
	}

	fetchData(term) {
		this.props.actions.getUsersByName(term);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.term !== nextProps.term) {
			this.setState({ term: nextProps.term });
			this.fetchData(nextProps.term);
		}
	}

	getSpinner() {
		return (
			<div className="row justify-content-center">
				<Spinner />
			</div>
		);
	}

	render() {
		return (<div className=" col-8 container search-container">
			{this.props.searchRequesting ? this.getSpinner() : ""}
			{
				<ul className="profile-items">
					{
						this.props.users.map((profile, i) => {
							return (
								<li key={profile.id}>
									<ProfileItem data={profile} onSubscribeClick={this.onSubscribeClicked} />
								</li>
							);
						})
					}
				</ul>
			}
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchRequesting: state.search.searchRequesting,
		users: state.search.users
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(SearchActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersResults);