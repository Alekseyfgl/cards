import { useAppDispatch, useAppSelector } from './hooks';
import React, { useEffect } from 'react';
import { Counter } from '../features/Counter/Counter';
import { ResponsiveAppBar } from '../features/Header/Header';
import { CircularIndeterminate } from '../features/Loader/Loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';
import { GlobalError } from '../common/components/GlobalError/GlobalError';
import { authThunks } from '../features/Auth/auth.slice';

const App = () => {
    const isLoading = useAppSelector((state) => state.app.isLoadingApp);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(authThunks.me({}));
    }, []);

    if (isLoading) {
        return <CircularIndeterminate />;
    }

    return (
        <div>
            <GlobalError />
            <ResponsiveAppBar />
            <Routes>
                <Route path={'/'} element={<Counter />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/404'} element={<div>Not found</div>} />
                <Route path={'*'} element={<Navigate to={'/404'} />} />
            </Routes>
        </div>
    );
};

export default App;
