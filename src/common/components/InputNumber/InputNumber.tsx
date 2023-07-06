import { styled } from '@mui/styles';
import { TextField } from '@mui/material';
import * as React from 'react';
import { FC, memo } from 'react';

interface InputNumberProps {
    width?: number;
    height?: number;
    value: number;
    onChange: (value: number) => void;
}

const NoArrowsNumberInput = styled(TextField)({
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
    },
    '& input[type=number]': {
        '-moz-appearance': 'textfield',
    },
});

export const InputNumber: FC<InputNumberProps> = memo((props) => {
    const { value, height = 100, width = 60, onChange } = props;

    const handleInputChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let inputValue = +event.currentTarget.value;
        if (inputValue <= 100) {
            onChange(inputValue);
        }
    };
    return (
        <NoArrowsNumberInput
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
            sx={{ width, height }}
        />
    );
});
