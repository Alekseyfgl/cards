import React, { FC, memo, useState } from 'react';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import { Button } from '@mui/material';
import s from '../AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import { PackQueryTypes } from '../../packs.interfaces';
import { packThunks } from '../../packs.slice';

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
        <BasicModal isOpen={isOpen} title={title} commonHandleClose={closeModalHandler}>
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
