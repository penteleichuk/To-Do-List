import React from 'react';
import { useSelector } from 'react-redux';
import { changeAppTheme } from '../../app/s2-bll/reducers/appReducer';
import { DesignType } from '../../app/s2-bll/state/appState';
import { AppStoreType } from '../../app/s2-bll/state/store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import './ChangeTheme.css';

export const ChangeTheme = React.memo(() => {

    const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);
    const dispatch = useAppDispatch();

    const styleLight = design === 'light' ? "todo-switch__btn todo-switch__light active" : "todo-switch__btn todo-switch__light";
    const styleDark = design === 'dark' ? "todo-switch__btn todo-switch__dark active" : "todo-switch__btn todo-switch__dark";

    const changeThemeHandle = (theme: DesignType) => {
        dispatch(changeAppTheme(theme));
    }
    return (
        <div className="todo-switch">
            <span className={styleLight} onClick={() => changeThemeHandle('light')}>Light</span>
            <span className={styleDark} onClick={() => changeThemeHandle('dark')}>Dark</span>
        </div>
    )
});