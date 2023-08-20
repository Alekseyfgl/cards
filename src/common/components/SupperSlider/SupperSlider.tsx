import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { InputNumber } from '../InputNumber/InputNumber';
import s from './styles.module.scss';
import { useDebounce } from '../../utils/hooks';

interface RangeSliderProps {
    amountCards: number[];
    setAmountCards: (amountCards: number[]) => void;
    disabled: boolean;
}

export const RangeSlider: FC<RangeSliderProps> = (props) => {
    const { setAmountCards, amountCards, disabled } = props;

    const [value, setValue] = useState<number[]>(amountCards);
    const [init, setInit] = useState(false);
    const debouncedValue = useDebounce<number[]>(value, 1000);

    useEffect(() => {
        if (init) {
            setAmountCards(value);
            // setInit(false);
        }
    }, [debouncedValue]);

    useEffect(() => {
        setValue(amountCards);
    }, [amountCards]);

    const handleChange = (event: unknown, newValue: number | number[]) => {
        !init && setInit(true);
        setValue(newValue as number[]);
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

    return (
        <div>
            <p>Number of cards</p>
            <div className={s.container}>
                <InputNumber disabled={disabled} value={value[0]} onChange={changeMinValue} marginRight={2} />
                <Slider disabled={disabled} value={value} onChange={handleChange} valueLabelDisplay="auto" sx={{ width: 200 }} />
                <InputNumber disabled={disabled} value={value[1]} onChange={changeMaxValue} marginLeft={2} />
            </div>
        </div>
    );
};
