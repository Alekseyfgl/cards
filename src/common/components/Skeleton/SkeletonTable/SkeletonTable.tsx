import React, { FC } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SkeletonString } from '../SkeletonString/SkeletonString';

interface SkeletonTableProps {
    totalRow: number;
    height?: string
}

export const SkeletonTable: FC<SkeletonTableProps> = (props) => {
    const { totalRow, height= '76px' } = props;
    return (
        <>
            {Array.from({ length: totalRow }).map((row, index) => {
                return (
                    <TableRow key={index} tabIndex={-1} sx={{height}}>
                        <TableCell align={'center'}><SkeletonString /></TableCell>
                        <TableCell align='center'>{<SkeletonString />}</TableCell>
                        <TableCell align='center'>{<SkeletonString />}</TableCell>
                        <TableCell align='center'>{<SkeletonString />}</TableCell>
                        <TableCell align='center'>{<SkeletonString />}</TableCell>
                    </TableRow>
                );
            })}
        </>
    );
};