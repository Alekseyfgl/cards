import TableBody from '@mui/material/TableBody';
import { createRowPack } from '../../utils/mappers/pack.mapper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { FC } from 'react';
import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { IPack } from '../../packs.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { buttonRowConst } from '../../utils/constans/button-row.const';
import { IconButton } from '@mui/material';
import { selectorProfileId } from '../../../Auth/auth.selector';

export const BodyPack = () => {
    const cardPacks: Optional<IPack[]> = useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);
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
                            <TableCellBtn authorId={row.user_id} profileId={profileId!} />
                        </TableRow>
                    );
                })}
        </TableBody>
    );
};

interface TableCellBtnProps {
    authorId: string;
    profileId: string;
}

export const TableCellBtn: FC<TableCellBtnProps> = (props) => {
    const { authorId, profileId } = props;

    const btnsElements = buttonRowConst.filter((btn) => (authorId === profileId ? btn.id : btn.id === 'learn'));

    return (
        <TableCell align="center">
            {btnsElements.map((button) => (
                <IconButton
                    key={button.id}
                    onClick={() => {
                        console.log('click on ', button.id);
                    }}
                >
                    <button.icon />
                </IconButton>
            ))}
        </TableCell>
    );
};
