import {AppThunk} from '../../../../app/s2-bll/store';
import {
    handleNetworkError,
    handleServerError,
} from '../../../../utils/error-utils';
import {authApi, LoginParamsType} from '../s3-dal/authApi';
import {Dispatch} from "redux";
import {setAuth} from "./slice";

export const authLogin = (data: LoginParamsType): AppThunk => (dispatch: Dispatch) => {
    authApi
        .login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuth({value: true}));
            } else {
                handleServerError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch);
        });
};

export const logout = (): AppThunk => (dispatch: Dispatch) => {
    authApi
        .logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuth({value: true}));
            } else {
                handleServerError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch);
        });
};
