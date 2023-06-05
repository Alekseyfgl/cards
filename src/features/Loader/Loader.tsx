import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import s from './styles.module.scss';

export const CircularIndeterminate = () => {
    return (
        <div className={s.container}>
            <CircularProgress size={60} />
        </div>
    );
};
