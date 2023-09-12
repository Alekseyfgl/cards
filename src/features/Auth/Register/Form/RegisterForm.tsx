import { FormControl, FormGroup, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRegisterDto } from '../../auth.api.interfaces';
import { authThunks } from '../../auth.slice';
import { useAppDispatch } from '../../../../app/hooks';
import { emailValidate } from 'common/utils/validationFormRules/email.validate';
import { confirmPasswordValidate, passwordValidate } from 'common/utils/validationFormRules/password.validate';
import { appActions } from '../../../../app/app.slice';
import { MSG_AUTH, MSG_BTN } from '../../../../common/utils/constans/app-messages.const';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSentRequest, setIsSentRequest] = useState(false);
    const handleClickShowPassword = (): void => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => event.preventDefault();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterDto & { confirmPassword: string }>();
    const onSubmit = (data: IRegisterDto) => {
        registerHandler(data);
    };
    const registerHandler = (registerDto: IRegisterDto) => {
        setIsSentRequest(true);
        dispatch(authThunks.register(registerDto))
            .unwrap()
            .then((r) => {
                dispatch(appActions.setDone({ done: MSG_AUTH.REGISTERED_SUCCESS(r.addedUser.email) }));
                navigate('/login');
            })
            .finally(() => setIsSentRequest(false));
    };

    // console.log(watch()); log input values
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <TextField label="Email" margin="normal" {...register('email', emailValidate)} error={!!errors.email} helperText={errors.email?.message} />
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
                <SendRequestButton isSentRequest={isSentRequest}>{MSG_BTN.REGISTRATION}</SendRequestButton>
            </FormGroup>
        </form>
    );
};
