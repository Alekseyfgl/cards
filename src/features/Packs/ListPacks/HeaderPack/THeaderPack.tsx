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
                {packHeadCells.map((headCell) => (
                    <TableCell width={210} className={s.header} key={headCell.id} align={'center'}>
                        <TableSortLabel
                            disabled={disabled}
                            active={headCell.sortBy === orderBy.slice(1)}
                            onClick={createSortHandler(headCell.sortBy)}
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