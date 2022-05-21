import { IResponseToDoList } from '../../s3-dal/toDoApi';

export const setToDoList = (toDoLists: Array<IResponseToDoList>) => {
	return { type: 'SET-TODO', toDoLists } as const;
};

export type SetToDoListActionType = ReturnType<typeof setToDoList>;
export type ToDoActionsType = SetToDoListActionType;
