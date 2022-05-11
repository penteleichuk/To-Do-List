import React from "react";
import './TaskList.css'
import {TasksPropsType} from "../../Todo/TodoMain/Todo";


export type TaskListPropsType = {
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    checkedTask: (id: string) => void
}

export const TaskList = ({removeTask, checkedTask, ...props}: TaskListPropsType) => {
    return (
        <div className="task-list">
            {
                props.tasks.map(t => {
                    return <div key={t.id} className={t.isDone ? 'task-list__item task-list__item-active' : 'task-list__item'} >
                        <div className="task-list__body" onClick={() => checkedTask(t.id)}>
                            <input type="checkbox" checked={t.isDone} onChange={() => {}}/>
                            <div className="task-list__title">{t.title}</div>
                        </div>
                        <div onClick={() => removeTask(t.id)} className="task-list__remove">-</div>
                    </div>
                })
            }
        </div>
    )
}