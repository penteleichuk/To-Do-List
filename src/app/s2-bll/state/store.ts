import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { DEV_VERSION } from '../../../configs/main';
import { TaskActionsType } from '../../../pages/sheet/s2-bll/actions/taskActions';
import { ToDoActionsType } from '../../../pages/sheet/s2-bll/actions/toDoActions';
import { AppActionsType } from '../actions/appActions';
import { appReducer } from '../reducers/appReducer';

const reducers = combineReducers({
	app: appReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// export const store = configureStore({
// 	reducer: {
// 		app: appReducer,
// 	},
// 	middleware: [thunkMiddleware],
// });

export type AppStoreType = ReturnType<typeof reducers>;
export type AppActionType = AppActionsType | TaskActionsType | ToDoActionsType;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppStoreType,
	unknown,
	AppActionType
>;

if (DEV_VERSION) {
	// @ts-ignore
	window.store = store;
}
