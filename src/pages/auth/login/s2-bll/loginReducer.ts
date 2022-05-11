import { loginActionsType } from './loginActions';
import { loginInitState, LoginStateType } from './loginInitState';

export const loginReducer = (
	state = loginInitState,
	action: loginActionsType
): LoginStateType => {
	switch (action.type) {
		default: {
			return { ...state };
		}
	}
};
