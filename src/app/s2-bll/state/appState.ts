export type DesignType = 'light' | 'dark';

export type AppStateType = {
	theme: DesignType;
};

export const AppInitState: AppStateType = {
	theme: 'light',
};
