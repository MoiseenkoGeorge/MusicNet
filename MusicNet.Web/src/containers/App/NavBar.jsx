import React, { Component } from 'react';
import { connect } from 'react-redux'
import NavLink from '../../components/NavLink'

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
						<NavLink onlyActiveOnIndex={true} to='/' className="navbar-brand">
							MusicNet
						</NavLink>
					</div>

					<div className="collapse navbar-collapse" id="bs-navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li><NavLink to={"/users/" + this.props.userName}>{this.props.userName}</NavLink></li>
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