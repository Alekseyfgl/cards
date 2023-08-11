import { BasicModal } from '../../GlobalModal';
import React, { ChangeEvent, FC, memo, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SendRequestButton } from '../../../ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { addPackMapper } from '../../../../../features/Packs/utils/mappers/pack.mapper';
import { IAddPack } from '../../../../../features/Packs/packs.interfaces';
import { useAppDispatch } from '../../../../utils/hooks';
import { packThunks } from '../../../../../features/Packs/packs.slice';
import { addPackValidate } from '../../../../utils/validationFormRules/add-pack-modal.validate';

interface AddModalProps {
    title: string;
    isOpen: boolean;
    closeModal: () => void;
    maxLength?: number;
    queryParams: any;
}

export interface FormValues {
    name: string;
    private: boolean;
}

export const AddPackModal: FC<AddModalProps> = memo((props) => {
    const { isOpen, closeModal, title, maxLength = 30, queryParams } = props;
    const dispatch = useAppDispatch();
    const [isSentRequest, setIsSentRequest] = useState(false);
    const [disable, setDisable] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();

    const addPackHandler = (packDto: FormValues) => {
        setIsSentRequest(true);
        const dto: IAddPack = addPackMapper(packDto);

        dispatch(packThunks.addPack({ dto, queryParams })).then(() => {
            setIsSentRequest(false);
            closeModal();
        });
    };

    const onSubmit = (formValue: FormValues) => {
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
        <BasicModal isOpen={isOpen} title={title} handleClose={closeModalHandler}>
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
