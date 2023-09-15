import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { MSG_BTN, MSG_LEARN } from '../../../../common/utils/constans/app-messages.const';

interface FinalLearnModalProps {
    isOpen: boolean;
    closeModal: () => void;
    startAgain: () => void;
}

export const FinalLearnModal: FC<FinalLearnModalProps> = (props) => {
    const { isOpen, closeModal, startAgain } = props;
    const navigate = useNavigate();

    const backToPacks = () => {
        navigate('/packs');
        closeModal();
    };

    return (
        <BasicModal isOpen={isOpen} title={MSG_LEARN.START_AGAIN} commonHandleClose={backToPacks}>
            <div>
                <div className={s.btns}>
                    <CustomButton color={'inherit'} onClick={startAgain}>
                        {MSG_BTN.START_AGAIN}
                    </CustomButton>
                    <CustomButton color={'inherit'} onClick={backToPacks}>
                        {MSG_BTN.CLOSE}
                    </CustomButton>
                </div>
            </div>
        </BasicModal>
    );
};
