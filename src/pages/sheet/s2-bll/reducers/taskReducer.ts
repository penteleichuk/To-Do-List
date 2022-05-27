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
		case 'SET-TASKS': {
			return { ...state, [action.todoId]: action.tasks };
		}
		case 'ADD-TASK': {
			return {
				...state,
				[action.task.todoListId]: [
					action.task,
					...state[action.task.todoListId],
				],
			};
		}
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.todoId]: state[action.todoId].filter(
					t => t.id !== action.taskId
				),
			};
		}
		case 'UPDATE-TASK': {
			return {
				...state,
				[action.todoId]: state[action.todoId].map(el =>
					el.id === action.taskId ? { ...el, ...action.model } : el
				),
			};
		}
		case 'DELETE-TODO': {
			const copyState = { ...state };
			delete copyState[action.todoId];

			return copyState;
		}
		case 'ADD-TODO': {
			return { ...state, [action.todo.id]: [] };
		}
		default: {
			return state;
		}
	}
};
