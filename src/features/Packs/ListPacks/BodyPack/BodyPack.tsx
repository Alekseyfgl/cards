import { Optional } from '../../../../common/utils/types/optional.types';
import { useAppSelector } from '../../../../app/hooks';
import { selectorCardPacks } from '../../packs.selector';
import { selectorProfileId } from '../../../Auth/auth.selector';
import React, { FC, MouseEvent } from 'react';
import { SkeletonTable } from '../../../../common/components/Skeleton/SkeletonTable/SkeletonTable';
import { truncateText } from '../../../../common/utils/functions/truncate-text/truncate-text';
import { CustomTooltip } from '../../../../common/components/CustomTooltip/CustomTooltip';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { TableCellBtn } from './TableCellBtn/TableCellBtn';
import { useNavigate } from 'react-router-dom';
import { StubEmptyTableBody } from '../../../../common/components/StubEmptyTableBody/StubEmptyTableBody';
import { MSG_CARD } from '../../../../common/utils/constans/app-messages.const';

interface BodyPackProps {
    isLoading: boolean;
}

export const BodyPack: FC<BodyPackProps> = (props) => {
    const { isLoading } = props;
    const navigate = useNavigate();
    const cardPacks = useAppSelector(selectorCardPacks);
    const profileId: Optional<string> = useAppSelector(selectorProfileId);

    const onClickHandler = (id: string, e: MouseEvent<HTMLTableRowElement>) => {
        navigate(`/card/${id}`);
    };

    if (cardPacks.length === 0 && !isLoading) return <StubEmptyTableBody colSpan={5} text={MSG_CARD.CARDS_NOT_FOUND} />;

    return (
        <TableBody>
            {isLoading ? (
                <SkeletonTable totalRow={5} />
            ) : (
                cardPacks.map((rowPack) => {
                    const { cards, created, updated, _id, name, user_id } = rowPack;
                    const truncatedName: string = truncateText(name, 20);
                    const isNameTruncated: boolean = name.length > 20;

                    const showTooltip: JSX.Element = isNameTruncated ? <CustomTooltip fullText={name} truncatedText={truncatedName} /> : <div>{name}</div>;
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={_id}
                            sx={{ cursor: 'pointer', height: '76px' }}
                            id={_id}
                            onClick={(e) => onClickHandler(_id, e)}
                        >
                            <TableCell scope="row" align={'center'}>
                                {showTooltip}
                            </TableCell>
                            <TableCell align="center">{cards}</TableCell>
                            <TableCell align="center">{created}</TableCell>
                            <TableCell align="center">{updated}</TableCell>
                            <TableCellBtn authorId={user_id} profileId={profileId!} rowPackId={_id} titlePack={name} isPrivatePack={rowPack.private} />
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
};
