import React, { FC, useState } from 'react';
import { buttonRowConst, PackActionTypes } from '../../../utils/constans/button-row.const';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RemovePackModal } from '../../../Modals/RemovePackModal/RemovePackModal';
import { PackQueryTypes } from '../../../packs.interfaces';
import { ChangePackModal } from '../../../Modals/ChangePackModal/ChangePackModal';
import { MSG_PACK } from '../../../../../common/utils/constans/app-messages.const';
import { SkeletonString } from '../../../../../common/components/Skeleton/SkeletonString/SkeletonString';

interface TableCellBtnProps {
    authorId: string;
    profileId: string;
    rowPackId: string;
    titlePack: string;
    isPrivatePack: boolean;
    isLoading: boolean
}

export const TableCellBtn: FC<TableCellBtnProps> = (props) => {
    const { authorId, profileId, rowPackId, titlePack, isPrivatePack, isLoading } = props;
    const [queryParams, setQueryParams] = useSearchParams();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);

    const navigate = useNavigate();

    const btnsElements = buttonRowConst.filter((btn) => (authorId === profileId ? btn.id : btn.id === 'learn'));

    const openDeleteModal = () => setIsOpenRemoveModal(true);
    const closeDeleteModal = () => setIsOpenRemoveModal(false);
    const openChangeModal = () => setIsOpenChangeModal(true);
    const closeChangeModal = () => setIsOpenChangeModal(false);

    const onClickHandler = (actionType: PackActionTypes, rowPackId: string) => {
        switch (actionType) {
            case 'learn':
                navigate(`/card/${rowPackId}`);
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
            {
                isLoading ? <SkeletonString />:    btnsElements.map((button) => (
                <IconButton
                    key={button.id}
                    name={rowPackId} //id row for different actions
                    onClick={() => onClickHandler(button.action, rowPackId)}
                >
                    <button.icon />
                </IconButton>
            ))
            }
        </TableCell>
    );
};
