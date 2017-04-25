import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		return (
			<div>
				<hr />
				<div id="footer">
					<div className="container text-center">
						<p>&copy; {new Date().getFullYear()} - All Rights Reserved</p>
					</div>
				</div>
			</div>
		);
	}
}