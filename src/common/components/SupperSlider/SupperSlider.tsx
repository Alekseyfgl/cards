import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { InputNumber } from '../InputNumber/InputNumber';
import s from './styles.module.scss'

export const RangeSlider = () => {
    const [value, setValue] = useState<number[]>([1, 20]);
    const [firstValue, setFirstValue] = useState(value[0]);
    const [secondValue, setSecondValue] = useState(value[1]);


    useEffect(() => {
        setValue([firstValue, secondValue]);
    }, [firstValue, secondValue]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div>
            <p>Number of cards</p>
            <div className={s.container}>
                <InputNumber value={value[0]} onChange={setFirstValue} />
                <Slider value={value}
                        onChange={handleChange}
                        valueLabelDisplay='auto'
                        sx={{width: 200}}
                />
                <InputNumber value={value[1]} onChange={setSecondValue} />
            </div>
        </div>
    );
};



