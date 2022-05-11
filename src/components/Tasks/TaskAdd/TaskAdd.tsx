import {KeyboardEvent} from 'react'
import {ChangeEvent, useState} from "react";
import './TaskAdd.css'
import {TasksPropsType} from "../../Todo/TodoMain/Todo";

type TaskAddPropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    addTask: (title: string) => void
    removeSchedule: (id: string) => void
}

export const TaskAdd = ({addTask, ...props}: TaskAddPropsType) => {
    const [title, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickHandler = () => {
        if (title.length > 2) {
            addTask(title);
            setTitle('');
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }

    const onClickRemoveSchedule = (id: string) => props.removeSchedule(id);

    return (
        <div className="task-add">
            <div className="task-add__title">
                {props.title}
                <div className='task-add__remove' onClick={() => onClickRemoveSchedule(props.id)}>X</div>
            </div>
            <div className="task-add__form">
                <input type="text" placeholder='Add task...' value={title} onChange={onChangeTitle}
                       onKeyPress={onKeyPressHandler} className="task-add__input"/>
                {title.length > 2 && <span className="task-add__submit" onClick={onClickHandler}>+</span>}
            </div>
        </div>
    )
}