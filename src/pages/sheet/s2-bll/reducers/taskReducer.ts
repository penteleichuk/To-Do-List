import { TaskActionsType } from '../actions/taskActions';
import { TaskInitState, TaskListType } from '../state/taskInitState';

export const taskReducer = (
	state: TaskListType = TaskInitState,
	action: TaskActionsType
): TaskListType => {
	switch (action.type) {
		case 'SET-TODO': {
			action.toDoLists.forEach(element => (state[element.id] = []));
			return state;
		}
		default: {
			return state;
		}
	}
};
