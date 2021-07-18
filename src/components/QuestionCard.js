import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import Question from './Question';
import QuestionResult from './QuestionResult';
import QuestionContent from './QuestionContent';

const pollTypes = {
	POLL_CONTENT: 'POLL_CONTENT',
	POLL_QUESTION: 'POLL_QUESTION',
	POLL_RESULT: 'POLL_RESULT'
};

const PollContent = (props) => {
	const { pollType, question, unanswered } = props;

	switch (pollType) {
		case pollTypes.POLL_TEASER:
			return <QuestionContent question={question} unanswered={unanswered} />;
		case pollTypes.POLL_QUESTION:
			return <Question question={question} />;
		case pollTypes.POLL_RESULT:
			return <QuestionResult question={question} />;
		default:
			return;
	}
};

class QuestionCard extends Component {
	render() {
		const { author, question, pollType, badPath, unanswered = null } = this.props;
		const colors = {
			green: {
				name: 'green',
				hex: '#21ba45'
			},
			blue: {
				name: 'blue',
				hex: '#2185d0'
			},
			grey: {
				name: null,
				hex: '#d4d4d5'
			}
		};

		if (badPath === true) {
			return <Redirect to="/questions/bad_id" />;
		}

		const tabColor = unanswered === true ? colors.green : colors.blue;
		const borderTop = unanswered === null ? `1px solid ${colors.grey}` : `2px solid ${tabColor.hex}`;

		return (
			<Segment.Group>
				<Header as="h5" textAlign="left" block attached="top" style={{ borderTop: borderTop }}>
					{author.name} asks:
				</Header>

				<Grid divided padded>
					<Grid.Row>
						<Grid.Column width={5}>
							<Image src={author.avatarURL} />
						</Grid.Column>
						<Grid.Column width={11}>
							<PollContent pollType={pollType} question={question} unanswered={unanswered} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment.Group>
		);
	}
}

function mapStateToProps({ users, questions, authedUser }, { match, question_id }) {
	let question,
		author,
		pollType,
		badPath = false;
	if (question_id !== undefined) {
		question = questions[question_id];
		author = users[question.author];
		pollType = pollTypes.POLL_TEASER;
	} else {
		const { question_id } = match.params;
		question = questions[question_id];
		const user = users[authedUser];

		if (question === undefined) {
			badPath = true;
		} else {
			author = users[question.author];
			pollType = pollTypes.POLL_QUESTION;
			if (Object.keys(user.answers).includes(question.id)) {
				pollType = pollTypes.POLL_RESULT;
			}
		}
	}

	return {
		badPath,
		question,
		author,
		pollType
	};
}

export default connect(mapStateToProps)(QuestionCard);
