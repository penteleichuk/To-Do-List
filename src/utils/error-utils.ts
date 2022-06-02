import {ResponseType} from '../pages/sheet/s3-dal/toDoApi';
import {Dispatch} from "redux";
import {setAppNotification} from "../app/s2-bll/slice";

export const handleServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
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

export const handleNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(
        setAppNotification({
            show: true,
            message: error.message ? error.message : 'Some error occurred',
            style: 'danger',
        })
    );
};
