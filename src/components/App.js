import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Nav from './Nav';
import SignInForm from './SignInForm';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
//import Dashboard from './Dashboard';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}
	render() {
		const { authedUser } = this.props;
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="container">
						{authedUser === null ? (
							<Route render={() => <SignInForm />} />
						) : (
							<Fragment>
								<Nav />

								<Switch>
									<Route path="/add" component={NewQuestion} />
									<Route path="/leaderboard" component={Leaderboard} />
								</Switch>
							</Fragment>
						)}
					</div>
				</Fragment>
			</Router>
		);
	}
}
function mapStateToProps({ authedUser }) {
	return {
		authedUser
	};
}
export default connect(mapStateToProps)(App);
