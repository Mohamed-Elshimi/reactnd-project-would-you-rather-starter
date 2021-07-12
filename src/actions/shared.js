import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { showQuestions } from './questions';

import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getInitialData().then(({ users, questions }) => {
			dispatch(receiveUsers(users));
			dispatch(showQuestions(questions));

			dispatch(hideLoading());
		});
	};
}
