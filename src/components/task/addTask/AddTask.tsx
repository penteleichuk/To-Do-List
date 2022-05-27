import { KeyboardEvent } from 'react'
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { ToDoButton } from '../../editableButton/ToDoButton';
import React from 'react';
import { fetchAddTask } from '../../../pages/sheet/s2-bll/thunks/taskThunks';
import { fetchDeleteTodo } from '../../../pages/sheet/s2-bll/thunks/toDoThunks';
import './AddTask.css'

type AddTaskPropsType = {
    todoId: string
    title: string
}

export const AddTask = React.memo(({ todoId, title }: AddTaskPropsType) => {
    const dispatch = useAppDispatch();
    const [values, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickHandler = () => {
        if (values.length > 2) {
            dispatch(fetchAddTask(todoId, values));
            setTitle('');
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    }

    const onClickRemoveSchedule = (todoId: string) => {
        dispatch(fetchDeleteTodo(todoId));
    };

    return (
        <div className="task-add">
            <div className="task-add__wrapper">
                <div className="task-add__form">
                    <input
                        type="text"
                        placeholder='Add task...'
                        value={values}
                        onChange={onChangeTitle}
                        onKeyPress={onKeyPressHandler}
                        className="task-add__input" />

                    {values.length > 2 && <span className="task-add__submit" onClick={onClickHandler}><FaCheck /></span>}
                </div>
                <div className='task-add__remove' onClick={() => onClickRemoveSchedule(todoId)}><FaTrashAlt /></div>
            </div>
            <ToDoButton todoId={todoId} title={title} />
        </div>
    )
});