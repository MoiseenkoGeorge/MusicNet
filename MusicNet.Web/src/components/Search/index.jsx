import React, { Component } from "react";

import SearchTracksResults from "./SearchTracksResult";
import SearchInput from "../NewPost/searchInput";
import Spinner from "../Spinner";

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			term: this.props.location.query.term,
			isFirstChange: true
		}
		this.onSearchChanged = this.onSearchChanged.bind(this);
	}

	getZeroResults() {
		return (
			<div className="row justify-content-center">
				<h3>Your search returned no results</h3>
			</div>
			);
	}

	onSearchChanged(e) {
		let term = e.target.value.trim();
		if (this.state.isFirstChange) {
			this.setState({
				isFirstChange: false
			});
		}
		if (term !== "") {
			this.setState({
				term: term
			});
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-8 container search-container">
						<div className=" row search-header justify-content-left">
							<h3>Music</h3>
						</div>
						<div className="row">
							<SearchInput onChange={this.onSearchChanged} initialValue={this.state.isFirstChange ? this.props.location.query.term : null}/>
						</div>
					</div>
				</div>
				{this.props.params.category === "tracks" ?
					<div className="row justify-content-center">
						<SearchTracksResults term={this.state.term} />
					</div> :
					""
					}
			</div>
			);
	}
}