import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses} from "../../../../constants/task";
import {UpdateTaskModelType} from "../../s3-dal/taskApi";
import {addTodo, deleteTodo, setToDoList} from "./toDoSlice";

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
    [key: string]: TaskType[];
};

export const initialState: TaskInitStateType = {};

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<{ todoId: string, tasks: TaskType[] }>) {
            state[action.payload.todoId] = action.payload.tasks;
        },
        addTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        removeTask(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
            const index = state[action.payload.todoId].findIndex(el => el.id === action.payload.taskId);
            if(index > -1) {
                state[action.payload.todoId].splice(index, 1);
            }
        },
        updateTask(state, action: PayloadAction<{ todoId: string, taskId: string, model: UpdateTaskModelType }>) {
            let tasks = state[action.payload.todoId];
            const index = tasks.findIndex(el => el.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodo, (state, action) => {
            state[action.payload.todo.id] = [];
        });
        builder.addCase(deleteTodo, (state, action) => {
            delete state[action.payload.todoId];
        });
        builder.addCase(setToDoList, (state, action) => {
            action.payload.toDoLists.forEach(el => state[el.id] = [])
        });
    }
})

export const taskReducer = slice.reducer;
export const {setTasks, addTask, removeTask, updateTask} = slice.actions;