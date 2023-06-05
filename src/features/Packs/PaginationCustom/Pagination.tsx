import * as React from 'react';
import { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';

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
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};
