import { Dispatch } from 'react';
import { setAppNotification } from '../../../../app/s2-bll/actions/appActions';
import {
	handleNetworkError,
	handleServerError,
} from '../../../../utils/error-utils';
import { toDoApi } from '../../s3-dal/toDoApi';
import {
	addTodo,
	deleteTodo,
	setToDoList,
	setTodoStatus,
	setTodoTitle,
	ToDoActionsType,
} from '../actions/toDoActions';
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

export const fetchToDo = () => async (dispatch: Dispatch<any>) => {
	try {
		const res = await toDoApi.getToDoLists();
		if (res.status === 200) {
			dispatch(setToDoList(res.data));
		}
		return res;
	} catch (error: any) {
		handleNetworkError(error, dispatch);
	}
};

export const fetchToDoSetTitle =
	(todoId: string, title: string) => (dispatch: Dispatch<any>) => {
		dispatch(setTodoStatus(todoId, 'loading'));
		toDoApi
			.updateToDo(todoId, title)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setTodoTitle(todoId, title));
				} else {
					handleServerError(res.data, dispatch);
				}
			})
			.catch(error => {
				handleNetworkError(error, dispatch);
			})
			.finally(() => {
				dispatch(setTodoStatus(todoId, 'idle'));
			});
	};

export const fetchDeleteTodo =
	(todoId: string) => (dispatch: Dispatch<any>) => {
		dispatch(setTodoStatus(todoId, 'loading'));
		toDoApi
			.deleteToDo(todoId)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(deleteTodo(todoId));
					dispatch(
						setAppNotification({
							show: true,
							message: 'Successful removal of the scheme',
						})
					);
				} else {
					handleServerError(res.data, dispatch);
				}
			})
			.catch(error => {
				handleNetworkError(error, dispatch);
			})
			.finally(() => {
				dispatch(setTodoStatus(todoId, 'idle'));
			});
	};

export const fetchAddTodo = (title: string) => (dispatch: Dispatch<any>) => {
	toDoApi
		.createToDo(title)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(addTodo(res.data.data.item));
				dispatch(
					setAppNotification({
						show: true,
						message: 'successful scheme creation',
					})
				);
			} else {
				handleServerError(res.data, dispatch);
			}
		})
		.catch(error => {
			handleNetworkError(error, dispatch);
		});
};
