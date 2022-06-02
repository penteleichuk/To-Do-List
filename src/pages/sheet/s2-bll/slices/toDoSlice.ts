import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IResponseToDoList} from "../../s3-dal/toDoApi";
import {FilterValuesType, RequestStatusType} from "../../../../constants/request";
import {SortPropsType} from "../../../../components/task/renderTask/RenderTask";

export interface ToDoListType extends IResponseToDoList {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
}
export type ToDoInitStateType = ToDoListType;

export const initialState: ToDoInitStateType[] = [];

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setToDoList(state, action: PayloadAction<{toDoLists: Array<IResponseToDoList>}>) {
            action.payload.toDoLists.forEach((el) => {
                state.push({...el, filter: 'all', entityStatus: 'init'});
            })
        },
        setTodoStatus(state, action: PayloadAction<{todoId: string, status: RequestStatusType}>) {
            const index = state.findIndex(el => el.id === action.payload.todoId);
            if(index > -1) {
                state[index].entityStatus = action.payload.status;
            }
        },
        setTodoFiltering(state, action: PayloadAction<{todoId: string, filter: SortPropsType}>) {
            const index = state.findIndex(el => el.id === action.payload.todoId);
            if(index > -1) {
                state[index].filter = action.payload.filter;
            }
        },
        setTodoTitle(state, action: PayloadAction<{todoId: string, title: string}>) {
            const index = state.findIndex(el => el.id === action.payload.todoId);
            if(index > -1) {
                state[index].title = action.payload.title;
            }
        },
        deleteTodo(state, action: PayloadAction<{todoId: string}>) {
            const index = state.findIndex(el => el.id === action.payload.todoId);
            if(index > -1) {
                state.splice(index, 1);
            }
        },
        addTodo(state, action: PayloadAction<{todo: IResponseToDoList}>) {
            state.unshift({...action.payload.todo, filter: 'all', entityStatus: 'idle'});
        }
    }
});

export const toDoReducer = slice.reducer;
export const {setToDoList, setTodoStatus, setTodoFiltering, setTodoTitle, deleteTodo, addTodo} = slice.actions;