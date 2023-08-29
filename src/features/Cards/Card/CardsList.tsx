import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import React, { useEffect, useState } from 'react';
import { cardThunks } from '../cards.slice';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { CardSortCurrentTypes, CardSortTypes, ICard, ICardQuery } from '../cards.interfaces';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { PaginationCustom } from '../../Packs/PaginationCustom/Pagination';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { selectorProfileId } from '../../Auth/auth.selector';
import { cardsByPackSelector, cardsTotalCountSelector, currentPackTitleSelector, packUserIdSelector } from '../cards.selector';
import s from './styles.module.scss';
import { HeaderCards } from './HeaderCards/HeaderCards';
import { superSortCreator } from '../../Packs/utils/super-sort';
import { BodyCards } from './BodyCards/BodyCards';

export const CardsList = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const profilerId: Optional<string> = useAppSelector(selectorProfileId);
    const currentPackTitle: Optional<string> = useAppSelector(currentPackTitleSelector);
    const packUserId: Optional<string> = useAppSelector(packUserIdSelector);
    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);
    const cardsTotalCount: Optional<number> = useAppSelector(cardsTotalCountSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState<ICardQuery>({
        sortCards: '0grade',
        page: '1',
        pageCount: '5',
        cardsPack_id: id!,
        cardQuestion: '',
    });

    useEffect(() => {
        setIsLoading(true);
        dispatch(cardThunks.getAllCardsByPack(params))
            .unwrap()
            .catch(() => navigate('/404'))
            .finally(() => setIsLoading(false));
    }, [params]);

    const changePageHandler = (_: unknown, newPage: number) => {
        +params.page !== newPage && setParams({ ...params, page: newPage.toString() });
    };

    const sortCardsHandler = (property: CardSortTypes) => {
        const prop: CardSortCurrentTypes = superSortCreator(property, params.sortCards);
        setParams({ ...params, sortCards: prop });
    };

    const searchHandler = () => {
        const searchValue = params.cardQuestion;
        if (searchValue !== null) {
            setParams({ ...params, cardQuestion: searchValue.trim() });
        }
    };

    return (
        <>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="contained" sx={{ borderRadius: 5, marginBottom: '30px' }}>
                back
            </Button>
            <div className={s.wr}>
                <div className={s.title}>{currentPackTitle}</div>
                {profilerId === packUserId && (
                    <Button onClick={() => {}} variant="contained" sx={{ borderRadius: 5 }}>
                        Create new card
                    </Button>
                )}
            </div>
            {/*<Box>*/}
            {/*    <CustomSearch placeholder={'write question'} searchHandler={searchHandler} searchValue={params.cardQuestion} />*/}
            {/*</Box>*/}
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <HeaderCards disabled={isLoading} changeSort={sortCardsHandler} orderBy={params.sortCards} />
                            <BodyCards isLoading={isLoading} />
                        </Table>
                    </TableContainer>

                    {currentPackTitle && (
                        <PaginationCustom
                            disabled={isLoading}
                            page={+params.page}
                            rowsPerPage={+params.pageCount}
                            totalCount={cardsTotalCount!}
                            handleChangePage={changePageHandler}
                        />
                    )}
                </Paper>
            </Box>
        </>
    );
};