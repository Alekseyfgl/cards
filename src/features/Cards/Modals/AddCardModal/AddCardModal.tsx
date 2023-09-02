import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import { Button, TextField } from '@mui/material';
import { addPackValidate } from '../../../../common/utils/validationFormRules/add-pack-modal.validate';
import s from '../../../Packs/Modals/AddPackModal/styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { ICard, ICardDto, ICardQuery } from '../../cards.interfaces';
import { addCardDtoMapper } from '../../utils/mappers/card.mapper';

interface AddCardProps {
    title: string;
    isOpen: boolean;
    closeModal: () => void;
    maxLength?: number;
    queryParams: ICardQuery;
}

export type AddCardFormValues = Pick<ICard, 'cardsPack_id' | 'answer' | 'question'>;

export const AddCardModal: FC<AddCardProps> = (props) => {
    const { isOpen, closeModal, title, maxLength = 30, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [disable, setDisable] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AddCardFormValues>();

    const onSubmit = (formValue: AddCardFormValues) => {
        addCardHandler(formValue);
    };

    const addCardHandler = (cardDto: AddCardFormValues) => {
        setIsSentRequest(true);
        const dto: ICardDto = addCardDtoMapper(cardDto);

        // dispatch(packThunks.addPack({ dto, queryParams })).then(() => {
        //     setIsSentRequest(false);
        //     closeModal();
        // });
    };

    // const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const inputValue: string = e.target.value.trimStart();
    //     // if (inputValue) {
    //     //     disable && setDisable(false);
    //     //     setValue('name', inputValue);
    //     // } else {
    //     //     setDisable(true);
    //     // }
    // };

    return (
        <BasicModal isOpen={false} title={'Add pack'} handleClose={() => {}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Question"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('question', addPackValidate)}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    // onChange={handleNameChange}
                    disabled={isSentRequest}
                />
                <TextField
                    label="Answer"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('answer', addPackValidate)}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    // onChange={handleNameChange}
                    disabled={isSentRequest}
                />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={false}>
                        Save
                    </SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={() => {}}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
};
