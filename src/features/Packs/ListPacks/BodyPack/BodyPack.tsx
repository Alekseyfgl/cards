import TableBody from '@mui/material/TableBody';
import { createRowPack } from '../../utils/mappers/pack.mapper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React from 'react';
import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { IPack } from '../../packs.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';

export const BodyPack = () => {
    const cardPacks: Optional<IPack[]> = useAppSelector(selectorCardPacks);
    return (
        <TableBody>
            {cardPacks &&
                createRowPack(cardPacks).map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row._id as string)}
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell component="th" id={labelId} scope="row" align={'center'}>
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.cards}</TableCell>
                            <TableCell align="center">{row.created}</TableCell>
                            <TableCell align="center">{row.updated}</TableCell>
                            <TableCell align="center">{row.actions}</TableCell>
                        </TableRow>
                    );
                })}
        </TableBody>
    );
};
