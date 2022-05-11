import {useState} from "react";
import './Task.css';
import {TaskAdd} from "../TaskAdd/TaskAdd";
import {TaskNav} from "../TaskNav/TaskNav";
import {TasksPropsType} from "../../Todo/TodoMain/Todo";
import { TaskList } from '../TaskList/TaskList';

type TaskPropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    removeSchedule: (id: string) => void
    addTasks: (id: string, title: string) => void
}

export type SortPropsType = 'all' | 'active' | 'completed';

export const Task = (props: TaskPropsType) => {
    const [tasks, setTasks] = useState<Array<TasksPropsType>>(props.tasks);
    const [sort, setSort] = useState<SortPropsType>('all')

    const addTask = (title: string) => props.addTasks(props.id, title);

    const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

    const checkedTask = (id: string) => {
        let task = tasks.find(t => t.id === id);

        if(task) {
            task.isDone = !task.isDone
            setTasks([...tasks])
        }
    }

    let sortTasks = tasks;
    if(sort === 'completed') {
        sortTasks = tasks.filter(t => t.isDone)
    }

    if(sort === 'active') {
        sortTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="task__wrapper">
            <TaskAdd id={props.id} addTask={addTask} tasks={tasks} title={props.title} removeSchedule={props.removeSchedule}/>
            <TaskNav setSort={setSort} sort={sort} taskLength={tasks.length > 0}/>
            <TaskList tasks={sortTasks} removeTask={removeTask} checkedTask={checkedTask}/>
        </div>
    )
}