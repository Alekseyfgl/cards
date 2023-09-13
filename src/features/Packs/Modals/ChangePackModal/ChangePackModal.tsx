import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import React, { ChangeEvent, FC, memo, useState } from 'react';
import { TextField } from '@mui/material';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { changePackMapper } from '../../utils/mappers/pack.mapper';
import { IChangePack, PackQueryTypes } from '../../packs.interfaces';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { addPackValidate } from '../../../../common/utils/validationFormRules/add-pack-modal.validate';
import { packThunks } from '../../packs.slice';
import { CustomButton } from '../../../../common/components/CustomButton/CustomButton';
import { MSG_BTN } from '../../../../common/utils/constans/app-messages.const';

interface ChangePackModalProps {
    title: string;
    isOpen: boolean;
    closeModal: () => void;
    queryParams: PackQueryTypes;
    rowPackId: string;
    titlePack: string;
    isPrivatePack: boolean;
    maxLength?: number;
}

export interface ChangePackFormValues {
    _id: string;
    name: string;
    private: boolean;
}

export const ChangePackModal: FC<ChangePackModalProps> = memo((props) => {
    const { isOpen, closeModal, title, titlePack, isPrivatePack, rowPackId, maxLength = 30, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [disable, setDisable] = useState(true);

    const {
        register,
        clearErrors, // this is for error removal when validation is correct
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ChangePackFormValues>({
        defaultValues: {
            _id: rowPackId,
            name: titlePack,
            private: isPrivatePack,
        },
    });

    const changePackHandler = (packDto: ChangePackFormValues) => {
        setIsSentRequest(true);
        const dto: IChangePack = changePackMapper(packDto);

        dispatch(packThunks.updatePack({ dto, queryParams })).then(() => {
            setIsSentRequest(false);
            closeModal();
        });
    };

    const onSubmit = (formValue: ChangePackFormValues) => {
        changePackHandler(formValue);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value.trimStart();
        console.log(inputValue);
        if (inputValue) {
            disable && setDisable(false);
            setValue('name', inputValue);
            clearErrors('name'); //this is for error removal when validation is correct
        } else {
            setDisable(true);
        }
    };

    const closeModalHandler = (e?: unknown) => {
        (e as Event)?.stopPropagation();
        if (isSentRequest) return;
        closeModal();
    };

    return (
        <BasicModal isOpen={isOpen} title={title} commonHandleClose={closeModalHandler}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name pack"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('name', addPackValidate)}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    onChange={handleNameChange}
                    disabled={isSentRequest}
                />
                {/*<FormControlLabel control={<Checkbox />} label="Private pack" sx={{ marginBottom: 3 }} {...register('private', { required: false })} />*/}

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
