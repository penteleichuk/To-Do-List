import {AppStoreType, AppThunk} from '../../../../app/s2-bll/store';
import {Dispatch} from "redux";
import {
    handleNetworkError,
    handleServerError,
} from '../../../../utils/error-utils';
import {taskApi, UpdateTaskModelType} from '../../s3-dal/taskApi';
import {
    addTask,
    removeTask,
    TaskType,
    updateTask,
} from '../slices/taskSlice';
import {setTodoStatus} from '../slices/toDoSlice';
import {setAppNotification} from "../../../../app/s2-bll/appSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchingTasks = createAsyncThunk('task/fetchingTasks', async (id: string, {dispatch, rejectWithValue}) => {
    dispatch(setTodoStatus({todoId: id, status: 'loading'}));
    try {
        const response = await taskApi.getTasks(id);
        dispatch(setTodoStatus({todoId: id, status: 'idle'}));
        return {todoId: id, tasks: response.data.items};
        // dispatch(setTasks({todoId: id, tasks: response.data.items}));
    } catch (e: any) {
        handleNetworkError(e, dispatch);
        // rejectWithValue(e.message);
    }
    dispatch(setTodoStatus({todoId: id, status: 'idle'}));
});

export const fetchingAddTasks = createAsyncThunk('task/fetchingAddTasks',
    async ({todoId, title}: { todoId: string, title: string }, {dispatch}) => {
        dispatch(setTodoStatus({todoId, status: 'loading'}));
        try {
            const response = await taskApi.createTask(todoId, title);
            if (response.data.resultCode === 0) {
                dispatch(addTask({task: response.data.data.item}));
                dispatch(
                    setAppNotification({show: true, message: 'successful task creation'})
                );
            } else {
                handleServerError(response.data, dispatch);
            }
        } catch (e: any) {
            handleNetworkError(e, dispatch);
        }

        dispatch(setTodoStatus({todoId, status: 'idle'}));
    });

export const fetchAddTask = (todoId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setTodoStatus({todoId, status: 'loading'}));
    taskApi
        .createTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTask({task: res.data.data.item}));
                dispatch(
                    setAppNotification({show: true, message: 'successful task creation'})
                );
            } else {
                handleServerError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(setTodoStatus({todoId, status: 'idle'}));
        });
};

export const fetchRemoveTask =
    (todoId: string, taskId: string): AppThunk =>
        dispatch => {
            dispatch(setTodoStatus({todoId, status: 'loading'}));
            taskApi
                .deleteTask(todoId, taskId)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(removeTask({todoId, taskId}));
                    } else {
                        handleServerError(res.data, dispatch);
                    }
                })
                .catch(error => {
                    handleNetworkError(error, dispatch);
                })
                .finally(() => {
                    dispatch(setTodoStatus({todoId, status: 'idle'}));
                });
        };

export const fetchUpdateTask = (todoId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    (dispatch: Dispatch, getState: () => AppStoreType) => {
        const state = getState();
        const task = state.task[todoId].find((el: TaskType) => el.id === taskId);

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

        dispatch(setTodoStatus({todoId, status: 'loading'}));
        taskApi
            .updateTask(todoId, taskId, requestModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({todoId, taskId, model}));
                } else {
                    handleServerError(res.data, dispatch);
                }
            })
            .catch(error => {
                handleNetworkError(error, dispatch);
            })
            .finally(() => {
                dispatch(setTodoStatus({todoId, status: 'idle'}));
            });
    };
