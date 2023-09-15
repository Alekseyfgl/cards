import { useAppDispatch, useAppSelector } from './hooks';
import React, { useEffect } from 'react';
import { authThunks } from '../features/Auth/auth.slice';
import { selectorIsLoadingApp } from './app.selector';
import { CircularIndeterminate } from '../common/components/Loader/Loader';
import { Router } from '../routes/Routes';

export const App = () => {
    const isLoading = useAppSelector(selectorIsLoadingApp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authThunks.me({}));
    }, [dispatch]);

    if (isLoading) {
        return <CircularIndeterminate />;
    }

    return <Router />;
};
