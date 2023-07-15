import { BasicModal } from '../GlobalModal';
import React, { FC } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SendRequestButton } from '../../ButtonSendRequest/SendRequestButton';
import s from './styles.module.scss';

interface AddModalProps {
    title: string;
    isOpen: boolean;
    handleClose: () => void;
    maxLength?: number;
}

export const AddModal: FC<AddModalProps> = (props) => {
    const { isOpen, handleClose, title, maxLength = 30 } = props;

    return (
        <BasicModal isOpen={isOpen} title={title} handleClose={handleClose}>
            <div>
                <TextField label="Name pack" defaultValue="Normal" variant="standard" fullWidth={true} inputProps={{ maxLength }} sx={{ marginBottom: 3 }} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" sx={{ marginBottom: 3 }} />

                <div className={s.btns}>
                    <SendRequestButton isSentRequest={false}>Save</SendRequestButton>
                    <Button variant="contained" color={'inherit'} onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </BasicModal>
    );
};
