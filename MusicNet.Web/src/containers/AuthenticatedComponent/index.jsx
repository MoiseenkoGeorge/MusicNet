import React from 'react'
import { connect } from 'react-redux'
import { ROUTING } from '../../constants/Routing'

export default function requireAuthentication(Component) {

	class AuthenticatedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth(this.props.auth);
		}
		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.auth);
		}
		checkAuth(user) {
			if (!user.isAuthenticated) {
				this.props.dispatch({
					type: ROUTING,
					payload: {
						method: 'replace',
						nextUrl: '/register'
					}
				});
			}
		}
		render() {
			return (
				<div>
					{this.props.auth.isAuthenticated === true
						? <Component {...this.props}/>
						: null
					}
				</div>
			);
		}
	}

	function mapStateToProps(state) {
		return {
			auth: state.auth
		}
	}

	return connect(mapStateToProps)(AuthenticatedComponent);
}
