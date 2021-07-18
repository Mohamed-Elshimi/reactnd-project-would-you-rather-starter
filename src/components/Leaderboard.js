import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Header, Label } from 'semantic-ui-react';

const trophyColor = [ 'yellow', 'grey', 'orange' ];

export class Leaderboard extends Component {
	static propType = {
		leaderboardData: PropType.array.isRequired
	};
	render() {
		const { leaderboardData } = this.props;

		return (
			<ul className="leader-board">
				{leaderboardData.map((user, idx) => (
					<li className="user-card" key={user.id}>
						<Label corner="left" icon="trophy" color={trophyColor[idx]} />
						<img className="avatar" src={user.avatarURL} alt={`Avatar of ${user.name}`} />
						<div className="user-info">
							<Header as="h3" textAlign="center">
								{user.name}
							</Header>
							<div>
								<p>Answered questions {user.answerCount}</p>
								<hr />
								<p>Created questions {user.questionCount}</p>
							</div>
						</div>
						<div className="score">
							<Header as="h5" block attached="top" content="Score" />
							<br />
							<Label circular color="green" size="big">
								{user.questionCount + user.answerCount}
							</Label>
						</div>
					</li>
				))}
			</ul>
		);
	}
}

function mapStateToProps({ users }) {
	const leaderboardData = Object.values(users)
		.map((user) => ({
			id: user.id,
			name: user.name,
			avatarURL: user.avatarURL,
			answerCount: Object.values(user.answers).length,
			questionCount: user.questions.length,
			total: Object.values(user.answers).length + user.questions.length
		}))
		.sort((a, b) => a.total - b.total)
		.reverse()
		.slice(0, 3);
	return {
		leaderboardData
	};
}

export default connect(mapStateToProps)(Leaderboard);
