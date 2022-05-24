import React, { useEffect, useState } from "react";
import { ChangeTheme } from "../../../components/changeTheme/ChangeTheme";
import { AddScheme } from "../../../components/addScheme/AddScheme";
import { RenderTask } from "../../../components/task/renderTask/RenderTask";
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../app/s2-bll/state/store";
import { ToDoListType } from "../s2-bll/state/toDoInitState";
import { fetchToDo } from "../s2-bll/reducers/toDoReducer";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import './Sheet.css'
import './Header.css'
import './Loading.css'

export const Sheet = React.memo(() => {

	const toDoLists = useSelector<AppStoreType, ToDoListType[]>(state => state.todo);
	const dispatch = useAppDispatch();

	useEffect(() => dispatch(fetchToDo()), []);

	const [schedule, setSchedule] = useState<Array<ToDoListType>>([]);
	//const [tasks, setTasks] = useState<TasksListType>({});

	const addSchedule = (title: string) => setSchedule([]);
	// const addSchedule = (title: string) => setSchedule([
	// 	{ id: v1(), title: title, tasks: [] },
	// 	...schedule
	// ]);

	const removeSchedule = (id: string) => {
		setSchedule([
			...schedule.filter(s => s.id !== id)
		])
	}

	// const addTasks = (scheduleId: string, title: string) => {
	// 	setTasks({
	// 		[scheduleId]: [
	// 			{ id: v1(), isDone: false, title: title },
	// 			...(tasks[scheduleId] ?? {})
	// 		],
	// 		...tasks
	// 	});
	// }

	return (
		<div className="wrapper">
			<header className='header'>
				<AddScheme addSchedule={addSchedule} />
				<ChangeTheme />
			</header>

			<div className="todo">
				<div className='task'>
					{toDoLists.map(el =>
						<RenderTask key={el.id} todo={el} removeSchedule={removeSchedule} />
					)}
				</div>
			</div>
		</div>
	);
});