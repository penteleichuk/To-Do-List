import { loginActionsType } from './loginActions';
import { loginInitState, AuthStateType } from './loginInitState';

export const loginReducer = (
	state: AuthStateType = loginInitState,
	action: loginActionsType
): AuthStateType => {
	switch (action.type) {
		case 'SET-AUTH': {
			return { ...state, isAuth: action.value };
		}
		default: {
			return state;
		}
	}
};
