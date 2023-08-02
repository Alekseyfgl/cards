import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { FormControl, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginForm } from './Form/LoginForm';
import { selectorIsRegistered } from '../auth.selector';
import { authActions } from '../auth.slice';
import { selectorIsAppInit } from '../../../app/app.selector';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const isMadeRegister: boolean = useAppSelector(selectorIsRegistered);

    useEffect(() => {
        if (isAppInit) navigate('/pack');
        if (isMadeRegister) dispatch(authActions.setIsMadeRegister({ isRegistered: false }));
    }, [isAppInit, isMadeRegister]);

    return (
        <Grid container justifyContent="center">
            <Grid item justifyContent="center">
                <div>Sign in</div>
                <FormControl>
                    <LoginForm />
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/register'}>Sign Up</NavLink>
            </Grid>
        </Grid>
    );
};
