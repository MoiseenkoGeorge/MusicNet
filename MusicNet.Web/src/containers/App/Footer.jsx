import React, { Component } from 'react'

export default class Footer extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
				<footer id="footer">
					<hr />
					<div className="container text-center">
						<p>&copy; {new Date().getFullYear()} - All Rights Reserved</p>
					</div>
				</footer>
		);
	}
}