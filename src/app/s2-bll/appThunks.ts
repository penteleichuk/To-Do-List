import {authApi} from '../../pages/auth/login/s3-dal/authApi';
import {handleNetworkError} from '../../utils/error-utils';
import {AppThunk} from './store';
import {Dispatch} from "redux";
import {DesignType, setAppTheme, setInitApp} from "./appSlice";
import {setAuth} from "../../pages/auth/login/s2-bll/authSlice";

export const initApp = (): AppThunk => (dispatch: Dispatch) => {
    authApi
        .getAuthMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuth({value: true}));
            }
            dispatch(setInitApp({value: true}));
        })
        .catch(error => {
            handleNetworkError(error, dispatch);
        });

    initAppTheme();
    // dispatch(initAppTheme());
};
export const initAppTheme = () => (dispatch: Dispatch) => {
    const getStorageTheme = localStorage.getItem('theme');
    if (getStorageTheme) {
        dispatch(setAppTheme(JSON.parse(getStorageTheme)));
    }
};
export const changeAppTheme = (theme: DesignType): AppThunk => (dispatch: Dispatch) => {
    localStorage.setItem('theme', JSON.stringify(theme));
    dispatch(setAppTheme({theme}));
};
