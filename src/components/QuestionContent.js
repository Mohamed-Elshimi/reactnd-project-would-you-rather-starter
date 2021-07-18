import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

class QuestionContent extends Component {
	static propTypes = {
		question: PropTypes.object.isRequired,
		unanswered: PropTypes.bool.isRequired
	};
	state = {
		viewQuestion: false
	};
	handleClick = (e) => {
		this.setState((prevState) => ({
			viewQuestion: !prevState.viewQuestion
		}));
	};
	render() {
		const colors = {
			green: {
				name: 'green',
				hex: '#21ba45'
			},
			blue: {
				name: 'blue',
				hex: '#2185d0'
			}
		};
		const { question, unanswered } = this.props;
		const buttonColor = unanswered === true ? colors.green : colors.blue;
		const buttonContent = unanswered === true ? 'View Poll' : 'View Results';
		const { viewQuestion } = this.state;
		if (viewQuestion === true) {
			return <Redirect push to={`/questions/${question.id}`} />;
		}
		return (
			<Fragment>
				<Header as="h5" textAlign="left">
					Would you Rather ...
				</Header>
				<p style={{ textAlign: 'center' }}>
					{question.optionOne.text}
					<br />
					OR...
				</p>
				<Button color={buttonColor.name} size="tiny" fluid onClick={this.handleClick} content={buttonContent} />
			</Fragment>
		);
	}
}

export default QuestionContent;
