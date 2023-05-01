import { useAppDispatch, useAppSelector } from './hooks';
import s from './styles.module.css';
import React, { useEffect } from 'react';
import { Counter } from '../features/counter/Counter';
import { appActions } from './app.slice';
import { ResponsiveAppBar } from '../features/Header/Header';
import { CircularIndeterminate } from '../features/Loader/Loader';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Login } from '../features/auth/Login/Login';
import { Register } from '../features/auth/Register/Register';

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
