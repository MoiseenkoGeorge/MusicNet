import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ROUTING } from '../../constants/Routing'

export class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ""
		}
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
	}

	onSearchSubmit(e) {
		e.preventDefault();
		this.redirectToSearch(this.state.term);
		this.setState({ term: "" });
		this.refs.globalSearch.value = "";
	}

	redirectToSearch(term) {
		this.props.dispatch({
			type: ROUTING,
			payload: {
				method: 'replace',
				nextUrl: '/search/tracks?term=' + term
			}
		});
	}

	onChangeSearchInput(e) {
		e.preventDefault();
		this.setState({ term: e.target.value.trim() });
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
							<li className="align-self-center"><Link to={"/users/" + this.props.userName}>{this.props.userName}</Link></li>
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
}

export default connect(mapStateToProps)(NavBar)