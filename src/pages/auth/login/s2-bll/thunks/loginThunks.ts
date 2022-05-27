import { AppThunk } from '../../../../../app/s2-bll/state/store';
import {
	handleNetworkError,
	handleServerError,
} from '../../../../../utils/error-utils';
import { authApi, LoginParamsType } from '../../s3-dal/authApi';
import { setAuth } from '../loginActions';

export const authLogin =
	(data: LoginParamsType): AppThunk =>
	dispatch => {
		authApi
			.login(data)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setAuth(true));
				} else {
					handleServerError(res.data, dispatch);
				}
			})
			.catch(error => {
				handleNetworkError(error, dispatch);
			});
	};

export const logout = (): AppThunk => dispatch => {
	authApi
		.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setAuth(false));
			} else {
				handleServerError(res.data, dispatch);
			}
		})
		.catch(error => {
			handleNetworkError(error, dispatch);
		});
};
