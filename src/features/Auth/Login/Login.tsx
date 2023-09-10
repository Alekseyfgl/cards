import { useAppSelector } from '../../../app/hooks';
import { FormControl, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginForm } from './Form/LoginForm';
import { selectorIsAppInit } from '../../../app/app.selector';

export const Login = () => {
    const navigate = useNavigate();
    const isAppInit: boolean = useAppSelector(selectorIsAppInit);

    useEffect(() => {
        if (isAppInit) navigate('/packs');
    }, [isAppInit]);

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
