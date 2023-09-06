import * as React from 'react';
import { useEffect, useState } from 'react';
import { BasicModal } from '../../../common/components/GlobalModal/GlobalModal';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ButtonGroup from '@mui/material/ButtonGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AccurateAnswerModal } from './Modals/AccurateAnswerModal/AccurateAnswerModal';
import { Button } from '@mui/material';
import s from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cardThunks } from '../../Cards/cards.slice';
import { Nullable } from '../../../common/utils/types/optional.types';
import { ICard } from '../../Cards/cards.interfaces';
import { cardsByPackSelector } from '../../Cards/cards.selector';
import { shuffleArray } from '../../../common/utils/functions/shuffle-array/shuffle-array';
import Skeleton from '@mui/material/Skeleton';

export const LearnMode = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);

    const [cards, setCards] = useState<ICard[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openAccurateModal, setOpenAccurateModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(cardThunks.getAllCardsByPack({ cardsPack_id: id, pageCount: '100' }))
            .unwrap()
            .then((r) => setCards(r.cards))
            .catch(() => navigate('/404'))
            .finally(() => setIsLoading(false));
    }, []);

    const handleOpen = () => {
        setOpenAccurateModal(true);
    };
    const handleClose = () => {
        setOpenAccurateModal(false);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (!cards.length)
        return (
            <BasicModal
                isOpen={true}
                width={'30%'}
                commonHandleClose={() => {}}
                title={'Learning'}
                customHandleClose={() => {
                    navigate(-1);
                }}
            >
                <Skeleton variant="rectangular" width={'100%'} height={180} sx={{ marginBottom: '20px' }} />
                <Skeleton variant="rectangular" width={'100%'} height={30} />
            </BasicModal>
        );
    return (
        <BasicModal
            height={'40%'}
            width={'30%'}
            isOpen={true}
            title={'Learning'}
            commonHandleClose={() => {}}
            customHandleClose={() => {
                navigate(-1);
            }}
        >
            <AccurateAnswerModal inOpen={openAccurateModal} isSentRequest={isLoading} closeModal={handleClose} />
            <div className={s.counter}>
                {activeStep + 1} / {cards.length}
            </div>
            <div className={s.text}>{showAnswer ? cards[activeStep].answer : cards[activeStep].question}</div>
            <ButtonGroup variant={'contained'} sx={{ display: 'flex' }}>
                <Button sx={{ width: '100%' }} onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardReturnIcon />
                </Button>

                <Button sx={{ width: '100%' }}>
                    <CancelIcon />
                </Button>

                <Button onClick={handleNext} disabled={cardsList ? activeStep === cards.length - 1 : true} sx={{ width: '100%' }}>
                    <CheckCircleIcon />
                </Button>
                <Button
                    sx={{ width: '100%' }}
                    onClick={() => {
                        setCards(shuffleArray(cards));
                        setActiveStep(0);
                        setShowAnswer(false);
                    }}
                >
                    <ShuffleIcon />
                </Button>
                <Button sx={{ width: '100%' }} onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
                <Button sx={{ width: '100%' }} onClick={handleOpen}>
                    <ListAltIcon />
                </Button>
            </ButtonGroup>
        </BasicModal>
    );
};
