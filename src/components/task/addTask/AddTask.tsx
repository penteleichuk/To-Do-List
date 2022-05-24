import { KeyboardEvent } from 'react'
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchAddTask } from '../../../pages/sheet/s2-bll/reducers/taskReducer';
import { TaskType } from '../../../pages/sheet/s2-bll/state/taskInitState';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import './AddTask.css'

type AddTaskPropsType = {
    id: string
    title: string
    removeSchedule: (id: string) => void
}

export const AddTask = (props: AddTaskPropsType) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickHandler = () => {
        if (title.length > 2) {
            dispatch(fetchAddTask(props.id, title));
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
            <div className="task-add__wrapper">
                <div className="task-add__form">
                    <input type="text" placeholder='Add task...' value={title} onChange={onChangeTitle}
                        onKeyPress={onKeyPressHandler} className="task-add__input" />
                    {title.length > 2 && <span className="task-add__submit" onClick={onClickHandler}><FaCheck /></span>}
                </div>
                <div className='task-add__remove' onClick={() => onClickRemoveSchedule(props.id)}><FaTrashAlt /></div>
            </div>
            <div className="task-add__title">
                {props.title}
            </div>
        </div>
    )
}