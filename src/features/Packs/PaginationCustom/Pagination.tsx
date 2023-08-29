import * as React from 'react';
import { FC } from 'react';
import { Pagination } from '@mui/material';
import s from './styles.module.scss';

export interface PaginationProps {
    totalCount: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    disabled: boolean;
}

export const PaginationCustom: FC<PaginationProps> = (props) => {
    const { totalCount, rowsPerPage, page, disabled, handleChangePage } = props;
    console.log('disabled', disabled);
    return (
        <div className={s.container}>
            <Pagination
                disabled={disabled}
                count={Math.ceil(totalCount / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
                size={'medium'}
            />
        </div>
    );
};
