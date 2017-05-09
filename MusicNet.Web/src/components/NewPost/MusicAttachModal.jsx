import React, { Component } from "react";
import CustomModal from "../Modal";
import SearchInput from "./searchInput";
import Spinner from "../Spinner"

import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as SearchActions from '../../actions/SearchActions';

export class MusicAttachModal extends Component {
	constructor(props) {
		super(props);

		this.onSearchChanged = this.onSearchChanged.bind(this);
	}

	onSearchChanged(e) {
		let term = e.target.value.trim();
		if (term !== "") {
			this.props.actions.getTracksByTitle(term);
		}
	}

	onAttachClicked(track) {
		this.props.onAttachClick(track);
	}

	getModalContent() {
		let resultTemplate;
		if (this.props.searchRequesting === true) {
			resultTemplate = (
				<div>
					<Spinner />
				</div>
			);
		} else if (this.props.tracks.length === 0) {
			resultTemplate = (
				<div>
					<h3>0 results</h3>
				</div>
			);
		} else {
			resultTemplate = (
				<div>
					{
						this.props.tracks.map((track, i) => {
							return (
								<div key={track.id} className="audio-item-wrapper">
									<audio src={track.url} controls="controls"></audio>
									<input type="button" className="button" value="Attach" onClick={this.onAttachClicked.bind(this, track)}/>
								</div>
								
							);
						})
					}
				</div>
				);
		}
		return resultTemplate;
	}

	render() {
		let content = this.getModalContent();
		
		return (
			<div>
				<CustomModal
					isOpen={this.props.isOpen}
					contentLabel="Attach audio file"
					closeModal={this.props.closeModal}
					modalTitle="Attach audio file"
				>
					<SearchInput onChange={this.onSearchChanged} />
					<div className="modal-content">
						{content}
					</div>
				</CustomModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MusicAttachModal);