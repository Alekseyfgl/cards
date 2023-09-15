import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import s from '../../../features/Packs/ListPacks/BodyPack/styles.module.scss';
import React, { FC } from 'react';

interface StubEmptyTableBodyProps {
    text: string;
    colSpan: number;
}
export const StubEmptyTableBody: FC<StubEmptyTableBodyProps> = (props) => {
    const { colSpan, text } = props;
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={colSpan} align="center" className={s.wr}>
                    <p>{text}</p>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};
