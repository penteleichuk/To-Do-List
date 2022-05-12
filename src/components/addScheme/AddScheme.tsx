import { useState, KeyboardEvent, ChangeEvent } from "react";
import { TodoAddMessage, TodoAddMessagePropsType } from "./TodoAddMessage";
import './AddScheme.css';

type TodoAddPropsType = {
    addSchedule: (title: string) => void
}

export const AddScheme = ({ addSchedule }: TodoAddPropsType) => {
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<TodoAddMessagePropsType>({ type: null, message: null });

    const onClickAddSchedule = () => {
        if (title.length > 2) {
            addSchedule(title);
            setTitle('');
            setMessage({ type: 'success', message: 'Success add!' });
        } else {
            setMessage({ type: 'error', message: 'At least 3 characters !' });
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value.trim());
        setMessage({ type: null, message: null });
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddSchedule();
        }
    }

    return (
        <div className="todo-add">
            <input placeholder='Add new schedule...' type="text" className="todo-add__input" value={title}
                onKeyPress={onKeyPressHandler} onChange={onChangeHandler} />

            {message.type && <TodoAddMessage type={message.type} message={message.message} setMessage={setMessage} />}
            {title.length > 2 && <span className="todo-add__submit" onClick={onClickAddSchedule}>+</span>}
        </div>
    )
}