import { DesignType } from '../../../app/s2-bll/state/appState';
import { changeTheme } from '../../../app/s2-bll/thunks/thunks';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import './TodoSwitch.css';

type TodoSwitchPropsType = {
    design: DesignType
}

export const TodoSwitch = ({ design }: TodoSwitchPropsType) => {
    const dispatch = useAppDispatch();

    const styleLight = design === 'light' ? "todo-switch__btn todo-switch__light active" : "todo-switch__btn todo-switch__light";
    const styleDark = design === 'dark' ? "todo-switch__btn todo-switch__dark active" : "todo-switch__btn todo-switch__dark";

    const handleChangeTheme = (theme: DesignType) => {
        dispatch(changeTheme(theme));
    }
    return (
        <div className="todo-switch">
            <span className={styleLight} onClick={() => handleChangeTheme('light')}>Light</span>
            <span className={styleDark} onClick={() => handleChangeTheme('dark')}>Dark</span>
        </div>
    )
}