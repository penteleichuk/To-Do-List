import { Dispatch } from 'react';
import { toDoApi } from '../../s3-dal/toDoApi';
import { setToDoList, ToDoActionsType } from '../actions/toDoActions';
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
				entityStatus: 'idle',
			}));
		}
		default: {
			return state;
		}
	}
};

export const fetchToDo = () => (dispatch: Dispatch<any>) => {
	toDoApi.getToDoLists().then(res => {
		dispatch(setToDoList(res.data));
	});
};
