import {useAppSelector} from '../../../app/hooks';
import React, {useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {FormControl, Grid} from '@mui/material';
import {RegisterForm} from './Form/RegisterForm';
import {selectorIsAppInit} from '../../../app/app.selector';
import {selectorIsRegistered} from '../auth.selector';

export const Register = () => {
    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const navigate = useNavigate();

    const isMadeRegister: boolean = useAppSelector(selectorIsRegistered);

    useEffect(() => {
        if (isMadeRegister) navigate('/login');
        if (isAppInit) navigate('/pack');
    }, [isMadeRegister]);

    return (
        <Grid container justifyContent="center" marginTop={5}>
            <Grid item justifyContent="center">
                <div>Sign Up</div>
                <FormControl>
                    <RegisterForm/>
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/login'}>Sign In</NavLink>
            </Grid>
        </Grid>
    );
};
