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
export const HeaderCards: FC<HeaderCardsProps> = (props) => {
    const { orderBy, disabled, changeSort } = props;

    const changeSortHandler = (property: CardSortTypes) => (e: MouseEvent<unknown>) => {
        changeSort(property);
    };
    return (
        <TableHead>
            <TableRow>
                {cardHeadCells.map((headCell) => (
                    <TableCell width={210} className={s.header} key={headCell.id} align={'center'}>
                        <TableSortLabel
                            disabled={disabled}
                            onClick={changeSortHandler(headCell.sortBy as CardSortTypes)}
                            active={headCell.sortBy === orderBy.slice(1)}
                            direction={getDirectionSort(orderBy)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
