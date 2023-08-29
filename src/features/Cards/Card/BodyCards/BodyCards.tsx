import { Nullable } from '../../../../common/utils/optionalTypes/optional.types';
import { ICard } from '../../cards.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { cardsByPackSelector } from '../../cards.selector';
import { TableBody } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import s from '../../../Packs/ListPacks/BodyPack/styles.module.scss';
import { SkeletonTable } from '../../../../common/components/Skeleton/SkeletonTable/SkeletonTable';

interface BodyCardsProps {
    isLoading: boolean;
}

export const BodyCards: FC<BodyCardsProps> = (props) => {
    const { isLoading } = props;

    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);

    if (cardsList?.length === 0 && !isLoading) return <div className={s.wr}>Cards were not found</div>;
    return (
        <TableBody>
            {isLoading ? (
                <SkeletonTable totalRow={5} />
            ) : (
                cardsList?.map((rowCard) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={rowCard._id} sx={{ cursor: 'default', height: '76px' }}>
                            <TableCell scope="row" align={'center'}>
                                {rowCard.question}
                            </TableCell>
                            <TableCell align="center">{rowCard.answer}</TableCell>
                            <TableCell align="center">{rowCard.updated}</TableCell>
                            <TableCell align="center">{rowCard.grade}</TableCell>
                            <TableCell align="center">{'actions'}</TableCell>
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
};
