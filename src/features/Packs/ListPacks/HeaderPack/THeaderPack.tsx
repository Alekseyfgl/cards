import { FC, MouseEvent } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { packHeadCells } from '../../utils/constans/head-packs.const';
import { PackSortRequestTypes, PackSortTypes } from '../../packs.interfaces';
import { getDirectionSort } from '../../utils/super-sort';
import s from './styles.module.scss';

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: PackSortTypes) => void;
    orderBy: PackSortRequestTypes;
    disabled: boolean;
}

export const THeaderPack: FC<EnhancedTableProps> = (props) => {
    const { orderBy, disabled, onRequestSort } = props;
    const createSortHandler = (property: PackSortTypes) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {packHeadCells.map((headCell) => {
                    const { id, sortBy, label } = headCell;
                    const isActionCell = label === 'Actions';
                    return (
                        <TableCell width={210} className={s.header} key={id} align={'center'}>
                            {isActionCell ? (
                                label
                            ) : (
                                <TableSortLabel
                                    disabled={disabled}
                                    active={sortBy === orderBy.slice(1)}
                                    onClick={createSortHandler(sortBy)}
                                    direction={getDirectionSort(orderBy)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};
