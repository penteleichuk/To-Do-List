import {
	FilterValuesType,
	RequestStatusType,
} from '../../../../constants/request';
import { IResponseToDoList } from '../../s3-dal/toDoApi';

export interface ToDoListType extends IResponseToDoList {
	filter: FilterValuesType;
	entityStatus: RequestStatusType;
}
export type ToDoInitStateType = ToDoListType;

export const ToDoInitState: ToDoInitStateType[] = [];
