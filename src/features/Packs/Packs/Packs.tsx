import s from './packs.module.scss';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectorIsAppInit } from '../../../app/app.selector';
import { Navigate, useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { THeaderPack } from './HeaderPack/THeaderPack';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { PaginationCustom } from '../PaginationCustom/Pagination';
import { IPack, IPacks, PackQueryTypes, PackSortRequestTypes, PackSortTypes } from '../packs.interfaces';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { selectorCardPacks, selectorPacks } from '../packs.selector';
import { superSortCreator } from '../utils/super-sort';
import { packThunks } from '../packs.slice';
import { createPackQuery, createRowPack } from '../utils/mappers/pack.mapper';

export const Packs = () => {
    const dispatch = useAppDispatch();

    const isAppInitialized: boolean = useAppSelector(selectorIsAppInit);
    const packs: Nullable<IPacks> = useAppSelector(selectorPacks);
    const cardPacks: Optional<IPack[]> = useAppSelector(selectorCardPacks);

    const [sortPacks, setSortPacks] = useState<PackSortRequestTypes>('0name');
    // const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchParams, setSearchParams] = useSearchParams(createPackQuery(page, rowsPerPage, sortPacks));

    useEffect(() => {
        const param: PackQueryTypes = Object.fromEntries(searchParams);
        setSortPacks(param.sortPacks as PackSortRequestTypes);
    }, []);

    useEffect(() => {
        dispatch(packThunks.getAllPacks(searchParams as PackQueryTypes));
    }, [searchParams]);

    const handleRequestSort = (e: MouseEvent<unknown>, property: PackSortTypes) => {
        const prop: PackSortRequestTypes = superSortCreator(property, sortPacks);
        setSearchParams(createPackQuery(page, rowsPerPage, prop));
        setSortPacks(prop);
    };

    // const handleClick = (event: MouseEvent<unknown>, _id: string) => {
    //
    // };

    const onChangePagination = (newPage: number, rowsPerPage: number) => {
        setSearchParams(createPackQuery(newPage, rowsPerPage, sortPacks));
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        onChangePagination(newPage, rowsPerPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        const rowsPerPage: number = +event.target.value;
        setRowsPerPage(rowsPerPage);
        setPage(1);
        onChangePagination(1, rowsPerPage);
    };

    if (!isAppInitialized) return <Navigate to={'/login'} />;
    return (
        <Container maxWidth="lg">
            <h1 className={s.pack}>Packs</h1>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <THeaderPack orderBy={sortPacks} onRequestSort={handleRequestSort} />
                            <TableBody>
                                {cardPacks &&
                                    createRowPack(cardPacks).map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                // onClick={(event) => handleClick(event, row._id as string)}
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

                    {packs && (
                        <PaginationCustom
                            page={packs.page}
                            rowsPerPage={rowsPerPage}
                            totalCount={packs.cardPacksTotalCount}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                </Paper>
            </Box>
        </Container>
    );
};
