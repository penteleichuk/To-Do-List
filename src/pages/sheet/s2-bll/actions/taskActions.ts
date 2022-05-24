import { type } from 'os';
import { TaskType } from '../state/taskInitState';
import { SetToDoListActionType } from './toDoActions';

export const setTasks = (todoId: string, tasks: TaskType[]) => {
	return { type: 'SET-TASKS', todoId, tasks } as const;
};

export const addTask = (task: TaskType) => {
	return { type: 'ADD-TASK', task } as const;
};

export const removeTask = (todoId: string, taskId: string) => {
	return { type: 'REMOVE-TASK', todoId, taskId } as const;
};

export type SetTasksActionType = ReturnType<typeof setTasks>;
export type AddTaskActionType = ReturnType<typeof addTask>;
export type RemoveTaskActionType = ReturnType<typeof removeTask>;
export type TaskActionsType =
	| SetToDoListActionType
	| SetTasksActionType
	| AddTaskActionType
	| RemoveTaskActionType;
