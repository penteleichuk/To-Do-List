import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../configs/main';
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";
import {authReducer} from "../../pages/auth/login/s2-bll/authSlice";
import {toDoReducer} from "../../pages/sheet/s2-bll/slices/toDoSlice";
import {taskReducer} from "../../pages/sheet/s2-bll/slices/taskSlice";

const reducers = combineReducers({
    app: appReducer,
    task: taskReducer,
    todo: toDoReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware],
});

export type AppStoreType = ReturnType<typeof reducers>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStoreType,
    unknown,
    any>;

export type AppRootStateType = ReturnType<typeof reducers>;

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
