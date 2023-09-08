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
import { AccurateAnswerModal } from '../Modals/AccurateAnswerModal/AccurateAnswerModal';
import { learnThunks } from '../learn-mode.slice';
import { GradeTypes } from '../learn.interfaces';
import { FinalLearnModal } from '../Modals/FinalLearnModal/FinalLearnModal';

export const LearnMode = () => {
    const { id } = useParams<{ id: string }>(); // packId
    const navigate = useNavigate();
    if (!id) navigate('/404');

    const dispatch = useAppDispatch();
    const cardsList: Nullable<ICard[]> = useAppSelector(cardsByPackSelector);

    const [cards, setCards] = useState<ICard[]>([]);
    const [activeStep, setActiveStep] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenAccurateModal, setIsOpenAccurateModal] = useState(false);
    const [isOpenFinalLearnModal, setIsOpenFinalLearnModal] = useState(false);

    const currentCard: ICard = cards[activeStep];

    const setIsLoadingHandle = (value: boolean) => {
        setIsLoading(value);
    };

    const startAgain = () => {
        shuffleCards();
        setActiveStep(0);
        closeFinalLearnModalHandle();
    };
    useEffect(() => {
        const isLastCard = cards.length - 1 === activeStep;
        if (isLastCard) openFinalLearnModalHandle();
    }, [activeStep]);

    useEffect(() => {
        setIsLoadingHandle(true);
        dispatch(cardThunks.getAllCardsByPack({ cardsPack_id: id, pageCount: '100' }))
            .unwrap()
            .then((r) => setCards(r.cards))
            .catch(() => navigate('/404'))
            .finally(() => setIsLoadingHandle(false));
    }, []);

    const openAccurateModalHandle = () => {
        setIsOpenAccurateModal(true);
    };
    const closeAccurateModalHandle = () => {
        if (isLoading) return;
        setIsOpenAccurateModal(false);
    };

    const openFinalLearnModalHandle = () => {
        setIsOpenFinalLearnModal(true);
    };
    const closeFinalLearnModalHandle = () => {
        setIsOpenFinalLearnModal(false);
    };
    const sendAnswerHandle = (grade: GradeTypes) => {
        setIsLoading(true);
        dispatch(
            learnThunks.sendAnswerByCard({
                dto: { grade, card_id: currentCard._id },
                params: null,
                query: null,
            })
        ).finally(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsLoading(false);
        });
    };

    const shuffleCards = () => {
        setCards(shuffleArray(cards));
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
            <AccurateAnswerModal
                cardId={currentCard._id}
                inOpen={isOpenAccurateModal}
                isLoading={isLoading}
                handleClose={closeAccurateModalHandle}
                setIsLoadingHandle={setIsLoadingHandle}
            />
            <FinalLearnModal isOpen={isOpenFinalLearnModal} closeModal={closeFinalLearnModalHandle} startAgain={startAgain} />
            <div className={s.counter}>
                {activeStep + 1} / {cards.length}
            </div>
            <div className={s.text}>{showAnswer ? currentCard.answer : currentCard.question}</div>

            <ButtonGroup disabled={isLoading} variant={'contained'} sx={{ display: 'flex' }}>
                <Button sx={{ width: '100%' }} onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardReturnIcon />
                </Button>

                <Button onClick={() => sendAnswerHandle(1)} sx={{ width: '100%' }}>
                    <CancelIcon />
                </Button>

                <Button onClick={() => sendAnswerHandle(5)} disabled={cardsList ? activeStep === cards.length - 1 : true} sx={{ width: '100%' }}>
                    <CheckCircleIcon />
                </Button>
                <Button
                    sx={{ width: '100%' }}
                    onClick={() => {
                        shuffleCards();
                        setActiveStep(0);
                        setShowAnswer(false);
                    }}
                >
                    <ShuffleIcon />
                </Button>
                <Button sx={{ width: '100%' }} onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Button>
                <Button sx={{ width: '100%' }} onClick={openAccurateModalHandle}>
                    <ListAltIcon />
                </Button>
            </ButtonGroup>
        </BasicModal>
    );
};
