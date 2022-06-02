import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../configs/main';
import {TaskActionsType} from '../../pages/sheet/s2-bll/actions/taskActions';
import {ToDoActionsType} from '../../pages/sheet/s2-bll/actions/toDoActions';
import {taskReducer} from '../../pages/sheet/s2-bll/reducers/taskReducer';
import {toDoReducer} from '../../pages/sheet/s2-bll/reducers/toDoReducer';
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {authReducer} from "../../pages/auth/login/s2-bll/authSlice";

const reducers = combineReducers({
    app: appReducer,
    todo: toDoReducer,
    task: taskReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware],
});

export type AppStoreType = ReturnType<typeof reducers>;
export type AppActionType =
    | TaskActionsType
    | ToDoActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStoreType,
    unknown,
    AppActionType>;

export type AppRootStateType = ReturnType<typeof reducers>;

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
