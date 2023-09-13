import { TextField } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { styled } from '@mui/styles';

interface CustomTextFieldProps {
    disabled?: boolean;
    label?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    maxLength?: number;
    marginBottom?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn<'name'>;
}

const StylesTextField = styled(TextField)({
    marginBottom: '20px',
});
export const CustomTextField: FC<CustomTextFieldProps> = (props) => {
    const { variant = 'standard', fullWidth = true, maxLength = 50, marginBottom, ...rest } = props;
    return <StylesTextField variant={variant} fullWidth={fullWidth} inputProps={{ maxLength }} sx={{ marginBottom }} {...rest} />;
};
