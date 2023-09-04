import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { cardHeadCells } from '../../utils/consts/head-cards.const';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import React, { FC, MouseEvent } from 'react';
import { CardSortCurrentTypes, CardSortTypes } from 'features/Cards/cards.interfaces';
import { getDirectionSort } from '../../../Packs/utils/super-sort';
import s from './styles.module.scss';

interface HeaderCardsProps {
    changeSort: (sortValue: CardSortTypes) => void;
    orderBy: CardSortCurrentTypes;
    disabled: boolean;
}

export const HeaderCards: FC<HeaderCardsProps> = ({ orderBy, disabled, changeSort }) => {
    const changeSortHandler = (property: CardSortTypes) => (e: MouseEvent<unknown>) => {
        changeSort(property);
    };

    return (
        <TableHead>
            <TableRow>
                {cardHeadCells.map((headCell) => {
                    const { id, label, sortBy } = headCell;
                    const isActionCell = label === 'Actions';
                    return (
                        <TableCell width={210} className={s.header} key={id} align={'center'}>
                            {isActionCell ? (
                                label
                            ) : (
                                <TableSortLabel
                                    disabled={disabled}
                                    onClick={changeSortHandler(sortBy as CardSortTypes)}
                                    active={sortBy === orderBy.slice(1)}
                                    direction={getDirectionSort(orderBy)}
                                >
                                    {label}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};
