import React, { useEffect, useState } from "react";
import { DesignType } from "../../../app/s2-bll/state/appState";
import { ChangeTheme } from "../../../components/changeTheme/ChangeTheme";
import { AddScheme } from "../../../components/addScheme/AddScheme";
import { RenderTask } from "../../../components/task/renderTask/RenderTask";
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../app/s2-bll/state/store";
import { ToDoListType } from "../s2-bll/state/toDoInitState";
import { fetchToDo } from "../s2-bll/reducers/toDoReducer";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { TaskListType } from "../s2-bll/state/taskInitState";
import './Sheet.css'

type SheetPropsType = {
	design: DesignType,
}

export type TasksPropsType = {
	id: string
	title: string
	isDone: boolean
}

export const Sheet = React.memo(({ design }: SheetPropsType) => {
	const dispatch = useAppDispatch();

	const toDoLists = useSelector<AppStoreType, ToDoListType[]>(state => state.todo);
	let tasks = useSelector<AppStoreType, TaskListType>(state => state.task);

	useEffect(() => {
		dispatch(fetchToDo());
	}, [])

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
			<div className="todo">
				<div className='todo__wrapper'>
					<AddScheme addSchedule={addSchedule} />
					<ChangeTheme design={design} />
				</div>

				<div className='task'>
					{toDoLists.map(el =>
						<RenderTask key={el.id} todo={el} task={tasks[el.id]} removeSchedule={removeSchedule} />
					)}
				</div>
			</div>
		</div>
	);
});