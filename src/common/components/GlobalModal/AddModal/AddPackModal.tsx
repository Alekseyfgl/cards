import { BasicModal } from '../GlobalModal';
import React, { FC, memo, useEffect, useState } from 'react';
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
    const [controller, setController] = useState<AbortController>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        if (isOpen) {
            setController(new AbortController());
        }
    }, [isOpen]);

    const addPackHandler = (packDto: FormValues) => {
        setIsSentRequest(true);
        const dto: IAddPack = addPackMapper(packDto);
        // const controller = new AbortController();
        // setController(controller);

        dispatch(packThunks.addPack({ dto, queryParams, signal: controller!.signal })).then(() => {
            setIsSentRequest(false);
            closeModal();
        });
    };

    const onSubmit = (formValue: FormValues) => {
        addPackHandler(formValue);
    };

    const closeModalHandler = () => {
        controller?.abort();
        // setController(new AbortController());
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
                    {...register('name', { required: true })}
                />
                <FormControlLabel control={<Checkbox />} label="Private pack" sx={{ marginBottom: 3 }} {...register('private', { required: false })} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest}>Save</SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </form>
        </BasicModal>
    );
});
