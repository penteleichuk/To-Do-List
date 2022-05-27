import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LoadingPage } from '../../components/loading/LoadingPage';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { LoginPage } from '../../pages/auth/login/s1-ui/LoginPage';
import { SheetPage } from '../../pages/sheet/s1-ui/SheetPage';
import { DesignType } from '../s2-bll/state/appState';
import { AppStoreType } from '../s2-bll/state/store';
import { initApp } from '../s2-bll/thunks/thunks';
import './App.css';

function App() {

    const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);
    const isInit = useSelector<AppStoreType, boolean>(state => state.app.initialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initApp());
    }, []);

    if (!isInit) {
        return <LoadingPage design={design} />
    }

    return (
        <div className={design}>
            <Routes>
                <Route path='/' element={<SheetPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<div>Error</div>} />
            </Routes>
        </div>
    );
}

export default App;
