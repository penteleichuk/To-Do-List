import { SortPropsType } from '../../../../components/task/renderTask/RenderTask';
import { RequestStatusType } from '../../../../constants/request';
import { IResponseToDoList } from '../../s3-dal/toDoApi';

export const setToDoList = (toDoLists: Array<IResponseToDoList>) => {
	return { type: 'SET-TODO', toDoLists } as const;
};

export const setTodoStatus = (todoId: string, status: RequestStatusType) => {
	return { type: 'SET-TODO-TYPE', todoId, status } as const;
};

export const setTodoFiltering = (todoId: string, filter: SortPropsType) => {
	return { type: 'SET-TODO-FILTERING', todoId, filter } as const;
};

export const setTodoTitle = (todoId: string, title: string) => {
	return { type: 'SET-TODO-TITLE', todoId, title } as const;
};

export const deleteTodo = (todoId: string) => {
	return { type: 'DELETE-TODO', todoId } as const;
};

export const addTodo = (todo: IResponseToDoList) => {
	return { type: 'ADD-TODO', todo } as const;
};

export type SetToDoListActionType = ReturnType<typeof setToDoList>;
export type SetTodoStatusActionType = ReturnType<typeof setTodoStatus>;
export type SetTodoFilteringActionType = ReturnType<typeof setTodoFiltering>;
export type SetTodoTitleActionType = ReturnType<typeof setTodoTitle>;
export type DeleteTodoActionType = ReturnType<typeof deleteTodo>;
export type AddTodoActionType = ReturnType<typeof addTodo>;
export type ToDoActionsType =
	| SetToDoListActionType
	| SetTodoStatusActionType
	| SetTodoFilteringActionType
	| SetTodoTitleActionType
	| DeleteTodoActionType
	| AddTodoActionType;
