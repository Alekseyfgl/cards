import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import { Button } from '@mui/material';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import React, { FC, FormEvent, memo, useState } from 'react';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { ICardQuery } from '../../cards.interfaces';
import { cardThunks } from '../../cards.slice';
import { MSG_CARD } from '../../../../common/utils/constans/app-messages.const';

interface RemoveCardModalProps {
    isOpen: boolean;
    closeModal: () => void;
    query: ICardQuery;
    cardId: string;
}

export const RemoveCardModal: FC<RemoveCardModalProps> = memo((props) => {
    const { isOpen, closeModal, query, cardId } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSentRequest(true);
        dispatch(cardThunks.removeCard({ dto: { id: cardId }, query, params: null })).finally(() => {
            closeModal();
            setIsSentRequest(false);
        });
    };

    const closeModalHandler = (e?: unknown) => {
        (e as Event)?.stopPropagation();
        if (isSentRequest) return;
        closeModal();
    };
    return (
        <BasicModal isOpen={isOpen} title={MSG_CARD.REMOVE_CARD} handleClose={closeModalHandler}>
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
