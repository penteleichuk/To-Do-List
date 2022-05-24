import { SortPropsType } from "../renderTask/RenderTask";
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegCalendarMinus } from 'react-icons/fa';
import './SortTask.css'

type SortTaskPropsType = {
    setSort: (type: SortPropsType) => void
    sort: SortPropsType
}

export const SortTask = ({ setSort, sort }: SortTaskPropsType) => {
    return (
        <div className="task-nav">
            <div className={`task-nav__item ${sort === 'all' ? 'active' : ''}`} onClick={() => setSort('all')}>
                <div className="task-nav__title">
                    All
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarAlt />
                </div>
            </div>
            <div className={`task-nav__item ${sort === 'active' ? 'active' : ''}`} onClick={() => setSort('active')}>
                <div className="task-nav__title">
                    Active
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarCheck />
                </div>
            </div>
            <div className={`task-nav__item ${sort === 'completed' ? 'active' : ''}`} onClick={() => setSort('completed')}>
                <div className="task-nav__title">
                    Completed
                </div>
                <div className="task-nav__icon">
                    <FaRegCalendarMinus />
                </div>
            </div>
        </div>
    )
}