import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class NavBar extends Component {
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link onlyActiveOnIndex={true} to='/' className="navbar-brand">
							MusicNet
						</Link>
					</div>

					<div className="collapse navbar-collapse" id="bs-navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
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