import React, { FC, useState } from 'react';
import { buttonRowConst, PackActionTypes } from '../../../utils/constans/button-row.const';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { RemovePackModal } from '../../../../../common/components/GlobalModal/Modals/RemovePackModal/RemovePackModal';
import { PackQueryTypes } from '../../../packs.interfaces';

interface TableCellBtnProps {
    authorId: string;
    profileId: string;
    rowPackId: string;
}

export const TableCellBtn: FC<TableCellBtnProps> = (props) => {
    const { authorId, profileId, rowPackId } = props;
    const [queryParams, setQueryParams] = useSearchParams();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const btnsElements = buttonRowConst.filter((btn) => (authorId === profileId ? btn.id : btn.id === 'learn'));

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);
    const onClickHandler = (actionType: PackActionTypes, rowPackId: string) => {
        switch (actionType) {
            case 'learn':
                console.log('click on ', actionType);
                console.log('name', rowPackId);
                break;
            case 'remove':
                openModal();
                break;
            case 'change':
                console.log('click on ', actionType);
                console.log('name', rowPackId);
                break;
        }
    };

    return (
        <TableCell align="center">
            <RemovePackModal
                closeModal={closeModal}
                title={'Do you want to remove this pack?'}
                isOpen={isOpenModal}
                rowPackId={rowPackId}
                queryParams={queryParams as PackQueryTypes}
            />
            {btnsElements.map((button) => (
                <IconButton
                    key={button.id}
                    name={rowPackId} //id row for different actions
                    onClick={() => onClickHandler(button.action, rowPackId)}
                >
                    <button.icon />
                </IconButton>
            ))}
        </TableCell>
    );
};
