import { setAppNotification } from '../../../../app/s2-bll/actions/appActions';
import { AppThunk } from '../../../../app/s2-bll/state/store';
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
} from '../actions/toDoActions';

export const fetchToDo = (): AppThunk => async dispatch => {
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
	(todoId: string, title: string): AppThunk =>
	dispatch => {
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
	(todoId: string): AppThunk =>
	dispatch => {
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

export const fetchAddTodo =
	(title: string): AppThunk =>
	dispatch => {
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
