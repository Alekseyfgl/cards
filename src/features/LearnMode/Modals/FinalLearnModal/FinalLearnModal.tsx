import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import { Button } from '@mui/material';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface FinalLearnModalProps {
    isOpen: boolean;
    closeModal: () => void;
    startAgain: () => void;
}

export const FinalLearnModal: FC<FinalLearnModalProps> = (props) => {
    const { isOpen, closeModal, startAgain } = props;
    const navigate = useNavigate();

    const backToPacks = () => {
        navigate('/pack');
    };

    // const startAgain = () => {
    //     shuffleCards();
    //     closeModal();
    // };
    // const closeModalHandler = () => {
    //     closeModal();
    //     // navigate('/pack');
    // };
    return (
        <BasicModal isOpen={isOpen} title={'Do you want to start again or close current pack?'} commonHandleClose={closeModal}>
            <div>
                <div className={s.btns}>
                    <Button variant="contained" color={'inherit'} onClick={startAgain}>
                        Start again
                    </Button>
                    <Button variant="contained" color={'inherit'} onClick={backToPacks}>
                        Close
                    </Button>
                </div>
            </div>
        </BasicModal>
    );
};
