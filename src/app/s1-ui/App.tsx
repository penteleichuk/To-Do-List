import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/auth/login/s1-ui/LoginPage';
import { SheetPage } from '../../pages/sheet/s1-ui/SheetPage';
import './App.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<SheetPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<div>Error</div>} />
            </Routes>
        </div>
    );
}

export default App;
