import { useSelector } from 'react-redux';
import { DesignType } from '../../app/s2-bll/state/appState';
import { AppStoreType } from '../../app/s2-bll/state/store';
import { changeTheme } from '../../app/s2-bll/thunks/thunks';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import './ChangeTheme.css';

export const ChangeTheme = () => {

    const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);
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