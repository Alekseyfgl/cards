import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ILoginDto, IRegisterDto } from '../auth.api.interfaces';

import { authThunks } from '../auth.slice';
import { MSG_VALIDATE } from '../../../common/constans/constans';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
import {
    FormControl,
    FormGroup,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { watch } from 'fs/promises';
import Button from '@mui/material/Button';

const MIN_LENGTH = 8;
const emailValidate = {
    required: MSG_VALIDATE.REQUIRED('Email'),
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: MSG_VALIDATE.INCORRECT('email'),
    },
} as const;

const passwordValidate = {
    required: MSG_VALIDATE.REQUIRED('Password'),
    minLength: {
        value: MIN_LENGTH,
        message: MSG_VALIDATE.PASSWORD_LENGTH,
    },
} as const;

const confirmPasswordValidate = {
    required: MSG_VALIDATE.REQUIRED('Confirm Password'),
    minLength: {
        value: MIN_LENGTH,
        message: MSG_VALIDATE.PASSWORD_LENGTH,
    },
    validate: (value: string, values: any) => value === values.password || 'Passwords do not match',
} as const;

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const dispatch = useAppDispatch();

    const isAppInitialized: boolean = useAppSelector((state) => state.app.isAppInitialized);

    const loginHandler = (registerDto: IRegisterDto) => {
        dispatch(authThunks.register(registerDto));
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterDto & { confirmPassword: string }>();

    const onSubmit = (data: IRegisterDto) => {
        loginHandler(data);
    };

    // console.log(watch()); log input values

    if (isAppInitialized) return <Navigate to={'/'} />;

    return (
        <Grid container justifyContent="center" marginTop={5}>
            <Grid item justifyContent="center">
                <div>Sign Up</div>
                <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...register('email', emailValidate)}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <FormControl margin="normal">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register('password', passwordValidate)}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    error={!!errors.password}
                                />
                                {!!errors.password && (
                                    <FormHelperText error id="accountId-error">
                                        {errors.password?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register('confirmPassword', confirmPasswordValidate)}
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="ConfirmPassword"
                                    error={!!errors.confirmPassword}
                                />
                                {!!errors.confirmPassword && (
                                    <FormHelperText error id="accountId-error">
                                        {errors.confirmPassword?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
                <div>Already have an account?</div>
                <NavLink to={'/login'}>Sign In</NavLink>
            </Grid>
        </Grid>
    );
};
