import React from "react";
import { DesignPropsType } from "../../../app/App";
import './TodoSwitch.css';

export const TodoSwitch = (props: DesignPropsType) => {
    const styleLight = props.style === 'light' ? "todo-switch__btn todo-switch__light active" : "todo-switch__btn todo-switch__light";
    const styleDark = props.style === 'dark' ? "todo-switch__btn todo-switch__dark active" : "todo-switch__btn todo-switch__dark";

    return (
        <div className="todo-switch">
            <span className={styleLight} onClick={() => props.changeStyle('light')}>Light</span>
            <span className={styleDark} onClick={() => props.changeStyle('dark')}>Dark</span>
        </div>
    )
}