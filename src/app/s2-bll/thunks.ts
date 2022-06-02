import { setAuth } from '../../pages/auth/login/s2-bll/loginActions';
import { authApi } from '../../pages/auth/login/s3-dal/authApi';
import { handleNetworkError } from '../../utils/error-utils';
import { setAppTheme, setInitApp } from './actions/appActions';
import { DesignType } from './state/appState';
import { AppThunk } from './store';

export const changeTheme =
	(theme: DesignType): AppThunk =>
	dispatch => {
		dispatch(setAppTheme(theme));
	};

export const initApp = (): AppThunk => dispatch => {
	authApi
		.getAuthMe()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setAuth(true));
			}
			dispatch(setInitApp(true));
		})
		.catch(error => {
			handleNetworkError(error, dispatch);
		});

	dispatch(initAppTheme());
};

export const initAppTheme = (): AppThunk => dispatch => {
	const getStorageTheme = localStorage.getItem('theme');
	if (getStorageTheme) {
		dispatch(setAppTheme(JSON.parse(getStorageTheme)));
	}
};

export const changeAppTheme =
	(theme: DesignType): AppThunk =>
	dispatch => {
		localStorage.setItem('theme', JSON.stringify(theme));
		dispatch(setAppTheme(theme));
	};
