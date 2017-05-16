import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class NavBar extends Component {
	render() {
		return (
			<nav className="navbar navbar-default navbar-toggleable-md">
				<div className="container">
					<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleContainer" aria-controls="navbarsExampleContainer" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Link onlyActiveOnIndex={true} to='/' className="navbar-brand">
						MusicNet
					</Link>

					<div className="collapse navbar-collapse" id="navbarsExampleContainer">
						<ul className="navbar-nav ml-auto">
							<li><Link to={"/users/" + this.props.userName}>{this.props.userName}</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		userName: state.auth.userName
	}
}

export default connect(mapStateToProps)(NavBar)