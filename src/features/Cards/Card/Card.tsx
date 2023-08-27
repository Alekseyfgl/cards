import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import React, { useEffect, useState } from 'react';
import { cardThunks } from '../cards.slice';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { ICard } from '../cards.interfaces';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { PaginationCustom } from '../../Packs/PaginationCustom/Pagination';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import s from './styles.module.scss';
import { selectorProfileId } from '../../Auth/auth.selector';
import {
    cardsByPackSelector,
    cardsTotalCountSelector,
    currentPackTitleSelector,
    packUserIdSelector
} from '../cards.selector';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import { cardHeadCells } from '../utils/consts/head-cards.const';

export const Card = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const profilerId: Optional<string> = useAppSelector(selectorProfileId);
    const currentPackTitle: Optional<string> = useAppSelector(currentPackTitleSelector);
    const packUserId: Optional<string> = useAppSelector(packUserIdSelector);
    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);
    const cardsTotalCount: Optional<number> = useAppSelector(cardsTotalCountSelector);


    const [queryParams, setQueryParams] = useState({
        sortCards: '0grade',
        page: '1',
        pageCount: '10',
        cardsPack_id: id!
    });


    useEffect(() => {
        dispatch(cardThunks.getAllCardsByPack(queryParams))
            .unwrap()
            .catch(() => {
                navigate('/404');
            });
    }, []);


    if (!currentPackTitle) return <h2>Pack not found</h2>;
    return (
        <>

            <Button startIcon={<ArrowBackIcon />} className={s.btn} onClick={() => navigate(-1)} variant='contained'
                    sx={{ borderRadius: 5 }}>
                back
            </Button>
            <div className={s.wr}>
                <div className={s.title}>{currentPackTitle}</div>
                {profilerId === packUserId && <Button onClick={() => {
                }} variant='contained' sx={{ borderRadius: 5 }}>
                    Create new card
                </Button>}
            </div>
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                            <TableHead>
                                <TableRow>
                                    {cardHeadCells.map((headCell) => (
                                        <TableCell width={210} className={s.header} key={headCell.id} align={'center'}>
                                            <TableSortLabel
                                                onClick={() => {}}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            {/*<BodyPack />*/}
                        </Table>
                    </TableContainer>

                    {currentPackTitle && (
                        <PaginationCustom
                            disabled={false}
                            page={+queryParams.page}
                            rowsPerPage={+queryParams.pageCount}
                            totalCount={cardsTotalCount!}
                            handleChangePage={() => {
                            }}
                            handleChangeRowsPerPage={() => {
                            }}

                        />
                    )}
                </Paper>
            </Box>


        </>

    );
};
