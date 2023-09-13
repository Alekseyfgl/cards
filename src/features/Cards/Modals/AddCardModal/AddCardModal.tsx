import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import React, { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { AddCardDto, ICard, ICardQuery } from '../../cards.interfaces';
import { addCardDtoMapper } from '../../utils/mappers/card.mapper';
import { MSG_BTN, MSG_CARD } from '../../../../common/utils/constans/app-messages.const';
import { cardThunks } from '../../cards.slice';
import { addAnswerValidate, addQuestionValidate } from '../../../../common/utils/validationFormRules/add-card-modal.validate';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { CustomTextField } from '../../../../common/components/CustomTextField/CustomTextField';
import { maxAnswerLength, maxQuestionLength } from '../../utils/consts/lmits.const';

interface AddCardProps {
    isOpen: boolean;
    closeModal: () => void;
    maxLength?: number;
    queryParams: ICardQuery;
    packId: string;
}

export type AddCardFormValues = Pick<ICard, 'cardsPack_id' | 'answer' | 'question'>;

export const AddCardModal: FC<AddCardProps> = (props) => {
    const { isOpen, packId, closeModal, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [isEmptyQuestion, setIsEmptyQuestion] = useState(true);

    const {
        register,
        handleSubmit,
        clearErrors, // this is for error removal when validation is correct
        setValue,
        reset,
        formState: { errors },
    } = useForm<AddCardFormValues>({
        defaultValues: {
            cardsPack_id: packId,
        },
    });

    const onSubmit = (formValue: AddCardFormValues) => {
        addCardHandler(formValue);
    };

    const addCardHandler = (cardDto: AddCardFormValues) => {
        setIsSentRequest(true);
        const dto: AddCardDto = addCardDtoMapper(cardDto);
        dispatch(cardThunks.addCard({ dto, params: null, query: queryParams })).finally(() => {
            setIsSentRequest(false);
            closeModal();
            setIsEmptyQuestion(true);
            reset();
        });
    };

    const closeModalHandler = () => {
        closeModal();
        setIsEmptyQuestion(true);
        reset();
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
    return (
        <BasicModal isOpen={isOpen} title={MSG_CARD.ADD_CARD} commonHandleClose={closeModalHandler}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField
                    label={'Question'}
                    {...register('question', addQuestionValidate)}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    disabled={isSentRequest}
                    maxLength={maxQuestionLength}
                    marginBottom={'20px'}
                    onChange={changeQuestionName}
                />
                <CustomTextField
                    label={'Answer'}
                    {...register('answer', addAnswerValidate)}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    disabled={isSentRequest}
                    maxLength={maxAnswerLength}
                    marginBottom={'20px'}
                />
                <div className={s.btns}>
                    <SendRequestButton disabled={isEmptyQuestion} isSentRequest={isSentRequest}>
                        {MSG_BTN.SAVE}
                    </SendRequestButton>
                    <CustomButton onClick={closeModal} color={'inherit'}>
                        {MSG_BTN.CANCEL}
                    </CustomButton>
                </div>
            </form>
        </BasicModal>
    );
};
