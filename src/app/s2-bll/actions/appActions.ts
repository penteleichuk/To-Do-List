import { DesignType, NotificationType } from '../state/appState';

export const setAppTheme = (theme: DesignType) => {
	return { type: 'app/SET_APP_THEME', theme } as const;
};

export const setAppNotification = ({
	show,
	message,
	style,
}: NotificationType) => {
	return {
		type: 'SET-NOTIFICATION-APP',
		payload: { show, message, style },
	} as const;
};

export const setInitApp = (value: boolean) => {
	return { type: 'SET-INIT-APP', value } as const;
};

export type SetAppTheme = ReturnType<typeof setAppTheme>;
export type SetNotificationActionType = ReturnType<typeof setAppNotification>;
export type SetInitApp = ReturnType<typeof setInitApp>;

export type AppActionsType =
	| SetAppTheme
	| SetNotificationActionType
	| SetInitApp;
