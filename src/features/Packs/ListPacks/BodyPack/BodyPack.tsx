import TableBody from '@mui/material/TableBody';
import { createRowPack } from '../../utils/mappers/pack.mapper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { IPack } from '../../packs.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { selectorProfileId } from '../../../Auth/auth.selector';
import { TableCellBtn } from './TableCellBtn/TableCellBtn';
import React from 'react';

export const BodyPack = () => {
    const cardPacks: Optional<IPack[]> = useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);

    // const handleClick = (rowPackId: string) => {
    //     console.log('rowId', rowPackId);
    // };
    return (
        <TableBody>
            {cardPacks &&
                createRowPack(cardPacks).map((rowPack, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow
                            hover
                            // onClick={(e) => handleClick(rowPack._id)}
                            role="checkbox"
                            tabIndex={-1}
                            key={rowPack._id}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell component="th" id={labelId} scope="row" align={'center'}>
                                {rowPack.name}
                            </TableCell>
                            <TableCell align="center">{rowPack.cards}</TableCell>
                            <TableCell align="center">{rowPack.created}</TableCell>
                            <TableCell align="center">{rowPack.updated}</TableCell>
                            <TableCellBtn authorId={rowPack.user_id} profileId={profileId!} rowPackId={rowPack._id} />
                        </TableRow>
                    );
                })}
        </TableBody>
    );
};
