import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { useForm } from 'react-hook-form';
import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import s from '../../../Packs/Modals/ChangePackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import { ChangeCardDto, ICard, ICardQuery } from '../../cards.interfaces';
import { addAnswerValidate, addQuestionValidate } from '../../../../common/utils/validationFormRules/add-card-modal.validate';
import { changeCardDtoMapper } from '../../utils/mappers/card.mapper';
import { cardThunks } from '../../cards.slice';

interface ChangeCardModalProps {
    isOpen: boolean;
    closeModal: () => void;
    query: ICardQuery;
    cardId: string;
    question: string;
    answer: string;
    questionImg: string;
}

export type ChangeCardFormValues = Pick<ICard, 'question' | 'answer' | '_id' | 'questionImg'>;
const maxQuestionLength = 200;
const maxAnswerLength = 1000;
export const ChangePackModal: FC<ChangeCardModalProps> = (props) => {
    const { isOpen, closeModal, question, answer, cardId, query, questionImg } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [isEmptyQuestion, setIsEmptyQuestion] = useState(true);

    const {
        register,
        reset,
        clearErrors, // this is for error removal when validation is correct
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ChangeCardFormValues>({
        defaultValues: {
            _id: cardId,
            questionImg,
            answer,
            question,
        },
    });

    const changePackHandler = (packDto: ChangeCardFormValues) => {
        setIsSentRequest(true);
        const dto: ChangeCardDto = changeCardDtoMapper(packDto);

        dispatch(cardThunks.changeCard({ dto, query, params: null })).finally(() => {
            setIsSentRequest(false);
            closeModal();
            setIsEmptyQuestion(true);
        });
    };

    const onSubmit = (formValue: ChangeCardFormValues) => {
        changePackHandler(formValue);
    };

    const changeQuestionName = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value.trimStart();
        if (inputValue) {
            isEmptyQuestion && setIsEmptyQuestion(false);
            setValue('question', inputValue);
            clearErrors('question'); //this is for error removal when validation is correct
        } else {
            setIsEmptyQuestion(true);
        }
    };

    const changeAnswerName = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value.trimStart();
        if (inputValue) {
            isEmptyQuestion && setIsEmptyQuestion(false);
            setValue('answer', inputValue);
            clearErrors('answer'); //this is for error removal when validation is correct
        } else {
            setIsEmptyQuestion(true);
        }
    };

    const closeModalHandler = () => {
        if (isSentRequest) return;
        closeModal();
        setIsEmptyQuestion(true);
    };

    return (
        <BasicModal isOpen={isOpen} title={'Измените вопрос или ответ карточки'} commonHandleClose={closeModalHandler}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Question"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength: maxQuestionLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('question', addQuestionValidate)}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    disabled={isSentRequest}
                    onChange={changeQuestionName}
                />
                <TextField
                    label="Answer"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength: maxAnswerLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('answer', addAnswerValidate)}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    disabled={isSentRequest}
                    onChange={changeAnswerName}
                />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={isEmptyQuestion}>
                        Save
                    </SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={closeModalHandler}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
};
