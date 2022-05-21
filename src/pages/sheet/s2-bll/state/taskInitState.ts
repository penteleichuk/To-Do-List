import { TaskPriorities, TaskStatuses } from '../../../../constants/task';

export type TaskInitStateType = TaskListType;

export type TaskType = {
	description: string;
	title: string;
	status: TaskStatuses;
	priority: TaskPriorities;
	startDate: string;
	deadline: string;
	id: string;
	todoListId: string;
	order: number;
	addedDate: string;
};

export type TaskListType = {
	[key: string]: Array<TaskType>;
};

export const TaskInitState: TaskInitStateType = {};
