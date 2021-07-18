import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';

export class Dashboard extends Component {
	render() {
		const { answered, unanswered } = this.props;

		return <Tab panes={panes({ answered, unanswered })} className="tab" />;
	}
}

const panes = ({ answered, unanswered }) => {
	return [
		{
			menuItem: 'Unanswered',
			render: () => (
				<Tab.Pane>
					{answered.map((question) => (
						<QuestionCard key={question.id} question_id={question.id} unanswered={true} />
					))}
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Answered',
			render: () => (
				<Tab.Pane>
					{unanswered.map((question) => (
						<QuestionCard key={question.id} question_id={question.id} unanswered={false} />
					))}
				</Tab.Pane>
			)
		}
	];
};

function mapStateToProps({ authedUser, users, questions }) {
	const answeredIds = Object.keys(users[authedUser].answers);

	return {
		answered: Object.values(questions)
			.filter((question) => !answeredIds.includes(question.id))
			.sort((a, b) => b.timestamp - a.timestamp),
		unanswered: Object.values(questions)
			.filter((question) => answeredIds.includes(question.id))
			.sort((a, b) => b.timestamp - a.timestamp)
	};
}

export default connect(mapStateToProps)(Dashboard);
