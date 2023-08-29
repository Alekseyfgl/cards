import { Optional } from '../../../../common/utils/optionalTypes/optional.types';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { selectorProfileId } from '../../../Auth/auth.selector';
import React, { FC } from 'react';
import s from './styles.module.scss';
import { SkeletonTable } from '../../../../common/components/Skeleton/SkeletonTable/SkeletonTable';
import { truncateText } from '../../../../common/utils/functions/truncate-text/truncate-text';
import { CustomTooltip } from '../../../../common/components/CustomTooltip/CustomTooltip';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { TableCellBtn } from './TableCellBtn/TableCellBtn';

interface BodyPackProps {
    isLoading: boolean;
}

export const BodyPack: FC<BodyPackProps> = (props) => {
    const { isLoading } = props;
    const cardPacks = useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);

    if (cardPacks.length === 0 && !isLoading) return <div className={s.wr}>Cards were not found</div>;
    return (
        <TableBody>
            {isLoading ? (
                <SkeletonTable totalRow={5} />
            ) : (
                cardPacks.map((rowPack) => {
                    const truncatedName: string = truncateText(rowPack.name, 20);
                    const isNameTruncated: boolean = rowPack.name.length > 20;

                    const showTooltip: JSX.Element = isNameTruncated ? (
                        <CustomTooltip fullText={rowPack.name} truncatedText={truncatedName} />
                    ) : (
                        <div>{rowPack.name}</div>
                    );
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={rowPack._id} sx={{ cursor: 'default', height: '76px' }}>
                            <TableCell scope="row" align={'center'}>
                                {showTooltip}
                            </TableCell>
                            <TableCell align="center">{rowPack.cards}</TableCell>
                            <TableCell align="center">{rowPack.created}</TableCell>
                            <TableCell align="center">{rowPack.updated}</TableCell>
                            <TableCellBtn
                                authorId={rowPack.user_id}
                                profileId={profileId!}
                                rowPackId={rowPack._id}
                                titlePack={rowPack.name}
                                isPrivatePack={rowPack.private}
                            />
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
};
