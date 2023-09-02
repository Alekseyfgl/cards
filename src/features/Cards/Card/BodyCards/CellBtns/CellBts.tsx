import React, { FC, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import { buttonRowConst, PackActionTypes } from '../../../../Packs/utils/constans/button-row.const';
import TableCell from '@mui/material/TableCell';

interface CellBtsProps {
    authorId: string;
    profileId: string;
    rowPackId: string;
    question: string;
    answer: string;
}

export const CellBts: FC<CellBtsProps> = (props) => {
    const { profileId, rowPackId, question, answer, authorId } = props;

    const btnsElements = buttonRowConst.filter((btn) => authorId === profileId && btn.id !== 'learn');
    const onClickHandler = (actionType: PackActionTypes, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        switch (actionType) {
            case 'remove':
                // openDeleteModal();
                break;
            case 'change':
                // openChangeModal();
                break;
        }
    };
    return (
        <TableCell align="center">
            {btnsElements.map((button) => (
                <IconButton
                    key={button.id}
                    name={rowPackId} //id row for different actions
                    onClick={(e) => onClickHandler(button.action, e)}
                >
                    <button.icon />
                </IconButton>
            ))}
        </TableCell>
    );
};
