import { useState } from "react";
import { AddTask } from "../addTask/AddTask";
import { ListTask } from '../listTask/ListTask';
import { SortTask } from "../sortTask/SortTask";
import { TaskStatuses } from "../../../constants/task";
import './RenderTask.css';
import { ToDoListType } from "../../../pages/sheet/s2-bll/state/toDoInitState";
import { TaskType } from "../../../pages/sheet/s2-bll/state/taskInitState";
import { FilterValuesType } from "../../../constants/request";

type RenderTaskPropsType = {
    todo: ToDoListType;
    task: TaskType[];
    removeSchedule: (id: string) => void;
}

export type SortPropsType = 'all' | 'active' | 'completed';

export const RenderTask = ({ todo, task, ...props }: RenderTaskPropsType) => {

    //const [tasks, setTasks] = useState<TaskType[]>(props.tasks);
    const [sort, setSort] = useState<SortPropsType>('all')

    //const addTask = (title: string) => props.addTasks(props.id, title);

    //const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

    // const checkedTask = (id: string) => {
    //     let task = tasks.find(t => t.id === id);

    //     if (task) {
    //         //task.completed = !task.completed
    //         setTasks([...tasks])
    //     }
    // }
    const taskSort = (items: TaskType[], filter: FilterValuesType) => {
        let sortTasks = items;

        if (filter === 'completed') {
            sortTasks = items.filter(t => t.status === TaskStatuses.Completed)
        }

        if (filter === 'active') {
            sortTasks = items.filter(t => t.status === TaskStatuses.New)
        }

        return sortTasks;
    }

    const taskLists = taskSort(task, todo.filter);

    return (
        <div className="task__wrapper">
            <AddTask id={todo.id} addTask={() => { }} tasks={taskLists} title={todo.title} removeSchedule={props.removeSchedule} />
            <SortTask setSort={setSort} sort={sort} taskLength={false} />
            <ListTask tasks={taskLists} removeTask={() => { }} checkedTask={() => { }} />
        </div>
    )
}