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
import s from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cardThunks } from '../../Cards/cards.slice';
import { Nullable } from '../../../common/utils/types/optional.types';
import { ICard } from '../../Cards/cards.interfaces';
import { cardsByPackSelector } from '../../Cards/cards.selector';
import { shuffleArray } from '../../../common/utils/functions/shuffle-array/shuffle-array';
import { AccurateAnswerModal } from '../Modals/AccurateAnswerModal/AccurateAnswerModal';
import { learnThunks } from '../learn-mode.slice';
import { GradeTypes } from '../learn.interfaces';
import { FinalLearnModal } from '../Modals/FinalLearnModal/FinalLearnModal';
import { CustomButton } from '../../../common/components/CustomButton/CustomButton';
import { StubLearningMode } from '../StubLearningMode/StubLearningMode';

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

    const showSteps: string = activeStep === cards.length ? '' : `${activeStep + 1} / ${cards.length}`;
    const showText: string = cards.length === 0 ? 'This pack is empty :(' : showAnswer ? currentCard?.answer : currentCard?.question;
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
            setActiveStepHandle();
            setIsSendingAnswer(false);
        });
    };

    const shuffleCards = () => {
        setCards(shuffleArray(cards));
    };

    const handleBack = () => {
        setShowAnswer(false);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setActiveStepHandle = () => {
        setShowAnswer(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    if (isLoadingLearnMode) return <StubLearningMode />;

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
            <div className={s.counter}>{showSteps}</div>
            <div className={s.text}>{showText}</div>

            <ButtonGroup disabled={cards.length === 0 || isSendingAnswer} variant={'contained'} sx={{ display: 'flex' }}>
                <CustomButton onClick={handleBack} disabled={activeStep === 0} fullWidthProp={true}>
                    <KeyboardReturnIcon />
                </CustomButton>

                <CustomButton onClick={() => sendAnswerHandle(1)} fullWidthProp={true}>
                    <CancelIcon />
                </CustomButton>

                <CustomButton onClick={() => sendAnswerHandle(5)} disabled={cardsList ? activeStep === cards.length : true} fullWidthProp={true}>
                    <CheckCircleIcon />
                </CustomButton>

                <CustomButton
                    onClick={() => {
                        shuffleCards();
                        setActiveStep(0);
                        setShowAnswer(false);
                    }}
                    fullWidthProp={true}
                >
                    <ShuffleIcon />
                </CustomButton>

                <CustomButton onClick={() => setShowAnswer(!showAnswer)} fullWidthProp={true}>
                    {showAnswer ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </CustomButton>

                <CustomButton onClick={openAccurateModalHandle} fullWidthProp={true}>
                    <ListAltIcon />
                </CustomButton>
            </ButtonGroup>
        </BasicModal>
    );
};
