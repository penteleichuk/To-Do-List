import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../app/s2-bll/store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import './Notification.css';
import {NotificationType, setAppNotification} from "../../app/s2-bll/slice";

export const Notification = React.memo(() => {
	const dispatch = useAppDispatch();
	const notification = useSelector<AppStoreType, NotificationType>(state => state.app.notification);

	useEffect(() => {
		if (notification.show) {
			const timeout = setTimeout(() => {
				dispatch(setAppNotification({ show: false, message: null }))
			}, 1500);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [notification.message, notification.show]);

	return <>
		{notification.show &&
			<div className={`notification ${notification.style}`}>
				{notification.message}
			</div>
		}
	</>
});