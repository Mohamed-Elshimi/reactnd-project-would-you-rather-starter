import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Segment, Header, Image, Form, Menu } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class SignInForm extends Component {
	state = {
		loading: false,
		value: ''
	};

	onChange = (e, { value }) => {
		this.setState({ value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { setAuthedUser } = this.props;
		const authedUser = this.state.value;

		new Promise((res, rej) => {
			this.setState({ loading: true });
			setTimeout(() => res(), 500);
		}).then(() => setAuthedUser(authedUser));
	};
	dropdownData = () => {
		const { users } = this.props;

		return users.map((user) => ({
			key: user.id,
			text: user.name,
			value: user.id,
			image: { avatar: true, src: user.avatarURL }
		}));
	};
	render() {
		const { value } = this.state;
		const disabled = value === '' ? true : false;

		return (
			<div className="sign-in">
				<Menu size="large" pointing secondary>
					<Menu.Item as={NavLink} to="/" exact name="Home" />
					<Menu.Item as={NavLink} to="/add" name="New Question" />
					<Menu.Item as={NavLink} to="/leaderboard" name="Leader Board" />
				</Menu>

				<Segment.Group>
					<Header as="h4" block attached="top" textAlign="center">
						<Header.Content>Welcome to the Would You Rather App!</Header.Content>

						<Header.Subheader>Please sign in to continue</Header.Subheader>
					</Header>

					<Image
						src="https://equimper.gallerycdn.vsassets.io/extensions/equimper/react-native-react-redux/2.0.6/1602247317454/Microsoft.VisualStudio.Services.Icons.Default"
						size="medium"
						centered
						alt="React-Redux image"
					/>
					<br />
					<Form onSubmit={this.handleSubmit}>
						<Header as="h2" color="green">
							Sign In
						</Header>
						<Form.Dropdown
							placeholder="Select a Username"
							fluid
							selection
							scrolling
							options={this.dropdownData()}
							value={value}
							onChange={this.onChange}
							required
						/>
						<Form.Button content="Sign In" positive disabled={disabled} fluid />
					</Form>
				</Segment.Group>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users: Object.values(users)
	};
}

export default connect(mapStateToProps, { setAuthedUser })(SignInForm);
