import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}°C`;
}

export const RangeSlider = () => {
    const [value, setValue] = useState<number[]>([1, 20]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div>
            <p>Number of cards</p>
            <Box sx={{ width: 200 }}>
                <Slider getAriaLabel={() => 'Temperature range'} value={value} onChange={handleChange} valueLabelDisplay="auto" getAriaValueText={valuetext} />
            </Box>
        </div>
    );
};
