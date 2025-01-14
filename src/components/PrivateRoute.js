import React, { Component } from 'react';
import { Route } from 'react-router';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
	render() {
		const { authedUser, component: Component, ...rest } = this.props;
		return (
			<Route {...rest} render={(props) => (authedUser ? <Component {...props} /> : <Redirect to="/login" />)} />
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
	};
}
export default connect(mapStateToProps)(PrivateRoute);
