import { Nullable } from '../../../../common/utils/types/optional.types';
import { ICard, ICardQuery } from '../../cards.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { cardsByPackSelector } from '../../cards.selector';
import { TableBody } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import s from '../../../Packs/ListPacks/BodyPack/styles.module.scss';
import { SkeletonTable } from '../../../../common/components/Skeleton/SkeletonTable/SkeletonTable';
import { Grade } from '../../Grade/Grade';
import { selectorProfileId } from '../../../Auth/auth.selector';
import { CellBts } from './CellBtns/CellBts';

interface BodyCardsProps {
    isLoading: boolean;
    query: ICardQuery;
}

export const BodyCards: FC<BodyCardsProps> = (props) => {
    const { isLoading, query } = props;

    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);
    const profileId = useAppSelector(selectorProfileId);

    if (cardsList?.length === 0 && !isLoading) return <div className={s.wr}>Cards were not found</div>;
    return (
        <TableBody>
            {isLoading ? (
                <SkeletonTable totalRow={5} />
            ) : (
                cardsList?.map((rowCard, i) => {
                    const { grade, updated, question, answer, _id, user_id } = rowCard;
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={_id} sx={{ cursor: 'default', height: '76px' }}>
                            <TableCell scope="row" align={'center'}>
                                {question}
                            </TableCell>
                            <TableCell align="center">{answer}</TableCell>
                            <TableCell align="center">{updated}</TableCell>
                            <TableCell align="center">{<Grade value={grade} />}</TableCell>
                            <CellBts profileId={profileId!} authorId={user_id} cardId={_id} answer={answer} question={question} key={i} query={query} />
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
};
