import React, { FC, memo, useState } from 'react';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import s from '../AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import { PackQueryTypes } from '../../packs.interfaces';
import { packThunks } from '../../packs.slice';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { MSG_BTN } from '../../../../common/utils/constans/app-messages.const';

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
        dispatch(packThunks.removePack({ dto: { id: rowPackId }, queryParams: queryParams as PackQueryTypes })).finally(() => {
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
                    <SendRequestButton isSentRequest={isSentRequest} disabled={isSentRequest}>
                        {MSG_BTN.REMOVE}
                    </SendRequestButton>
                    <CustomButton onClick={closeModalHandler} color={'inherit'}>
                        {MSG_BTN.CANCEL}
                    </CustomButton>
                </div>
            </form>
        </BasicModal>
    );
});
