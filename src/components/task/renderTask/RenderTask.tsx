import React from "react";
import { useEffect } from "react";
import { AddTask } from "../addTask/AddTask";
import { ListTask } from '../listTask/ListTask';
import { SortTask } from "../sortTask/SortTask";
import { TaskStatuses } from "../../../constants/task";
import { ToDoListType } from "../../../pages/sheet/s2-bll/state/toDoInitState";
import { TaskListType } from "../../../pages/sheet/s2-bll/state/taskInitState";
import { useSelector } from "react-redux";
import { AppStoreType } from "../../../app/s2-bll/store";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Progress } from "../../progress/Progress";
import { fetchTasks } from "../../../pages/sheet/s2-bll/thunks/taskThunks";
import './RenderTask.css';

export type SortPropsType = 'all' | 'active' | 'completed';

export const RenderTask = React.memo(({ todo }: { todo: ToDoListType }) => {

    const tasks = useSelector<AppStoreType, TaskListType>(state => state.task);
    const dispatch = useAppDispatch();

    useEffect(() => dispatch(fetchTasks(todo.id)), []);

    let sortTasks = tasks[todo.id];

    if (todo.filter === 'completed') {
        sortTasks = tasks[todo.id].filter(t => t.status === TaskStatuses.Completed)
    }

    if (todo.filter === 'active') {
        sortTasks = tasks[todo.id].filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div className={`task__wrapper ${(todo.entityStatus === 'loading' && !tasks[todo.id].length) ? 'loading' : ''}`}>
            <AddTask todoId={todo.id} title={todo.title} />
            <div className="task__content">
                <Progress enabled={todo.entityStatus === 'loading' && tasks[todo.id].length > 0} />
                <SortTask todoId={todo.id} filter={todo.filter} />
                <ListTask tasks={sortTasks} />
            </div>
        </div>
    )
});