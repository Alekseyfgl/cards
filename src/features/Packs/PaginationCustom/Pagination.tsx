import * as React from 'react';
import { ChangeEvent, FC } from 'react';
import { Pagination } from '@mui/material';
import s from './styles.module.scss';

export interface PaginationProps {
    totalCount: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PaginationCustom: FC<PaginationProps> = (props) => {
    const { totalCount, rowsPerPage, page, handleChangeRowsPerPage, handleChangePage } = props;
    return (
        <div className={s.container}>
            <Pagination count={Math.ceil(totalCount / rowsPerPage)} page={page} onChange={handleChangePage} showFirstButton showLastButton size={'medium'} />
        </div>
    );
};
