import React, { Component } from "react";
import Modal from "react-modal";
import SearchInput from "./searchInput";
import Spinner from "../Spinner"

import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as SearchActions from '../../actions/SearchActions';

const customStyles = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.5)'
	},
	content: {
		top: '40%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		overflow: 'auto',
		width: "560px",
		height: "auto",
		padding: "0px",
		border: "0"
	}
};

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
								<div key={track.id}>
									<audio src={track.url} controls="controls"></audio>
									<input type="button" className="btn btn-lg btn-attach" value="Attach" onClick={this.onAttachClicked.bind(this, track)}/>
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
				<Modal
					isOpen={this.props.isOpen}
					contentLabel="Attach audio file"
					style={customStyles}
				>
					<div className="modal-title-wrap">
						<div className="modal-x-button" tabIndex="0" role="button" onClick={this.props.closeModal}></div>
						<div className="modal-title">Attach audio file</div>
					</div>
					<SearchInput onChange={this.onSearchChanged} />
					<div className="modal-content">
						{content}
					</div>
				</Modal>
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