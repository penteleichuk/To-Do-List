import { DesignType } from '../state/appState';

export const setAppTheme = (theme: DesignType) => {
	return { type: 'app/SET_APP_THEME', theme };
};

export type AppActionsType = SetAppTheme;

export type SetAppTheme = ReturnType<typeof setAppTheme>;
