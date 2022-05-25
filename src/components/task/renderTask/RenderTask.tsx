import { useEffect } from "react";
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

export type SortPropsType = 'all' | 'active' | 'completed';

export const RenderTask = ({ todo }: { todo: ToDoListType }) => {

    const dispatch = useAppDispatch();
    useEffect(() => dispatch(fetchTasks(todo.id)), []);

    const tasks = useSelector<AppStoreType, TaskListType>(state => state.task);

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
        <div className={`task__wrapper ${todo.entityStatus === 'loading' ? 'loading' : ''}`}>
            <AddTask todoId={todo.id} title={todo.title} />
            <div className="task__content">
                <SortTask todoId={todo.id} filter={todo.filter} />
                <ListTask tasks={taskLists} />
            </div>
        </div>
    )
}