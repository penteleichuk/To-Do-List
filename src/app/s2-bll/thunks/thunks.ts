import { setAuth } from '../../../pages/auth/login/s2-bll/loginActions';
import { authApi } from '../../../pages/auth/login/s3-dal/authApi';
import { handleNetworkError } from '../../../utils/error-utils';
import { setAppTheme, setInitApp } from '../actions/appActions';
import { initAppTheme } from '../reducers/appReducer';
import { DesignType } from '../state/appState';
import { AppThunk } from '../state/store';

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
