import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { PacksRow } from '../../packs.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { selectorProfileId } from '../../../Auth/auth.selector';
import { TableCellBtn } from './TableCellBtn/TableCellBtn';
import React from 'react';
import { Tooltip } from '@mui/material';
import { truncateText } from '../../../../common/utils/functions/truncate-text/truncate-text';

export const BodyPack = () => {
    const cardPacks: PacksRow[] = useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);

    // const handleClick = (rowPackId: string) => {
    //     console.log('rowId', rowPackId);
    // };

    return (
        <TableBody>
            {cardPacks.map((rowPack, index) => {
                const truncatedName = truncateText(rowPack.name, 20);
                const isNameTruncated = rowPack.name.length > 20;

                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                        hover
                        // onClick={(e) => handleClick(rowPack._id)}
                        role='checkbox'
                        tabIndex={-1}
                        key={rowPack._id}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell  component='th' id={labelId} scope='row' align={'center'}>
                            {isNameTruncated ? (
                                <Tooltip title={rowPack.name} placement='top'>
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {truncatedName}
                                    </div>
                                </Tooltip>
                            ) : (
                                <div
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {truncatedName}
                                </div>
                            )}
                        </TableCell>
                        <TableCell align='center'>{rowPack.cards}</TableCell>
                        <TableCell align='center'>{rowPack.created}</TableCell>
                        <TableCell align='center'>{rowPack.updated}</TableCell>
                        <TableCellBtn
                            authorId={rowPack.user_id}
                            profileId={profileId!}
                            rowPackId={rowPack._id}
                            titlePack={rowPack.name}
                            isPrivatePack={rowPack.private}
                        />
                    </TableRow>
                );
            })}
        </TableBody>
    );
};
