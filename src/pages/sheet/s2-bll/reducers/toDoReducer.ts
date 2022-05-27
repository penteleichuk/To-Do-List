import { ToDoActionsType } from '../actions/toDoActions';
import { ToDoInitState, ToDoInitStateType } from '../state/toDoInitState';

export const toDoReducer = (
	state: Array<ToDoInitStateType> = ToDoInitState,
	action: ToDoActionsType
): Array<ToDoInitStateType> => {
	switch (action.type) {
		case 'SET-TODO': {
			return action.toDoLists.map(element => ({
				...element,
				filter: 'all',
				entityStatus: 'init',
			}));
		}
		case 'SET-TODO-TYPE': {
			return state.map(element =>
				element.id === action.todoId
					? { ...element, entityStatus: action.status }
					: element
			);
		}
		case 'SET-TODO-FILTERING': {
			return state.map(element =>
				element.id === action.todoId
					? { ...element, filter: action.filter }
					: element
			);
		}
		case 'SET-TODO-TITLE': {
			return state.map(el =>
				el.id === action.todoId ? { ...el, title: action.title } : el
			);
		}
		case 'DELETE-TODO': {
			return state.filter(el => el.id !== action.todoId);
		}
		case 'ADD-TODO': {
			return [
				{ ...action.todo, filter: 'all', entityStatus: 'idle' },
				...state,
			];
		}
		default: {
			return state;
		}
	}
};
