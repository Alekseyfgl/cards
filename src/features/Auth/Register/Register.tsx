import { useAppSelector } from '../../../app/hooks';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormControl, Grid } from '@mui/material';
import { RegisterForm } from './Form/RegisterForm';

export const Register = () => {
    const isAppInit: boolean = useAppSelector((state) => state.app.isAppInit);
    const navigate = useNavigate();

    const isMadeRegister: boolean = useAppSelector((state) => state.auth.isRegistered);

    useEffect(() => {
        if (isMadeRegister) navigate('/login');
        if (isAppInit) navigate('/');
    }, [isMadeRegister]);

    return (
        <Grid container justifyContent="center" marginTop={5}>
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
