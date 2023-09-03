import { Nullable } from '../../../../common/utils/types/optional.types';
import { ICard, ICardQuery } from '../../cards.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { cardsByPackSelector } from '../../cards.selector';
import { TableBody } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import { SkeletonTable } from '../../../../common/components/Skeleton/SkeletonTable/SkeletonTable';
import { Grade } from '../../Grade/Grade';
import { selectorProfileId } from '../../../Auth/auth.selector';
import { CellBts } from './CellBtns/CellBts';
import { StubEmptyTableBody } from '../../../../common/components/StubEmptyTableBody/StubEmptyTableBody';
import { MSG_CARD } from '../../../../common/utils/constans/app-messages.const';

interface BodyCardsProps {
    isLoading: boolean;
    query: ICardQuery;
}

export const BodyCards: FC<BodyCardsProps> = (props) => {
    const { isLoading, query } = props;

    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);
    const profileId = useAppSelector(selectorProfileId);

    if (cardsList?.length === 0 && !isLoading) return <StubEmptyTableBody colSpan={5} text={MSG_CARD.CARDS_NOT_FOUND} />;
    return (
        <TableBody>
            {isLoading ? (
                <SkeletonTable totalRow={5} />
            ) : (
                cardsList?.map((rowCard, i) => {
                    const { grade, updated, question, answer, _id, user_id, questionImg } = rowCard;
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={_id} sx={{ cursor: 'default', height: '76px' }}>
                            <TableCell scope="row" align={'center'}>
                                {question}
                            </TableCell>
                            <TableCell align="center">{answer}</TableCell>
                            <TableCell align="center">{updated}</TableCell>
                            <TableCell align="center">{<Grade value={grade} />}</TableCell>
                            <CellBts
                                profileId={profileId!}
                                authorId={user_id}
                                cardId={_id}
                                answer={answer}
                                question={question}
                                key={i}
                                query={query}
                                questionImg={questionImg}
                            />
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
};
