import { useEffect, useState } from "react";
import { AddTask } from "../addTask/AddTask";
import { ListTask } from '../listTask/ListTask';
import { SortTask } from "../sortTask/SortTask";
import { TaskStatuses } from "../../../constants/task";
import { ToDoListType } from "../../../pages/sheet/s2-bll/state/toDoInitState";
import { TaskListType, TaskType } from "../../../pages/sheet/s2-bll/state/taskInitState";
import { FilterValuesType } from "../../../constants/request";
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../app/s2-bll/state/store";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchTasks } from "../../../pages/sheet/s2-bll/reducers/taskReducer";
import './RenderTask.css';

type RenderTaskPropsType = {
    todo: ToDoListType;
    removeSchedule: (id: string) => void;
}

export type SortPropsType = 'all' | 'active' | 'completed';

export const RenderTask = ({ todo, removeSchedule }: RenderTaskPropsType) => {

    const dispatch = useAppDispatch();
    useEffect(() => dispatch(fetchTasks(todo.id)), []);

    const tasks = useSelector<AppStoreType, TaskListType>(state => state.task);
    const [sort, setSort] = useState<SortPropsType>('all');

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

    const taskLists = taskSort(tasks[todo.id], todo.filter);

    return (
        <div className="task__wrapper">
            <AddTask id={todo.id} title={todo.title} removeSchedule={removeSchedule} />
            <div className="task__content">
                <SortTask setSort={setSort} sort={sort} />
                <ListTask tasks={taskLists} removeTask={() => { }} checkedTask={() => { }} />
            </div>
        </div>
    )
}