import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { useForm } from 'react-hook-form';
import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import s from '../../../Packs/Modals/ChangePackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import { ChangeCardDto, ICard, ICardQuery } from '../../cards.interfaces';
import { changeCardDtoMapper } from '../../utils/mappers/card.mapper';
import { cardThunks } from '../../cards.slice';
import { MSG_BTN } from '../../../../common/utils/constans/app-messages.const';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { CustomTextField } from '../../../../common/components/CustomTextField/CustomTextField';
import { addAnswerValidate, addQuestionValidate } from '../../../../common/utils/validationFormRules/add-card-modal.validate';
import { maxAnswerLength, maxQuestionLength } from '../../utils/consts/lmits.const';

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
                <CustomTextField
                    label={'Question'}
                    register={{ ...register('question', addQuestionValidate) }}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    disabled={isSentRequest}
                    maxLength={maxQuestionLength}
                    marginBottom={'16px'}
                    onChange={changeQuestionName}
                />

                <CustomTextField
                    label={'Answer'}
                    {...register('answer', addAnswerValidate)}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    disabled={isSentRequest}
                    maxLength={maxAnswerLength}
                    onChange={changeAnswerName}
                />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={isEmptyQuestion}>
                        {MSG_BTN.SAVE}
                    </SendRequestButton>

                    <CustomButton onClick={closeModalHandler} color={'inherit'}>
                        {MSG_BTN.CANCEL}
                    </CustomButton>
                </div>
            </form>
        </BasicModal>
    );
};
