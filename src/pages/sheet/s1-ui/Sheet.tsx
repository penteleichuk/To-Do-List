import React, { useState } from "react";
import { v1 } from "uuid";
import { DesignType } from "../../../app/s2-bll/state/appState";
import { ChangeTheme } from "../../../components/changeTheme/ChangeTheme";
import { AddScheme } from "../../../components/addScheme/AddScheme";
import { RenderTask } from "../../../components/task/renderTask/RenderTask";
import './Sheet.css'

type SheetPropsType = {
	design: DesignType,
}

export type TasksPropsType = {
	id: string
	title: string
	isDone: boolean
}

type ToDoListType = {
	id: string
	title: string
	tasks: Array<TasksPropsType>
}

type TasksListType = {
	[key: string]: Array<TasksPropsType>
}

export const Sheet = React.memo(({ design }: SheetPropsType) => {

	const [schedule, setSchedule] = useState<Array<ToDoListType>>([]);
	const [tasks, setTasks] = useState<TasksListType>({});

	const addSchedule = (title: string) => setSchedule([
		{ id: v1(), title: title, tasks: [] },
		...schedule
	]);

	const removeSchedule = (id: string) => {
		setSchedule([
			...schedule.filter(s => s.id !== id)
		])
	}

	const addTasks = (scheduleId: string, title: string) => {
		setTasks({
			[scheduleId]: [
				{ id: v1(), isDone: false, title: title },
				...(tasks[scheduleId] ?? {})
			],
			...tasks
		});
	}

	return (
		<div className="wrapper">
			<div className="todo">
				<div className='todo__wrapper'>
					<AddScheme addSchedule={addSchedule} />
					<ChangeTheme design={design} />
				</div>

				<div className='task'>
					{schedule.map(t => <RenderTask key={t.id}
						id={t.id}
						tasks={t.tasks}
						title={t.title}
						removeSchedule={removeSchedule}
						addTasks={addTasks}
					/>
					)}
				</div>
			</div>
		</div>
	);
});