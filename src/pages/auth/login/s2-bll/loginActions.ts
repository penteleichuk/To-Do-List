export const setAuth = (value: boolean) => {
	return { type: 'SET-AUTH', value } as const;
};

export type SetAuthActionType = ReturnType<typeof setAuth>;
export type loginActionsType = SetAuthActionType;
