import { setAppTheme } from '../actions/appActions';
import { DesignType } from '../state/appState';
import { AppThunk } from '../state/store';

export const changeTheme =
	(theme: DesignType): AppThunk =>
	dispatch => {
		dispatch(setAppTheme(theme));
	};
