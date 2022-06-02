import {combineReducers} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../configs/main';
import {loginActionsType} from '../../pages/auth/login/s2-bll/loginActions';
import {loginReducer} from '../../pages/auth/login/s2-bll/loginReducer';
import {TaskActionsType} from '../../pages/sheet/s2-bll/actions/taskActions';
import {ToDoActionsType} from '../../pages/sheet/s2-bll/actions/toDoActions';
import {taskReducer} from '../../pages/sheet/s2-bll/reducers/taskReducer';
import {toDoReducer} from '../../pages/sheet/s2-bll/reducers/toDoReducer';
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./slice";

const reducers = combineReducers({
    app: appReducer,
    todo: toDoReducer,
    task: taskReducer,
    auth: loginReducer,
});

// export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware],
});
console.log(store)

export type AppStoreType = ReturnType<typeof reducers>;
export type AppActionType =
    | TaskActionsType
    | ToDoActionsType
    | loginActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStoreType,
    unknown,
    AppActionType>;

export type AppRootStateType = ReturnType<typeof reducers>;

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
