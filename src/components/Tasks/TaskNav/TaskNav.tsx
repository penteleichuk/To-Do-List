import {SortPropsType} from "../TaskMain/Task";
import './TaskNav.css'

type TaskNavPropsType = {
    taskLength: boolean
    setSort: (type: SortPropsType) => void
    sort: SortPropsType
}

export const TaskNav = ({taskLength, setSort, sort}: TaskNavPropsType) => {
    return (
        <>
            {
                taskLength && <div className="task-nav">
                    <div className={sort === 'all' ? 'task-nav__item task-nav__item-active' : 'task-nav__item'} onClick={() => setSort('all')}>All</div>
                    <div className={sort === 'active' ? 'task-nav__item task-nav__item-active' : 'task-nav__item'} onClick={() => setSort('active')}>Active</div>
                    <div className={sort === 'completed' ? 'task-nav__item task-nav__item-active' : 'task-nav__item'} onClick={() => setSort('completed')}>Completed</div>
                </div>
            }
        </>
    )
}