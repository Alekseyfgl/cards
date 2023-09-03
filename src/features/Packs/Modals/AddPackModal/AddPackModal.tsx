import { BasicModal } from '../../../../common/components/GlobalModal/GlobalModal';
import React, { ChangeEvent, FC, memo, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { addPackMapper } from '../../utils/mappers/pack.mapper';
import { IAddPack } from '../../packs.interfaces';
import { useAppDispatch } from '../../../../common/utils/hooks';
import { packThunks } from '../../packs.slice';
import { addPackValidate } from '../../../../common/utils/validationFormRules/add-pack-modal.validate';
import { MSG_PACK } from '../../../../common/utils/constans/app-messages.const';

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
        } else {
            setDisable(true);
        }
    };

    const closeModalHandler = () => {
        if (isSentRequest) return;
        closeModal();
    };
    return (
        <BasicModal isOpen={isOpen} title={MSG_PACK.ADD_NEW_PACK} handleClose={closeModalHandler}>
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
                <FormControlLabel control={<Checkbox />} label="Private pack" sx={{ marginBottom: 3 }} {...register('private', { required: false })} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={disable}>
                        Save
                    </SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={closeModalHandler}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
});
