import React, { Component } from "react";

export default class Track extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="track-name">{this.props.data.author} - {this.props.data.name}</div>
				</div>
				<div className="row">
					<audio src={this.props.data.url} controls="controls"></audio>
				</div>
			</div>
		);
	}
}