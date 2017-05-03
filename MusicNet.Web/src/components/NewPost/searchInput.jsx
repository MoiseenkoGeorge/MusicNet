import React, { Component } from "react";

export default class SearchInput extends Component {
	render() {
		return (
			<div>
				<input
					type="text"
					onChange={this.props.onChange}
					placeholder="Search"
					className="search-input"
					/>
			</div>
			);
	}
}