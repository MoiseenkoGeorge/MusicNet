import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ROUTING } from '../../constants/Routing';

import * as AuthActions from "../../actions/AuthActions";

export class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: "",
			showDropdown: false
		}
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.logout = this.logout.bind(this);
	}

	onSearchSubmit(e) {
		e.preventDefault();
		this.redirectToSearch(this.state.term);
		this.setState({ term: "" });
		this.refs.globalSearch.value = "";
	}

	redirectToSearch(term) {
		this.props.actions.redirect('/search/tracks?term=' + term);
	}

	onChangeSearchInput(e) {
		e.preventDefault();
		this.setState({ term: e.target.value.trim() });
	}

	toggleDropdown(e) {
		e.preventDefault();
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	}

	logout(e) {
		e.preventDefault();
		this.props.actions.logout();
		this.toggleDropdown();
	}

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
						<form className="form-inline my-2 my-md-0" role="form" onSubmit={this.onSearchSubmit}>
							<input className="form-control mr-sm-2" type="text" placeholder="Search" name="search" onChange={this.onChangeSearchInput} ref="globalSearch"/>
						</form>
						<ul className="navbar-nav ml-auto">
							<li className={"nav-item dropdown align-self-center " + (this.state.showDropdown === true ? "show": "")}>
								<a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleDropdown}>{this.props.userName}</a>
								<div className="dropdown-menu" aria-labelledby="dropdown">
									<Link className="dropdown-item" to={"/users/" + this.props.userName}>My Profile</Link>
									<a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
								</div>
								
							</li>
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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(AuthActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)