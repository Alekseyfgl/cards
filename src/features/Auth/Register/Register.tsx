import { useAppSelector } from '../../../app/hooks';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormControl, Grid } from '@mui/material';
import { RegisterForm } from './Form/RegisterForm';
import { selectorIsAppInit } from '../../../app/app.selector';

export const Register = () => {
    const isAppInit: boolean = useAppSelector(selectorIsAppInit);
    const navigate = useNavigate();
    const [isMadeAccount, setIsMadeAccount] = useState(false);

    // const isMadeRegister: boolean = useAppSelector(selectorIsRegistered);

    useEffect(() => {
        if (isMadeAccount) navigate('/login');
        if (isAppInit) navigate('/pack');
    }, [isMadeAccount]);

    return (
        <Grid container justifyContent="center">
            <Grid item justifyContent="center">
                <div>Sign Up</div>
                <FormControl>
                    <RegisterForm setIsMadeAccount={setIsMadeAccount} />
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/login'}>Sign In</NavLink>
            </Grid>
        </Grid>
    );
};
