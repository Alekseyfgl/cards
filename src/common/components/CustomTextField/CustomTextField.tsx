import { TextField } from '@mui/material';
import React, { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { styled } from '@mui/styles';
import { Nullable } from '../../utils/types/optional.types';

interface CustomTextFieldProps {
    value?: Nullable<string>;
    disabled?: boolean;
    label?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    maxLength?: number;
    marginBottom?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    register?: UseFormRegisterReturn<string>;
    startAdornment?: ReactNode;
    placeholder?: string;
    size?: 'small' | 'medium';
}

const StylesTextField = styled(TextField)({});
export const CustomTextField: FC<CustomTextFieldProps> = (props) => {
    const { variant = 'standard', fullWidth = true, maxLength = 50, marginBottom = '0px', startAdornment, placeholder, size = 'medium', ...rest } = props;

    return (
        <StylesTextField
            variant={variant}
            fullWidth={fullWidth}
            InputProps={{ placeholder, startAdornment }}
            inputProps={{ maxLength }}
            size={'small'}
            sx={{ marginBottom }}
            {...rest}
        />
    );
};
