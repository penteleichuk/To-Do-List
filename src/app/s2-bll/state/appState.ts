export type DesignType = 'light' | 'dark';
export type NotificationType = {
	show: boolean;
	message: string | null;
	style?: 'primary' | 'danger';
};

export type AppStateType = {
	initialized: boolean;
	theme: DesignType;
	notification: NotificationType;
};

export const AppInitState: AppStateType = {
	initialized: false,
	theme: 'light',
	notification: {
		show: false,
		message: null,
		style: 'primary',
	},
};
