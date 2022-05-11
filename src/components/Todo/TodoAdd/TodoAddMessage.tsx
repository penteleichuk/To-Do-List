import React, {useEffect} from "react";

export type TodoAddMessagePropsType = {
    type: null | "error" | "success"
    message: string | null
    setMessage?: any
}

export const TodoAddMessage = ({message, type, ...props}: TodoAddMessagePropsType) => {
    useEffect(() => {
        const timer = setTimeout(() => props.setMessage({type: null, message: null}), 1500);
        return () => clearTimeout(timer);
    });

    let classNameMessage = 'todo-add__message';

    if (type === 'error') {
        classNameMessage = 'todo-add__message todo-add__message-error';
    } else if (type === 'success') {
        classNameMessage = 'todo-add__message todo-add__message-success';
    }

    return (
        <div className={classNameMessage}>{message}</div>
    )
}