import { Dispatch } from 'react';
import { AppStoreType } from '../../../../app/s2-bll/state/store';
import { taskApi, UpdateTaskModelType } from '../../s3-dal/taskApi';
import {
	addTask,
	removeTask,
	setTasks,
	TaskActionsType,
	updateTask,
} from '../actions/taskActions';
import { setTodoStatus } from '../actions/toDoActions';
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

export const fetchTasks = (todoId: string) => (dispatch: Dispatch<any>) => {
	taskApi.getTasks(todoId).then(res => {
		dispatch(setTasks(todoId, res.data.items));
		dispatch(setTodoStatus(todoId, 'idle'));
	});
};

export const fetchAddTask =
	(todoId: string, title: string) => (dispatch: Dispatch<any>) => {
		taskApi.createTask(todoId, title).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(addTask(res.data.data.item));
			}
		});
	};

export const fetchRemoveTask =
	(todoId: string, taskId: string) => (dispatch: Dispatch<any>) => {
		taskApi.deleteTask(todoId, taskId).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(removeTask(todoId, taskId));
			}
		});
	};

export const fetchUpdateTask =
	(todoId: string, taskId: string, model: UpdateTaskModelType) =>
	(dispatch: Dispatch<any>, getState: () => AppStoreType) => {
		const state = getState();
		const task = state.task[todoId].find(el => el.id === taskId);

		if (!task) {
			return console.warn('task not found in the state');
		}

		const requestModel: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			...model,
		};

		taskApi.updateTask(todoId, taskId, requestModel).then(res => {
			if (res.data.resultCode === 0) {
				dispatch(updateTask(todoId, taskId, model));
			}
		});
	};