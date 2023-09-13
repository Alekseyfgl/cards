import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import React, { ChangeEvent, FC, memo, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { addPackMapper } from '../../utils/mappers/pack.mapper';
import { IAddPack } from '../../packs.interfaces';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { packThunks } from '../../packs.slice';
import { addPackValidate } from '../../../../common/utils/validationFormRules/add-pack-modal.validate';
import { MSG_BTN, MSG_PACK } from '../../../../common/utils/constans/app-messages.const';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { CustomTextField } from '../../../../common/components/CustomTextField/CustomTextField';

interface AddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    maxLength?: number;
    queryParams: any;
}

export interface AddPackFormValues {
    name: string;
    private: boolean;
}

export const AddPackModal: FC<AddModalProps> = memo((props) => {
    const { isOpen, closeModal, maxLength = 30, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [disable, setDisable] = useState(true);

    const {
        register,
        clearErrors, // this is for error removal when validation is correct
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AddPackFormValues>();

    const addPackHandler = (packDto: AddPackFormValues) => {
        setIsSentRequest(true);
        const dto: IAddPack = addPackMapper(packDto);

        dispatch(packThunks.addPack({ dto, queryParams })).then(() => {
            setIsSentRequest(false);
            closeModal();
        });
    };

    const onSubmit = (formValue: AddPackFormValues) => {
        addPackHandler(formValue);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value.trimStart();
        if (inputValue) {
            disable && setDisable(false);
            setValue('name', inputValue);
            clearErrors('name'); //this is for error removal when validation is correct
        } else {
            setDisable(true);
        }
    };

    const closeModalHandler = () => {
        if (isSentRequest) return;
        closeModal();
    };
    return (
        <BasicModal isOpen={isOpen} title={MSG_PACK.ADD_NEW_PACK} commonHandleClose={closeModalHandler}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField
                    label={'Name pack'}
                    variant={'standard'}
                    register={{ ...register('name', addPackValidate) }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isSentRequest}
                    onChange={handleNameChange}
                />
                <FormControlLabel control={<Checkbox />} label="Private pack" sx={{ marginBottom: 3 }} {...register('private', { required: false })} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={disable}>
                        {MSG_BTN.SAVE}
                    </SendRequestButton>
                    <CustomButton onClick={closeModalHandler} color={'inherit'}>
                        {MSG_BTN.CANCEL}
                    </CustomButton>
                </div>
            </form>
        </BasicModal>
    );
});
