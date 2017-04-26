import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		return (
				<footer id="footer" className="footer navbar-fixed-bottom">
					<hr />
					<div className="container text-center">
						<p>&copy; {new Date().getFullYear()} - All Rights Reserved</p>
					</div>
				</footer>
		);
	}
}