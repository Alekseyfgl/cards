import { useAppDispatch, useAppSelector } from './hooks';
import React, { useEffect } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Auth/Login/Login';
import { Register } from '../features/Auth/Register/Register';
import { authThunks } from '../features/Auth/auth.slice';
import { selectorIsLoadingApp } from './app.selector';
import { ListPacks } from '../features/Packs/ListPacks/ListPacks';
import { RequireAuth } from '../common/components/RequerAuth/RequireAuth';
import { Layout } from '../common/components/Layout/Layout';
import { CardsList } from '../features/Cards/Card/CardsList';
import { CircularIndeterminate } from '../common/components/Loader/Loader';

export const App = () => {
    const isLoading = useAppSelector(selectorIsLoadingApp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authThunks.me({}));
    }, [dispatch]);

    if (isLoading) {
        return <CircularIndeterminate />;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to={'/pack'} />} />
                    <Route
                        path="pack"
                        element={
                            <RequireAuth>
                                <ListPacks />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="card/:id"
                        element={
                            <RequireAuth>
                                <CardsList />
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/404"
                        element={
                            <div>
                                <p>Not found</p>
                                <NavLink to={'/pack'}>Go to the main age</NavLink>
                            </div>
                        }
                    />
                    <Route path="*" element={<Navigate to={'/404'} />} />
                </Route>
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
