import { Dispatch } from 'react';
import { taskApi } from '../../s3-dal/taskApi';
import {
	addTask,
	removeTask,
	setTasks,
	TaskActionsType,
} from '../actions/taskActions';
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
		default: {
			return state;
		}
	}
};

export const fetchTasks = (todoId: string) => (dispatch: Dispatch<any>) => {
	taskApi.getTasks(todoId).then(res => {
		dispatch(setTasks(todoId, res.data.items));
	});
};

export const fetchAddTask =
	(todoId: string, title: string) => (dispatch: Dispatch<any>) => {
		taskApi.createTask(todoId, title).then(res => {
			dispatch(addTask(res.data.data.item));
		});
	};

export const fetchRemoveTask =
	(todoId: string, taskId: string) => (dispatch: Dispatch<any>) => {
		taskApi.deleteTask(todoId, taskId).then(res => {
			dispatch(removeTask(todoId, taskId));
		});
	};
