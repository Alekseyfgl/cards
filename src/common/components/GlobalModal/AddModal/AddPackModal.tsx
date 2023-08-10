import { BasicModal } from '../GlobalModal';
import React, { FC, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SendRequestButton } from '../../ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { addPackMapper } from '../../../../features/Packs/utils/mappers/pack.mapper';
import { IAddPack } from '../../../../features/Packs/packs.interfaces';
import { useAppDispatch } from '../../../utils/hooks';
import { packThunks } from '../../../../features/Packs/packs.slice';

interface AddModalProps {
    title: string;
    isOpen: boolean;
    handleClose: () => void;
    maxLength?: number;
    queryParams: any;
}

export interface FormValues {
    name: string;
    private: boolean;
}

export const AddPackModal: FC<AddModalProps> = (props) => {
    const { isOpen, handleClose, title, maxLength = 30, queryParams } = props;
    const [isSentRequest, setIsSentRequest] = useState(false);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const addPackHandler = (packDto: FormValues) => {
        setIsSentRequest(true);
        const dto: IAddPack = addPackMapper(packDto);
        dispatch(packThunks.addPack({ dto, queryParams })).then(() => {
            setIsSentRequest(false);
        });

        // dispatch(authThunks.login(loginDto)).finally(() => {
        //     setIsSentRequest(false);
        // });
    };

    const onSubmit = (formValue: FormValues) => {
        addPackHandler(formValue);
    };

    return (
        <BasicModal isOpen={isOpen} title={title} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name pack"
                    variant="standard"
                    fullWidth={true}
                    inputProps={{ maxLength }}
                    sx={{ marginBottom: 3 }}
                    {...register('name', { required: true })}
                />
                <FormControlLabel control={<Checkbox />} label="Private pack" sx={{ marginBottom: 3 }} {...register('private', { required: false })} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest}>Save</SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
};
