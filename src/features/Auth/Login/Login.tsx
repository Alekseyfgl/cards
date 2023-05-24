import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions, authThunks } from '../auth.slice';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MSG_VALIDATE } from '../../../common/constans/constans';
import { ILoginDto } from '../auth.api.interfaces';
import { SendRequestButton } from '../../../common/components/ButtonSendRequest/SendRequestButton';

const emailValidate = {
    required: MSG_VALIDATE.REQUIRED('Email'),
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: MSG_VALIDATE.INCORRECT('email')
    }
} as const;

const passwordValidate = {
    required: MSG_VALIDATE.REQUIRED('Password'),
    minLength: {
        value: 8,
        message: MSG_VALIDATE.PASSWORD_LENGTH
    }
} as const;

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSentRequest, setIsSentRequest] = useState(false);
    const isAppInit: boolean = useAppSelector((state) => state.app.isAppInit);
    const navigate = useNavigate();
    const userEmail = useAppSelector((state) => state.auth?.profile?.email);
    const isMadeRegister = useAppSelector((state) => state.auth.isRegistered);
    const dispatch = useAppDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ILoginDto>();
    const onSubmit = (data: ILoginDto) => {
        loginHandler(data);
    };
    const loginHandler = (loginDto: ILoginDto) => {
        setIsSentRequest(true);
        dispatch(authThunks.login(loginDto)).finally(() => {
            setIsSentRequest(false);
        });
    };

    useEffect(() => {
        if (isAppInit) navigate('/');
        if (isMadeRegister) dispatch(authActions.setIsMadeRegister({ isRegistered: false }));
    }, [isAppInit]);

    // console.log(watch()); log input values

    return (
        <Grid container justifyContent='center' marginTop={5}>
            <Grid item justifyContent='center'>
                <div>Sign in</div>
                <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField
                                label='Email'
                                margin='normal'
                                {...register('email', emailValidate)}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <FormControl margin='normal'>
                                <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                <OutlinedInput
                                    {...register('password', passwordValidate)}
                                    id='outlined-adornment-password'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Password'
                                    error={!!errors.password}
                                />
                                {!!errors.password && (
                                    <FormHelperText error id='accountId-error'>
                                        {errors.password?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox {...register('rememberMe')} />}
                            />
                            <SendRequestButton isSentRequest={isSentRequest}>
                                Login
                            </SendRequestButton>
                            {/*<LoadingButton type='submit' variant='contained' color='primary' loading={isSentRequest}>*/}
                            {/*    Login*/}
                            {/*</LoadingButton>*/}
                        </FormGroup>
                    </form>
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/register'}>Sign Up</NavLink>
            </Grid>
        </Grid>
    );
};
