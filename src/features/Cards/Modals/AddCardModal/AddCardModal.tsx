import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import { Button, TextField } from '@mui/material';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import React, { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { AddCardDto, ICard, ICardQuery } from '../../cards.interfaces';
import { addCardDtoMapper } from '../../utils/mappers/card.mapper';
import { MSG_CARD } from '../../../../common/utils/constans/app-messages.const';
import { cardThunks } from '../../cards.slice';
import { addAnswerValidate, addQuestionValidate } from '../../../../common/utils/validationFormRules/add-card-modal.validate';

interface AddCardProps {
    isOpen: boolean;
    closeModal: () => void;
    maxLength?: number;
    queryParams: ICardQuery;
    packId: string;
}

export type AddCardFormValues = Pick<ICard, 'cardsPack_id' | 'answer' | 'question'>;

export const AddCardModal: FC<AddCardProps> = (props) => {
    const { isOpen, packId, closeModal, maxLength = 200, queryParams } = props;
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
                <TextField
                    label="Question"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength }}
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
                    inputProps={{ maxLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('answer', addAnswerValidate)}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    disabled={isSentRequest}
                />

                <div className={s.btns}>
                    <SendRequestButton disabled={isEmptyQuestion} isSentRequest={isSentRequest}>
                        Save
                    </SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
};
