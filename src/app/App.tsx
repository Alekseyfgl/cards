import { useAppDispatch, useAppSelector } from './hooks';
import React, { useEffect } from 'react';
import { Counter } from '../features/Counter/Counter';
import { ResponsiveAppBar } from '../features/Header/Header';
import { CircularIndeterminate } from '../features/Loader/Loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';
import { GlobalNotify } from '../common/components/GlobalNotify/GlobalNotify';
import { authThunks } from '../features/Auth/auth.slice';

export const App = () => {
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
            <GlobalNotify />
            <ResponsiveAppBar />
            <Routes>
                <Route path={'/'} element={<Counter />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/404'} element={<div>Not found</div>} />
                <Route path={'*'} element={<Navigate to={'/404'} />} />
                {/*<Route path={'/users/:userId/:messageId'} element={<User />} />*/}
            </Routes>
        </div>
    );
};

// const User = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const params = Object.fromEntries(searchParams);
//     console.log(params);
//     setSearchParams({ a: 'b' });
//     return <div>hi</div>;
// };
