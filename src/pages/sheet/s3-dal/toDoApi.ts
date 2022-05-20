import { AxiosResponse } from 'axios';
import { instance } from '../../../app/s3-dall/instance';

export const toDoApi = {
	// Get all todolists for authorized user
	getToDoLists() {
		return instance.get<ToDoListType[]>('/todo-lists');
	},

	// Create new todolist (max todolists count - 10)
	createToDo(title: string) {
		return instance.post<
			{ title: string },
			AxiosResponse<ResponseType<{ item: ToDoListType }>>
		>('/todo-lists', { title });
	},

	// Delete todolist
	deleteToDo(todolist: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolist}`);
	},

	// Update todolist title
	updateToDo(todolist: string, title: string) {
		return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
			`/todo-lists/${todolist}`,
			{ title }
		);
	},

	// Change todolists order
	setOrderToDo(todolistId: string, putAfterItemId: string) {
		return instance.put<
			{ putAfterItemId: string },
			AxiosResponse<ResponseType>
		>(`/todo-lists/${todolistId}/reorder`, {
			putAfterItemId,
		});
	},
};

type ToDoListType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
};

export type ResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
	fieldsErrors: Array<string>;
	data: D;
};
