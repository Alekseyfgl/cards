import s from './styles.module.scss';
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
import { PaginationCustom } from '../PaginationCustom/Pagination';
import { IPacks, PackQueryTypes, PackSortRequestTypes, PackSortTypes } from '../packs.interfaces';
import { Nullable } from '../../../common/utils/optionalTypes/optional.types';
import { selectorPacks } from '../packs.selector';
import { superSortCreator } from '../utils/super-sort';
import { packThunks } from '../packs.slice';
import { createPackQuery } from '../utils/mappers/pack.mapper';
import { PackSettings } from '../Settings/PackSettings';
import { BodyPack } from './BodyPack/BodyPack';

export const ListPacks = () => {
    const dispatch = useAppDispatch();

    const isAppInitialized: boolean = useAppSelector(selectorIsAppInit);
    const packs: Nullable<IPacks> = useAppSelector(selectorPacks);

    const [sortPacks, setSortPacks] = useState<PackSortRequestTypes>('0name');
    // const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [accessory, setAccessory] = useState('');
    const [amountCards, setAmountCards] = useState<number[]>([1, 10]);
    const [searchParams, setSearchParams] = useSearchParams(createPackQuery(page, rowsPerPage, sortPacks));


    useEffect(() => {
        const param: PackQueryTypes = Object.fromEntries(searchParams);
        setRowsPerPage(+param.pageCount!);
        setPage(+param.page!);
        setAccessory(param.user_id!);
        setAmountCards([+param.min!, +param.max!]);
        setSortPacks(param.sortPacks as PackSortRequestTypes);
    }, []);

    useEffect(() => {
        dispatch(packThunks.getAllPacks(searchParams as PackQueryTypes));
    }, [searchParams]);

    const searchHandler = (searchValue: Nullable<string>) => {
        if (searchValue !== null) {
            setSearchValue(searchValue);
            setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
        }
    };
    const accessoryHandler = (accessory: string) => {
        setAccessory(accessory);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };

    const handleRequestSort = (e: MouseEvent<unknown>, property: PackSortTypes) => {
        const prop: PackSortRequestTypes = superSortCreator(property, sortPacks);
        setSearchParams(createPackQuery(page, rowsPerPage, prop, searchValue, accessory, amountCards));
        setSortPacks(prop);
    };


    const onChangePagination = (newPage: number, rowsPerPage: number) => {
        setSearchParams(createPackQuery(newPage, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
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

    const setAmountCardsHandler = (amountCards: number[]) => {
        setAmountCards(amountCards);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };

    if (!isAppInitialized) return <Navigate to={'/login'} />;
    return (
        <Container maxWidth='lg'>
            <h1 className={s.pack}>Packs</h1>
            <PackSettings searchHandler={searchHandler}
                          accessoryHandler={accessoryHandler}
                          setAmountCards={setAmountCardsHandler}
                          amountCards={amountCards}
                          accessory={accessory}
            />
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                            <THeaderPack orderBy={sortPacks} onRequestSort={handleRequestSort} />
                            <BodyPack />
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
