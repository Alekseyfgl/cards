import s from './packs.module.scss';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { packThunks } from '../packs.slice';
import { selectorIsAppInit } from '../../../app/app.selector';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Order, THeaderPack } from './HeaderPack/THeaderPack';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { PaginationCustom } from '../PaginationCustom/Pagination';
import { getComparator, stableSort } from '../../../common/utils/functions/sorts.function';

export interface Data {
    _id: string;
    name: string;
    cards: number;
    updated: string;
    created: string;
    actions: string;
}

const rows: Data[] = [
    { _id: '1', name: 'aaaaaa', cards: 1, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '2', name: 'bbbbbb', cards: 2, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '3', name: 'zzzzzz', cards: 3, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '4', name: 'ccccc', cards: 4, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '5', name: 'dddddd', cards: 5, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '6', name: 'dddddd', cards: 5, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '7', name: 'dddddd', cards: 5, created: 'yesterday', updated: 'today', actions: 'actions' },
    { _id: '8', name: 'dddddd', cards: 5, created: 'yesterday', updated: 'today', actions: 'actions' },
];

export const Packs = () => {
    const dispatch = useAppDispatch();
    const isAppInitialized: boolean = useAppSelector(selectorIsAppInit);
    useEffect(() => {
        dispatch(packThunks.getAllPacks());
    }, []);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('name');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: MouseEvent<unknown>, _id: string) => {
        console.log(_id);
        const selectedIndex = selected.indexOf(_id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage]
    );

    if (!isAppInitialized) return <Navigate to={'/login'} />;
    return (
        <Container maxWidth="lg">
            <h1 className={s.pack}>Packs</h1>

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <THeaderPack order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row._id)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row._id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" align={'center'}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.cards}</TableCell>
                                            <TableCell align="center">{row.created}</TableCell>
                                            <TableCell align="center">{row.updated}</TableCell>
                                            <TableCell align="center">{row.actions}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <PaginationCustom
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={rows.length}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Container>
    );
};
