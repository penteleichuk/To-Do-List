import { DesignType } from '../state/appState';

export const setAppTheme = (theme: DesignType) =>
	({
		type: 'app/SET_APP_THEME',
		theme,
	} as const);

export type AppActionsType = SetAppTheme;

export type SetAppTheme = ReturnType<typeof setAppTheme>;
