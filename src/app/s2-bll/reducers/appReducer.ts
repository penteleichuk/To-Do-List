import { Dispatch, useEffect } from 'react';
import { AppActionsType, setAppTheme } from '../actions/appActions';
import { AppInitState, AppStateType, DesignType } from '../state/appState';

export const appReducer = (
	state: AppStateType = AppInitState,
	action: AppActionsType
): AppStateType => {
	switch (action.type) {
		case 'app/SET_APP_THEME': {
			return { ...state, theme: action.theme };
		}
		default: {
			return state;
		}
	}
};

export const initAppTheme = () => (dispatch: Dispatch<any>) => {
	const getStorageTheme = localStorage.getItem('theme');

	if (getStorageTheme) {
		dispatch(setAppTheme(JSON.parse(getStorageTheme)));
	}
};

export const changeAppTheme =
	(theme: DesignType) => (dispatch: Dispatch<any>) => {
		localStorage.setItem('theme', JSON.stringify(theme));
		dispatch(setAppTheme(theme));
	};
