import {AppThunk} from '../../../../app/s2-bll/store';
import {
    handleNetworkError,
    handleServerError,
} from '../../../../utils/error-utils';
import {toDoApi} from '../../s3-dal/toDoApi';
import {
    addTodo,
    deleteTodo,
    setToDoList,
    setTodoStatus,
    setTodoTitle,
} from '../slices/toDoSlice';
import {setAppNotification} from "../../../../app/s2-bll/appSlice";
import {Dispatch} from "redux";

export const fetchToDo = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        const res = await toDoApi.getToDoLists();
        if (res.status === 200) {
            dispatch(setToDoList({toDoLists: res.data}));
        }
        return res;
    } catch (error: any) {
        handleNetworkError(error, dispatch);
    }
};

export const fetchToDoSetTitle = (todoId: string, title: string): AppThunk => (dispatch: Dispatch) => {
            dispatch(setTodoStatus({todoId, status: 'loading'}));
            toDoApi
                .updateToDo(todoId, title)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(setTodoTitle({todoId, title: title}));
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

export const fetchDeleteTodo = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setTodoStatus({todoId, status: 'loading'}));
    toDoApi
        .deleteToDo(todoId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodo({todoId: todoId}));
                dispatch(
                    setAppNotification({show: true, message: 'Successful removal of the scheme'})
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

export const fetchAddTodo = (title: string): AppThunk => (dispatch: Dispatch) => {
    toDoApi
        .createToDo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodo({todo: res.data.data.item}));
                dispatch(
                    setAppNotification({show: true, message: 'successful scheme creation'})
                );
            } else {
                handleServerError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch);
        });
};
