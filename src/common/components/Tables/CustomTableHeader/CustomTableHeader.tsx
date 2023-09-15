import { CardSortCurrentTypes, CardSortTypes } from '../../../../features/Cards/cards.interfaces';
import { PackSortRequestTypes, PackSortTypes } from '../../../../features/Packs/packs.interfaces';
import { cardHeadCells } from '../../../../features/Cards/utils/consts/head-cards.const';
import { packHeadCells } from '../../../../features/Packs/utils/constans/head-packs.const';
import React, { FC, MouseEvent } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { getDirectionSort } from '../../../../features/Packs/utils/super-sort';
import s from './styles.module.scss';

interface HeaderCardsProps {
    changeSort: (sortValue: CardSortTypes | PackSortTypes) => void;
    orderBy: CardSortCurrentTypes | PackSortRequestTypes;
    disabled: boolean;
    cells: typeof cardHeadCells | typeof packHeadCells;
}
export const CustomTableHeader: FC<HeaderCardsProps> = (props) => {
    const { cells, orderBy, disabled, changeSort } = props;

    const changeSortHandler = (property: CardSortTypes) => (e: MouseEvent<unknown>) => {
        changeSort(property);
    };
    return (
        <TableHead>
            <TableRow>
                {cells.map((cell) => {
                    const { id, label, sortBy } = cell;
                    const isActionCell = label === 'Actions';
                    return (
                        <TableCell width={210} className={s.header} key={id} align={'center'}>
                            {isActionCell ? (
                                label
                            ) : (
                                <TableSortLabel
                                    disabled={disabled}
                                    onClick={changeSortHandler(sortBy as any)}
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
