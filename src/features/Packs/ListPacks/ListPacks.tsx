import s from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { PaginationCustom } from '../PaginationCustom/Pagination';
import { IPacks, PackQueryTypes, PackSortRequestTypes, PackSortTypes } from '../packs.interfaces';
import { Nullable } from '../../../common/utils/types/optional.types';
import { selectorPacks } from '../packs.selector';
import { superSortCreator } from '../utils/super-sort';
import { packThunks } from '../packs.slice';
import { createPackQuery } from '../utils/mappers/pack.mapper';
import { PackSettings } from '../Settings/PackSettings';
import { BodyPack } from './BodyPack/BodyPack';
import { AddPackModal } from '../Modals/AddPackModal/AddPackModal';
import { shallowEqual } from 'react-redux';
import { CustomButton } from '../../../common/components/CustomButton/CustomButton';
import { packHeadCells } from '../utils/constans/head-packs.const';
import { CustomTableHeader } from 'common/components/Tables/CustomTableHeader/CustomTableHeader';

export const ListPacks = () => {
    const dispatch = useAppDispatch();
    const packs: Nullable<IPacks> = useAppSelector(selectorPacks, shallowEqual);

    const [searchParams, setSearchParams] = useSearchParams(createPackQuery());
    const params: PackQueryTypes = Object.fromEntries(searchParams);

    const [page, setPage] = useState(params.page || '1');
    const [rowsPerPage, setRowsPerPage] = useState(params.pageCount || '5');
    const [sortPacks, setSortPacks] = useState<PackSortRequestTypes>((params.sortPacks as PackSortRequestTypes) || '0created');
    const [searchValue, setSearchValue] = useState(params.packName || '');
    const [accessory, setAccessory] = useState(params.user_id || '');
    const [amountCards, setAmountCards] = useState<number[]>([+params.min!, +params.max!]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(packThunks.getAllPacks(searchParams as PackQueryTypes))
            .unwrap()
            .finally(() => setIsLoading(false));
    }, [searchParams]);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    const searchHandler = (searchValue: Nullable<string>) => {
        if (searchValue !== null) {
            setSearchValue(searchValue.trim());
            setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue.trim(), accessory, amountCards));
        }
    };

    const resetAllFilters = () => {
        setSearchValue('');
        setAccessory('');
        setAmountCards([0, 100]);
        setSortPacks('0created');
        setSearchParams(createPackQuery(page, rowsPerPage));
    };

    const setAmountCardsHandler = (amountCards: number[]) => {
        setAmountCards(amountCards);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };
    const accessoryHandler = (accessory: string) => {
        setAccessory(accessory);
        setSearchParams(createPackQuery(page, rowsPerPage, sortPacks, searchValue, accessory, amountCards));
    };

    const handleRequestSort = (property: PackSortTypes) => {
        const prop: PackSortRequestTypes = superSortCreator(property, sortPacks);
        setSearchParams(createPackQuery(page, rowsPerPage, prop, searchValue, accessory, amountCards));
        setSortPacks(prop);
    };

    const onChangePagination = (newPage: number, rowsPerPage: number) => {
        setSearchParams(createPackQuery(newPage.toString(), rowsPerPage.toString(), sortPacks, searchValue, accessory, amountCards as number[]));
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        if (+page === newPage) return;
        onChangePagination(newPage, +rowsPerPage);
        setPage(newPage.toString());
    };

    return (
        <>
            {isOpenModal && <AddPackModal isOpen={isOpenModal} closeModal={closeModal} queryParams={searchParams} />}
            <div className={s.wr}>
                <h2 className={s.title}>Packs</h2>
                <CustomButton disabled={isLoading} onClick={openModal}>
                    Add new pack
                </CustomButton>
            </div>
            <PackSettings
                disabled={isLoading}
                searchHandler={searchHandler}
                accessoryHandler={accessoryHandler}
                setAmountCards={setAmountCardsHandler}
                resetAllFilters={resetAllFilters}
                amountCards={amountCards}
                accessory={accessory}
                searchValue={searchValue}
            />
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <CustomTableHeader changeSort={handleRequestSort as any} orderBy={sortPacks} disabled={isLoading} cells={packHeadCells} />
                            <BodyPack isLoading={isLoading} />
                        </Table>
                    </TableContainer>

                    {packs?.cardPacks.length ? (
                        <PaginationCustom
                            disabled={isLoading}
                            page={packs.page}
                            rowsPerPage={+rowsPerPage}
                            totalCount={packs.cardPacksTotalCount}
                            handleChangePage={handleChangePage}
                        />
                    ) : (
                        ''
                    )}
                </Paper>
            </Box>
        </>
    );
};
