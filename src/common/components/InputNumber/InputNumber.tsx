import { styled } from '@mui/styles';
import { TextField } from '@mui/material';
import * as React from 'react';
import { FC, memo } from 'react';

interface InputNumberProps {
    width?: number;
    height?: number;
    value: number;
    onChange: (value: number) => void;
    marginRight?: number;
    marginLeft?: number;
    disabled: boolean;
}

const NoArrowsNumberInput = styled(TextField)({
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
    },
    '& input[type=number]': {
        '-moz-appearance': 'textfield',
        textAlign: 'center',
        height: '23px',
        padding: '8.5px 0',
    },
});

export const InputNumber: FC<InputNumberProps> = memo((props) => {
    const { value, height = 'auto', width = 60, marginLeft = 0, marginRight = 0, onChange, disabled } = props;

    const handleInputChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let inputValue = +event.currentTarget.value;
        if (inputValue <= 100) {
            onChange(inputValue);
        }
    };
    return (
        <NoArrowsNumberInput
            disabled={disabled}
            value={value.toString()}
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                inputProps: {
                    max: 100,
                },
            }}
            sx={{ width, height, marginRight, marginLeft }}
        />
    );
});
