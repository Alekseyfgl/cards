import { useAppDispatch, useAppSelector } from './hooks';
import React, { useEffect } from 'react';
import { Counter } from '../features/Counter/Counter';
import { appActions } from './app.slice';
import { ResponsiveAppBar } from '../features/Header/Header';
import { CircularIndeterminate } from '../features/Loader/Loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';

const App = () => {
    const isLoading = useAppSelector((state) => state.app.isLoadingApp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(appActions.setIsLoadingApp({ isLoadingApp: false }));
        }, 1000);
    }, []);

    if (isLoading) {
        return <CircularIndeterminate />;
    }

    return (
        <div>
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
