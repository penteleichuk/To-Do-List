import { TaskStatuses } from "../../../constants/task";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchRemoveTask } from "../../../pages/sheet/s2-bll/reducers/taskReducer";
import { TaskType } from "../../../pages/sheet/s2-bll/state/taskInitState";
import { FaTimesCircle, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import './ListTask.css'


export type ListTaskPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    checkedTask: (id: string) => void
}

export const ListTask = ({ tasks, removeTask, checkedTask, ...props }: ListTaskPropsType) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = (todoId: string, taskId: string) => {
        dispatch(fetchRemoveTask(todoId, taskId));
    }

    return (

        <div className="task-list">
            <div className="task-list__subtitle">Today</div>
            {
                tasks.map(t =>
                    <div key={t.id} className={`task-list__item ${t.status === TaskStatuses.Completed ? 'task-list__item-active' : ''}`} >
                        <div className="task-list__body" onClick={() => checkedTask(t.id)}>
                            {t.status === TaskStatuses.Completed ? <FaRegCheckCircle /> : <FaRegCircle />}
                            <div className="task-list__title">{t.title}</div>
                        </div>
                        <div className="task-list__remove">
                            <FaTimesCircle onClick={() => removeTaskHandler(t.todoListId, t.id)} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}