import { useAppSelector } from '../../../app/hooks';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormControl, Grid } from '@mui/material';
import { RegisterForm } from './Form/RegisterForm';
import { selectorIsAppInit } from '../../../app/app.selector';

export const Register = () => {
    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAppInit) navigate('/packs');
    }, []);

    return (
        <Grid container justifyContent="center">
            <Grid item justifyContent="center">
                <div>Sign Up</div>
                <FormControl>
                    <RegisterForm />
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/login'}>Sign In</NavLink>
            </Grid>
        </Grid>
    );
};
