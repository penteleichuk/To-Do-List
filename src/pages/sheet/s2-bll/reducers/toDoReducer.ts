import { ToDoActionsType } from '../actions/toDoActions';
import { ToDoInitState, ToDoStateType } from '../state/toDoInitState';

export const toDoReducer = (
	state = ToDoInitState,
	action: ToDoActionsType
): ToDoStateType => {
	switch (action.type) {
		default: {
			return { ...state };
		}
	}
};
