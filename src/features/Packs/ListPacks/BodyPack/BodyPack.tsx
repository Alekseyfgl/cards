import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { selectorProfileId } from '../../../Auth/auth.selector';
import { TableCellBtn } from './TableCellBtn/TableCellBtn';
import React, { FC } from 'react';
import { truncateText } from '../../../../common/utils/functions/truncate-text/truncate-text';
import { SkeletonString } from '../../../../common/components/Skeleton/SkeletonString/SkeletonString';
import { CustomTooltip } from '../../../../common/components/CustomTooltip/CustomTooltip';

interface BodyPackProps {
    isLoading: boolean
}
export const BodyPack:FC<BodyPackProps> = (props) => {
    const {isLoading} = props
    const cardPacks= useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);

    // const handleClick = (rowPackId: string) => {
    //     console.log('rowId', rowPackId);
    // };


    return (
        <TableBody>
            {cardPacks.map((rowPack, index) => {
                const truncatedName: string = truncateText(rowPack.name, 20);
                const isNameTruncated: boolean = rowPack.name.length > 20;
                const labelId: string = `enhanced-table-checkbox-${index}`;

                const showTooltip: JSX.Element =   isNameTruncated ?
                    (<CustomTooltip fullText={rowPack.name} truncatedText={truncatedName}/>) :
                    (<div>{rowPack.name}</div>)
                return (
                    <TableRow

                        hover
                        // onClick={(e) => handleClick(rowPack._id)}
                        role='checkbox'
                        tabIndex={-1}
                        key={rowPack._id}
                        sx={{ cursor: 'pointer', height:'76px' }}
                    >
                        <TableCell component='th' id={labelId} scope='row' align={'center'}>
                            {isLoading ? <SkeletonString/> : showTooltip}
                        </TableCell>
                        <TableCell align='center'>{isLoading ? <SkeletonString/> :rowPack.cards}</TableCell>
                        <TableCell align='center'>{isLoading ? <SkeletonString/> :rowPack.created}</TableCell>
                        <TableCell align='center'>{isLoading ? <SkeletonString/> :rowPack.updated}</TableCell>
                        <TableCellBtn
                            isLoading={isLoading}
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


