
import { TaskStatuses } from "../../../constants/task";
import { TaskType } from "../../../pages/sheet/s2-bll/state/taskInitState";
import './ListTask.css'


export type ListTaskPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    checkedTask: (id: string) => void
}

export const ListTask = ({ tasks, removeTask, checkedTask, ...props }: ListTaskPropsType) => {
    return (
        <div className="task-list">
            {
                tasks.map(t => {
                    return <div key={t.id} className={t.status === TaskStatuses.Completed ? 'task-list__item task-list__item-active' : 'task-list__item'} >
                        <div className="task-list__body" onClick={() => checkedTask(t.id)}>
                            <input type="checkbox" checked={t.status === TaskStatuses.Completed} onChange={() => { }} />
                            <div className="task-list__title">{t.title}</div>
                        </div>
                        <div onClick={() => removeTask(t.id)} className="task-list__remove">-</div>
                    </div>
                })
            }
        </div>
    )
}