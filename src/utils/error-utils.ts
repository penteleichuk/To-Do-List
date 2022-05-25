import { Dispatch } from 'react';
import {
	setAppNotification,
	SetNotificationActionType,
} from '../app/s2-bll/actions/appActions';
import { ResponseType } from '../pages/sheet/s3-dal/toDoApi';

export const handleServerError = <D>(
	data: ResponseType<D>,
	dispatch: Dispatch<SetNotificationActionType>
) => {
	if (data.messages.length) {
		dispatch(
			setAppNotification({
				show: true,
				message: data.messages[0],
				style: 'danger',
			})
		);
	} else {
		dispatch(
			setAppNotification({
				show: true,
				message: 'Some error occurred',
				style: 'danger',
			})
		);
	}
};

export const handleNetworkError = (
	error: { message: string },
	dispatch: Dispatch<SetNotificationActionType>
) => {
	dispatch(
		setAppNotification({
			show: true,
			message: error.message ? error.message : 'Some error occurred',
			style: 'danger',
		})
	);
};
