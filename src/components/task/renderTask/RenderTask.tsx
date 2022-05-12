import { useState } from "react";
import { AddTask } from "../addTask/AddTask";
import { ListTask } from '../listTask/ListTask';
import { TasksPropsType } from "../../../pages/sheet/s1-ui/Sheet";
import { SortTask } from "../sortTask/SortTask";
import './RenderTask.css';

type RenderTaskPropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    removeSchedule: (id: string) => void
    addTasks: (id: string, title: string) => void
}

export type SortPropsType = 'all' | 'active' | 'completed';

export const RenderTask = (props: RenderTaskPropsType) => {
    const [tasks, setTasks] = useState<Array<TasksPropsType>>(props.tasks);
    const [sort, setSort] = useState<SortPropsType>('all')

    const addTask = (title: string) => props.addTasks(props.id, title);

    const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

    const checkedTask = (id: string) => {
        let task = tasks.find(t => t.id === id);

        if (task) {
            task.isDone = !task.isDone
            setTasks([...tasks])
        }
    }

    let sortTasks = tasks;
    if (sort === 'completed') {
        sortTasks = tasks.filter(t => t.isDone)
    }

    if (sort === 'active') {
        sortTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="task__wrapper">
            <AddTask id={props.id} addTask={addTask} tasks={tasks} title={props.title} removeSchedule={props.removeSchedule} />
            <SortTask setSort={setSort} sort={sort} taskLength={tasks.length > 0} />
            <ListTask tasks={sortTasks} removeTask={removeTask} checkedTask={checkedTask} />
        </div>
    )
}