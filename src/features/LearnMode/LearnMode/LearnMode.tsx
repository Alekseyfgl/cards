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
    const [isLoadingLearnMode, setIsLoadingLearnMode] = useState(false);
    const [isSendingAnswer, setIsSendingAnswer] = useState(false);
    const [isOpenAccurateModal, setIsOpenAccurateModal] = useState(false);
    const [isOpenFinalLearnModal, setIsOpenFinalLearnModal] = useState(false);

    const currentCard: ICard = cards[activeStep];

    const setIsLoadingHandle = (value: boolean) => {
        setIsLoadingLearnMode(value);
    };

    const startAgain = () => {
        setShowAnswer(false);
        shuffleCards();
        setActiveStep(0);
        closeFinalLearnModalHandle();
    };
    useEffect(() => {
        if (cards.length !== 0 && cards.length === activeStep) openFinalLearnModalHandle();
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
        if (isLoadingLearnMode || isSendingAnswer) return;
        setIsOpenAccurateModal(false);
    };

    const openFinalLearnModalHandle = () => {
        setIsOpenFinalLearnModal(true);
    };
    const closeFinalLearnModalHandle = () => {
        setIsOpenFinalLearnModal(false);
    };
    const sendAnswerHandle = (grade: GradeTypes) => {
        setIsSendingAnswer(true);
        dispatch(
            learnThunks.sendAnswerByCard({
                dto: { grade, card_id: currentCard._id },
                params: null,
                query: null,
            })
        ).finally(() => {
            setShowAnswer(false);
            setActiveStepHandle();
            setIsSendingAnswer(false);
        });
    };

    const shuffleCards = () => {
        setCards(shuffleArray(cards));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setActiveStepHandle = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    if (isLoadingLearnMode)
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
                if (isLoadingLearnMode || isSendingAnswer) return;
                navigate(-1);
            }}
        >
            <AccurateAnswerModal
                cardId={currentCard?._id}
                inOpen={isOpenAccurateModal}
                isLoading={isLoadingLearnMode}
                handleClose={closeAccurateModalHandle}
                setIsLoadingHandle={setIsLoadingHandle}
                setActiveStepHandle={setActiveStepHandle}
            />
            <FinalLearnModal isOpen={isOpenFinalLearnModal} closeModal={closeFinalLearnModalHandle} startAgain={startAgain} />
            <div className={s.counter}>{activeStep === cards.length ? '' : `${activeStep + 1} / ${cards.length}`}</div>
            <div className={s.text}>{cards.length === 0 ? 'This pack is empty :(' : showAnswer ? currentCard?.answer : currentCard?.question}</div>

            <ButtonGroup disabled={cards.length === 0 || isSendingAnswer} variant={'contained'} sx={{ display: 'flex' }}>
                <Button sx={{ width: '100%' }} onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardReturnIcon />
                </Button>

                <Button onClick={() => sendAnswerHandle(1)} sx={{ width: '100%' }}>
                    <CancelIcon />
                </Button>

                <Button onClick={() => sendAnswerHandle(5)} disabled={cardsList ? activeStep === cards.length : true} sx={{ width: '100%' }}>
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
