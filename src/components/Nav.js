import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Menu } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		this.props.setAuthedUser(null);
	};

	render() {
		const { authedUser, users } = this.props;

		return (
			<Menu size="large" pointing secondary>
				<Menu.Item as={NavLink} to="/" exact name="Home" />
				<Menu.Item as={NavLink} to="/add" name="New Question" />
				<Menu.Item as={NavLink} to="/leaderboard" name="Leader Board" />
				<Menu.Menu position="right">
					<Menu.Item>
						<span>
							<Image src={users[authedUser].avatarURL} avatar spaced="right" verticalAlign="bottom" />
							Welcome, {users[authedUser].name}
						</span>
					</Menu.Item>
					<Menu.Item name="Logout" onClick={this.handleLogout} />
				</Menu.Menu>
			</Menu>
		);
	}
}

function mapStateToProps({ users, authedUser }) {
	return {
		authedUser,
		users
	};
}

export default connect(mapStateToProps, { setAuthedUser })(Nav);
