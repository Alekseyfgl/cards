import React, { FC, MouseEvent, useState } from 'react';
import { buttonRowConst, PackActionTypes } from '../../../utils/constans/button-row.const';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RemovePackModal } from '../../../Modals/RemovePackModal/RemovePackModal';
import { PackQueryTypes } from '../../../packs.interfaces';
import { ChangePackModal } from '../../../Modals/ChangePackModal/ChangePackModal';
import { MSG_PACK } from '../../../../../common/utils/constans/app-messages.const';

interface TableCellBtnProps {
    authorId: string;
    profileId: string;
    rowPackId: string;
    titlePack: string;
    isPrivatePack: boolean;
}

export const TableCellBtn: FC<TableCellBtnProps> = (props) => {
    const navigate = useNavigate();
    const { authorId, profileId, rowPackId, titlePack, isPrivatePack } = props;
    const [queryParams, setQueryParams] = useSearchParams();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);

    const btnsElements = buttonRowConst.filter((btn) => (authorId === profileId ? btn.id : btn.id === 'learn'));

    const openDeleteModal = () => setIsOpenRemoveModal(true);
    const closeDeleteModal = () => setIsOpenRemoveModal(false);
    const openChangeModal = () => setIsOpenChangeModal(true);
    const closeChangeModal = () => setIsOpenChangeModal(false);

    const onClickHandler = (actionType: PackActionTypes, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        switch (actionType) {
            case 'learn':
                navigate(`/pack/learn/${rowPackId}`);
                break;
            case 'remove':
                openDeleteModal();
                break;
            case 'change':
                openChangeModal();
                break;
        }
    };

    return (
        <TableCell align="center">
            <RemovePackModal
                closeModal={closeDeleteModal}
                title={MSG_PACK.REMOVE_PACK}
                isOpen={isOpenRemoveModal}
                rowPackId={rowPackId}
                queryParams={queryParams as PackQueryTypes}
            />
            <ChangePackModal
                isPrivatePack={isPrivatePack}
                rowPackId={rowPackId}
                title={MSG_PACK.CHANGE_TITLE}
                titlePack={titlePack}
                isOpen={isOpenChangeModal}
                closeModal={closeChangeModal}
                queryParams={queryParams as PackQueryTypes}
            />
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
