import React, { Component } from "react";
import Modal from "react-modal";

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
		width: "560px",
		height: "600px",
		padding: "0px",
		border: "0",
		overflow: "hidden"
	}
};

export default  class CustomModal extends Component {
	render() {
		return (
			<div>
				<Modal
					isOpen={this.props.isOpen}
					contentLabel={this.props.modalTitle}
					style={customStyles}
				>
					<div className="modal-title-wrap">
						<div className="modal-x-button" tabIndex="0" role="button" onClick={this.props.closeModal}></div>
						<div className="modal-title">{this.props.modalTitle}</div>
					</div>
					{this.props.children}
				</Modal>
			</div>
		);
	}
}

