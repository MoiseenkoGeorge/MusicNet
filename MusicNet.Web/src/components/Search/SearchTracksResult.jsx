import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as SearchActions from '../../actions/SearchActions';
import Track from "../Track";
import Spinner from "../Spinner";

export class SearchTracksResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: this.props.term
		}
	}

	fetchData(term) {
		this.props.actions.getTracksByTitle(term);
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
				this.props.tracks.map((track, i) => {
					return (
						<div className="row track" key={track.id}>
							<Track data={track} />
						</div>
					);
				})
			}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchRequesting: state.search.searchRequesting,
		tracks: state.search.tracks
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(SearchActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTracksResults);