import React from "react";
import { useEffect } from "react";
import {MessagePropsType} from "./AddScheme";

export type TodoAddMessagePropsType = MessagePropsType & {
    setMessage: ({ type, message}: MessagePropsType) => void
}

export const TodoAddMessage = React.memo(({ message, type, setMessage }: TodoAddMessagePropsType) => {
    useEffect(() => {
        const timer = setTimeout(() => setMessage({ type: null, message: null }), 1500);
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
})