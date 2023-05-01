import { ILoginDto } from '../auth.api.interfaces';
import { useAppDispatch } from '../../../app/hooks';
import { authThunks } from '../auth.slice';
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
    TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const emailValidate = {
    required: 'Email is required',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: ' НЕкоректный емейл',
    },
} as const;

const passwordValidate = {
    required: 'Password is required',
    minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
    },
    maxLength: {
        value: 30,
        message: 'Password must be less than 30 characters',
    },
} as const;

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const loginHandler = (loginDto: LoginForm) => {
        dispatch(authThunks.login(loginDto));
    };

    const dispatch = useAppDispatch();
    // const isLogged = useAppSelector((state) => state.auth.);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit = (data: LoginForm) => {
        loginHandler(data);
    };
    // if (isLogged) {
    //     return <Navigate to={"/"}/>;
    // }

    // console.log(watch()); log input values
    return (
        <Grid container justifyContent="center" marginTop={5}>
            <Grid item justifyContent="center">
                <div>Sign in</div>
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
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox {...register('rememberMe')} />}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    );
};
