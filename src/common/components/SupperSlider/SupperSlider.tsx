import * as React from 'react';
import { FC, useState } from 'react';
import Slider from '@mui/material/Slider';
import { InputNumber } from '../InputNumber/InputNumber';
import s from './styles.module.scss';
import { useDebounce } from '../../utils/hooks';
import { Nullable } from '../../utils/optionalTypes/optional.types';

interface RangeSliderProps {
    amountCards: number[];
    setAmountCards: (amountCards: number[]) => void;
}

export const RangeSlider: FC<RangeSliderProps> = (props) => {
    const { setAmountCards, amountCards } = props;
    const [value, setValue] = useState<number[]>([1, 100]);
    const debouncedValue = useDebounce<Nullable<number[]>>(value, 500);

    const handleChange = (event: unknown, newValue: number | number[]) => {
        setValue(newValue as number[]);
        // setAmountCards(newValue as number[]);
    };

    const changeMinValue = (minValue: number) => {
        if (minValue < value[1]) {
            handleChange({}, [minValue, value[1]]);
        } else {
            handleChange({}, [value[1], minValue]);
        }
    };

    const changeMaxValue = (maxValue: number) => {
        if (maxValue > value[0]) {
            handleChange({}, [value[0], maxValue]);
        } else {
            handleChange({}, [maxValue, value[0]]);
        }
    };

    // useEffect(() => {
    //     console.log('debouncedValue');
    //     // if (value !== '') {
    //     setAmountCards(value);
    //     // }
    // }, [debouncedValue]);

    return (
        <div>
            <p>Number of cards</p>
            <div className={s.container}>
                <InputNumber value={value[0]} onChange={changeMinValue} />
                <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" sx={{ width: 200 }} />
                <InputNumber value={value[1]} onChange={changeMaxValue} />
            </div>
        </div>
    );
};
