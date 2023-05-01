import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import s from './styles.module.css'

export const CircularIndeterminate = () => {
    return (
        <div className={s.container}>
            <CircularProgress size={60}/>
        </div>
    );
};
