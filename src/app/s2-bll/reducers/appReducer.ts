import { AppActionsType } from '../actions/appActions';
import { AppInitState, AppStateType } from '../state/appState';

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
