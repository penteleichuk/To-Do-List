import { SortPropsType } from "../renderTask/RenderTask";
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegCalendarMinus } from 'react-icons/fa';
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setTodoFiltering } from "../../../pages/sheet/s2-bll/actions/toDoActions";
import React, { useCallback } from "react";
import './SortTask.css'

type SortTaskPropsType = {
    todoId: string;
    filter: SortPropsType;
}

export const SortTask = React.memo(({ todoId, filter }: SortTaskPropsType) => {
    const dispatch = useAppDispatch();

    const filteringHandler = useCallback((filter: SortPropsType) => {
        dispatch(setTodoFiltering(todoId, filter));
    }, [todoId, filter]);

    return (
        <div className="task-nav">
            <div className={`task-nav__item ${filter === 'all' ? 'active' : ''}`} onClick={() => filteringHandler('all')}>
                <div className="task-nav__title">
                    All
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarAlt />
                </div>
            </div>
            <div className={`task-nav__item ${filter === 'active' ? 'active' : ''}`} onClick={() => filteringHandler('active')}>
                <div className="task-nav__title">
                    Active
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarCheck />
                </div>
            </div>
            <div className={`task-nav__item ${filter === 'completed' ? 'active' : ''}`} onClick={() => filteringHandler('completed')}>
                <div className="task-nav__title">
                    Completed
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarMinus />
                </div>
            </div>
        </div>
    )
});