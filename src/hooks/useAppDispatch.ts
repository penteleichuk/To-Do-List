import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActionType, AppRootStateType } from '../app/s2-bll/store';

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

// export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppDispatch = () => useDispatch<any>();
