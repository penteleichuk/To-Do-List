import { TaskActionsType } from '../actions/taskActions';
import { TaskInitState, TaskStateType } from '../state/taskInitState';

export const taskReducer = (
	state = TaskInitState,
	action: TaskActionsType
): TaskStateType => {
	switch (action.type) {
		default: {
			return { ...state };
		}
	}
};
