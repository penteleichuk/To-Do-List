import React, { useEffect } from "react";
import { ChangeTheme } from "../../../components/changeTheme/ChangeTheme";
import { AddScheme } from "../../../components/addScheme/AddScheme";
import { RenderTask } from "../../../components/task/renderTask/RenderTask";
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../app/s2-bll/store";
import { ToDoListType } from "../s2-bll/state/toDoInitState";
import { Notification } from "./../../../components/notification/Notification"
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Navigate } from "react-router-dom";
import { fetchToDo } from "../s2-bll/thunks/toDoThunks";
import './Sheet.css'
import './Header.css'
import './Loading.css'

export const SheetPage = React.memo(() => {
	const toDoLists = useSelector<AppStoreType, ToDoListType[]>(state => state.todo);
	const isAuth = useSelector<AppStoreType, boolean>(state => state.auth.isAuth);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchToDo());
		}
	}, []);

	if (!isAuth) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className="wrapper">
			<header className='header'>
				<AddScheme />
				<ChangeTheme />
			</header>

			<div className="todo">
				<div className='task'>
					{toDoLists.map(el => <RenderTask key={el.id} todo={el} />)}
				</div>
			</div>
			<Notification />
		</div>
	);
});