import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/auth/login/s1-ui/LoginPage';
import { SheetPage } from '../../pages/sheet/s1-ui/SheetPage';
import { DesignType } from '../s2-bll/state/appState';
import { AppStoreType } from '../s2-bll/state/store';
import './App.css';

function App() {
    const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);

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
