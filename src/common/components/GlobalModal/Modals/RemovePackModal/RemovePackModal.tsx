import React, { FC, memo, useState } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { BasicModal } from '../../GlobalModal';
import { Button } from '@mui/material';
import s from '../AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../ButtonSendRequest/SendRequestButton';
import { PackQueryTypes } from '../../../../../features/Packs/packs.interfaces';
import { packThunks } from '../../../../../features/Packs/packs.slice';

interface RemovePackModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    rowPackId: string;
    queryParams: PackQueryTypes;
}
export const RemovePackModal: FC<RemovePackModalProps> = memo((props) => {
    const { isOpen, closeModal, title, rowPackId, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSentRequest(true);
        dispatch(packThunks.removePack({ dto: { id: rowPackId }, queryParams: queryParams as PackQueryTypes }))
            .unwrap()
            .then(() => {
                closeModal();
            });
    };

    const closeModalHandler = () => {
        if (isSentRequest) return;
        closeModal();
    };
    return (
        <BasicModal isOpen={isOpen} title={title} handleClose={closeModalHandler}>
            <form onSubmit={onSubmit}>
                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={!!isSentRequest}>
                        Remove
                    </SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={closeModalHandler}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
});
